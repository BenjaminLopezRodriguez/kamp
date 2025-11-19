import { z } from "zod";
import { eq, and, desc } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { maintenanceRequests, properties, leases, users } from "@/server/db/schema";

export const maintenanceRouter = createTRPCRouter({
  // Get all maintenance requests for a user (tenant or landlord)
  getAll: protectedProcedure
    .input(
      z
        .object({
          propertyId: z.number().optional(),
          status: z.enum(["pending", "in_progress", "completed", "cancelled"]).optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const kindeUser = ctx.user;
      if (!kindeUser?.id) {
        throw new Error("User not authenticated");
      }

      const conditions = [];
      
      // Get user role to determine which requests to show
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, kindeUser.id),
      });

      if (user?.role === "tenant") {
        conditions.push(eq(maintenanceRequests.tenantId, kindeUser.id));
      } else if (user?.role === "landlord") {
        conditions.push(eq(maintenanceRequests.landlordId, kindeUser.id));
      }

      if (input?.propertyId) {
        conditions.push(eq(maintenanceRequests.propertyId, input.propertyId));
      }

      if (input?.status) {
        conditions.push(eq(maintenanceRequests.status, input.status));
      }

      const requests = await ctx.db.query.maintenanceRequests.findMany({
        where: conditions.length > 0 ? and(...conditions) : undefined,
        orderBy: [desc(maintenanceRequests.createdAt)],
      });

      return requests;
    }),

  // Get a single maintenance request
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const kindeUser = ctx.user;
      if (!kindeUser?.id) {
        throw new Error("User not authenticated");
      }

      const request = await ctx.db.query.maintenanceRequests.findFirst({
        where: eq(maintenanceRequests.id, input.id),
      });

      if (!request) {
        throw new Error("Maintenance request not found");
      }

      // Verify user has access
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, kindeUser.id),
      });

      if (
        user?.role !== "landlord" &&
        request.tenantId !== kindeUser.id &&
        request.landlordId !== kindeUser.id
      ) {
        throw new Error("Unauthorized");
      }

      return request;
    }),

  // Create a maintenance request (tenant only)
  create: protectedProcedure
    .input(
      z.object({
        propertyId: z.number(),
        leaseId: z.number().optional(),
        title: z.string().min(1),
        description: z.string().min(1),
        priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
        images: z.array(z.string().url()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const kindeUser = ctx.user;
      if (!kindeUser?.id) {
        throw new Error("User not authenticated");
      }

      // Verify property exists and get landlord
      const property = await ctx.db.query.properties.findFirst({
        where: eq(properties.id, input.propertyId),
      });

      if (!property) {
        throw new Error("Property not found");
      }

      const [request] = await ctx.db
        .insert(maintenanceRequests)
        .values({
          propertyId: input.propertyId,
          leaseId: input.leaseId ?? null,
          tenantId: kindeUser.id,
          landlordId: property.landlordId,
          title: input.title,
          description: input.description,
          priority: input.priority,
          images: input.images ?? [],
        })
        .returning();

      return request;
    }),

  // Update maintenance request status (landlord only)
  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["pending", "in_progress", "completed", "cancelled"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const kindeUser = ctx.user;
      if (!kindeUser?.id) {
        throw new Error("User not authenticated");
      }

      const request = await ctx.db.query.maintenanceRequests.findFirst({
        where: eq(maintenanceRequests.id, input.id),
      });

      if (!request) {
        throw new Error("Maintenance request not found");
      }

      // Verify landlord ownership
      if (request.landlordId !== kindeUser.id) {
        throw new Error("Unauthorized: Only the landlord can update status");
      }

      const [updated] = await ctx.db
        .update(maintenanceRequests)
        .set({
          status: input.status,
          completedAt: input.status === "completed" ? new Date() : null,
          updatedAt: new Date(),
        })
        .where(eq(maintenanceRequests.id, input.id))
        .returning();

      return updated;
    }),
});
