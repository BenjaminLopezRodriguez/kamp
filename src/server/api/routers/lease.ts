import { z } from "zod";
import { eq, and, desc } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { leases, properties, users } from "@/server/db/schema";

export const leaseRouter = createTRPCRouter({
  // Get all leases for a user
  getAll: protectedProcedure
    .input(
      z
        .object({
          propertyId: z.number().optional(),
          status: z.enum(["active", "expired", "terminated"]).optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const kindeUser = ctx.user;
      if (!kindeUser?.id) {
        throw new Error("User not authenticated");
      }

      const conditions = [];

      // Get user role to determine which leases to show
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, kindeUser.id),
      });

      if (user?.role === "tenant") {
        conditions.push(eq(leases.tenantId, kindeUser.id));
      } else if (user?.role === "landlord") {
        conditions.push(eq(leases.landlordId, kindeUser.id));
      }

      if (input?.propertyId) {
        conditions.push(eq(leases.propertyId, input.propertyId));
      }

      if (input?.status) {
        conditions.push(eq(leases.status, input.status));
      }

      const leaseList = await ctx.db.query.leases.findMany({
        where: conditions.length > 0 ? and(...conditions) : undefined,
        orderBy: [desc(leases.createdAt)],
      });

      return leaseList;
    }),

  // Get lease by ID
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const kindeUser = ctx.user;
      if (!kindeUser?.id) {
        throw new Error("User not authenticated");
      }

      const lease = await ctx.db.query.leases.findFirst({
        where: eq(leases.id, input.id),
      });

      if (!lease) {
        throw new Error("Lease not found");
      }

      // Verify user has access
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, kindeUser.id),
      });

      if (
        user?.role !== "landlord" &&
        lease.tenantId !== kindeUser.id &&
        lease.landlordId !== kindeUser.id
      ) {
        throw new Error("Unauthorized");
      }

      return lease;
    }),

  // Create a new lease (landlord creates lease with tenant)
  create: protectedProcedure
    .input(
      z.object({
        propertyId: z.number(),
        tenantId: z.string(),
        startDate: z.date(),
        endDate: z.date(),
        monthlyRent: z.number().positive(),
        securityDeposit: z.number().optional(),
        leaseDocumentUrl: z.string().url().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const kindeUser = ctx.user;
      if (!kindeUser?.id) {
        throw new Error("User not authenticated");
      }

      // Verify property exists and landlord ownership
      const property = await ctx.db.query.properties.findFirst({
        where: eq(properties.id, input.propertyId),
      });

      if (!property) {
        throw new Error("Property not found");
      }

      if (property.landlordId !== kindeUser.id) {
        throw new Error("Unauthorized: You don't own this property");
      }

      // Verify tenant exists
      const tenant = await ctx.db.query.users.findFirst({
        where: eq(users.id, input.tenantId),
      });

      if (!tenant) {
        throw new Error("Tenant not found");
      }

      // Mark property as unavailable
      await ctx.db
        .update(properties)
        .set({ isAvailable: false })
        .where(eq(properties.id, input.propertyId));

      const [lease] = await ctx.db
        .insert(leases)
        .values({
          propertyId: input.propertyId,
          tenantId: input.tenantId,
          landlordId: kindeUser.id,
          startDate: input.startDate,
          endDate: input.endDate,
          monthlyRent: input.monthlyRent.toString(),
          securityDeposit: input.securityDeposit?.toString() ?? null,
          leaseDocumentUrl: input.leaseDocumentUrl ?? null,
        })
        .returning();

      return lease;
    }),

  // Update lease status
  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["active", "expired", "terminated"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const kindeUser = ctx.user;
      if (!kindeUser?.id) {
        throw new Error("User not authenticated");
      }

      const lease = await ctx.db.query.leases.findFirst({
        where: eq(leases.id, input.id),
      });

      if (!lease) {
        throw new Error("Lease not found");
      }

      // Verify landlord ownership
      if (lease.landlordId !== kindeUser.id) {
        throw new Error("Unauthorized: Only the landlord can update lease status");
      }

      // If lease is terminated or expired, mark property as available
      if (input.status === "terminated" || input.status === "expired") {
        await ctx.db
          .update(properties)
          .set({ isAvailable: true })
          .where(eq(properties.id, lease.propertyId));
      }

      const [updated] = await ctx.db
        .update(leases)
        .set({
          status: input.status,
          updatedAt: new Date(),
        })
        .where(eq(leases.id, input.id))
        .returning();

      return updated;
    }),
});
