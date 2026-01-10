import { z } from "zod";
import { eq, and, desc } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { applications, properties, users } from "@/server/db/schema";

export const applicationRouter = createTRPCRouter({
  // Get all applications (for tenant or landlord)
  getAll: protectedProcedure
    .input(
      z
        .object({
          propertyId: z.number().optional(),
          status: z.enum(["pending", "approved", "rejected", "withdrawn"]).optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const kindeUser = ctx.user;
      if (!kindeUser?.id) {
        throw new Error("User not authenticated");
      }

      const conditions = [];

      // Get user role to determine which applications to show
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, kindeUser.id),
      });

      if (user?.role === "tenant") {
        conditions.push(eq(applications.tenantId, kindeUser.id));
      } else if (user?.role === "landlord") {
        conditions.push(eq(applications.landlordId, kindeUser.id));
      }

      if (input?.propertyId) {
        conditions.push(eq(applications.propertyId, input.propertyId));
      }

      if (input?.status) {
        conditions.push(eq(applications.status, input.status));
      }

      const applicationList = await ctx.db.query.applications.findMany({
        where: conditions.length > 0 ? and(...conditions) : undefined,
        orderBy: [desc(applications.createdAt)],
      });

      return applicationList;
    }),

  // Get application by ID
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const kindeUser = ctx.user;
      if (!kindeUser?.id) {
        throw new Error("User not authenticated");
      }

      const application = await ctx.db.query.applications.findFirst({
        where: eq(applications.id, input.id),
      });

      if (!application) {
        throw new Error("Application not found");
      }

      // Verify user has access
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, kindeUser.id),
      });

      if (
        user?.role !== "landlord" &&
        application.tenantId !== kindeUser.id &&
        application.landlordId !== kindeUser.id
      ) {
        throw new Error("Unauthorized");
      }

      return application;
    }),

  // Create an application (tenant applies for property)
  create: protectedProcedure
    .input(
      z.object({
        propertyId: z.number(),
        message: z.string().optional(),
        income: z.number().optional(),
        employmentStatus: z.string().optional(),
        references: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const kindeUser = ctx.user;
      if (!kindeUser?.id) {
        throw new Error("User not authenticated");
      }

      // Verify property exists
      const property = await ctx.db.query.properties.findFirst({
        where: eq(properties.id, input.propertyId),
      });

      if (!property) {
        throw new Error("Property not found");
      }

      if (!property.isAvailable) {
        throw new Error("Property is not available");
      }

      // Check if application already exists
      const existing = await ctx.db.query.applications.findFirst({
        where: and(
          eq(applications.propertyId, input.propertyId),
          eq(applications.tenantId, kindeUser.id),
          eq(applications.status, "pending"),
        ),
      });

      if (existing) {
        throw new Error("You already have a pending application for this property");
      }

      const [application] = await ctx.db
        .insert(applications)
        .values({
          propertyId: input.propertyId,
          tenantId: kindeUser.id,
          landlordId: property.landlordId,
          message: input.message ?? null,
          income: input.income?.toString() ?? null,
          employmentStatus: input.employmentStatus ?? null,
          references: input.references ?? [],
        })
        .returning();

      return application;
    }),

  // Update application status (landlord approves/rejects)
  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["approved", "rejected", "withdrawn"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const kindeUser = ctx.user;
      if (!kindeUser?.id) {
        throw new Error("User not authenticated");
      }

      const application = await ctx.db.query.applications.findFirst({
        where: eq(applications.id, input.id),
      });

      if (!application) {
        throw new Error("Application not found");
      }

      // Verify landlord ownership or tenant ownership (for withdrawal)
      if (input.status === "withdrawn") {
        if (application.tenantId !== kindeUser.id) {
          throw new Error("Unauthorized: Only the tenant can withdraw");
        }
      } else {
        if (application.landlordId !== kindeUser.id) {
          throw new Error("Unauthorized: Only the landlord can approve/reject");
        }
      }

      const [updated] = await ctx.db
        .update(applications)
        .set({
          status: input.status,
          updatedAt: new Date(),
        })
        .where(eq(applications.id, input.id))
        .returning();

      return updated;
    }),
});
