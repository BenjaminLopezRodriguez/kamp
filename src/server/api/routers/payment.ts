import { z } from "zod";
import { eq, and, desc, gte, lte } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { payments, leases, users } from "@/server/db/schema";

export const paymentRouter = createTRPCRouter({
  // Get all payments for a user
  getAll: protectedProcedure
    .input(
      z
        .object({
          leaseId: z.number().optional(),
          status: z.enum(["pending", "paid", "overdue", "failed"]).optional(),
          startDate: z.date().optional(),
          endDate: z.date().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const kindeUser = ctx.user;
      if (!kindeUser?.id) {
        throw new Error("User not authenticated");
      }

      const conditions = [];

      // Get user role to determine which payments to show
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, kindeUser.id),
      });

      if (user?.role === "tenant") {
        conditions.push(eq(payments.tenantId, kindeUser.id));
      } else if (user?.role === "landlord") {
        conditions.push(eq(payments.landlordId, kindeUser.id));
      }

      if (input?.leaseId) {
        conditions.push(eq(payments.leaseId, input.leaseId));
      }

      if (input?.status) {
        conditions.push(eq(payments.status, input.status));
      }

      if (input?.startDate) {
        conditions.push(gte(payments.dueDate, input.startDate));
      }

      if (input?.endDate) {
        conditions.push(lte(payments.dueDate, input.endDate));
      }

      const paymentList = await ctx.db.query.payments.findMany({
        where: conditions.length > 0 ? and(...conditions) : undefined,
        orderBy: [desc(payments.dueDate)],
      });

      return paymentList;
    }),

  // Get payment by ID
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const kindeUser = ctx.user;
      if (!kindeUser?.id) {
        throw new Error("User not authenticated");
      }

      const payment = await ctx.db.query.payments.findFirst({
        where: eq(payments.id, input.id),
      });

      if (!payment) {
        throw new Error("Payment not found");
      }

      // Verify user has access
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, kindeUser.id),
      });

      if (
        user?.role !== "landlord" &&
        payment.tenantId !== kindeUser.id &&
        payment.landlordId !== kindeUser.id
      ) {
        throw new Error("Unauthorized");
      }

      return payment;
    }),

  // Create a payment record (landlord creates rent due)
  create: protectedProcedure
    .input(
      z.object({
        leaseId: z.number(),
        amount: z.number().positive(),
        type: z.enum(["rent", "deposit", "fee", "refund"]),
        dueDate: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const kindeUser = ctx.user;
      if (!kindeUser?.id) {
        throw new Error("User not authenticated");
      }

      // Verify lease exists and get tenant/landlord info
      const lease = await ctx.db.query.leases.findFirst({
        where: eq(leases.id, input.leaseId),
      });

      if (!lease) {
        throw new Error("Lease not found");
      }

      // Verify landlord ownership
      if (lease.landlordId !== kindeUser.id) {
        throw new Error("Unauthorized: Only the landlord can create payments");
      }

      const [payment] = await ctx.db
        .insert(payments)
        .values({
          leaseId: input.leaseId,
          tenantId: lease.tenantId,
          landlordId: lease.landlordId,
          amount: input.amount.toString(),
          type: input.type,
          dueDate: input.dueDate,
        })
        .returning();

      return payment;
    }),

  // Mark payment as paid (tenant pays)
  markPaid: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        paymentMethod: z.string().optional(),
        transactionId: z.string().optional(),
        receiptUrl: z.string().url().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const kindeUser = ctx.user;
      if (!kindeUser?.id) {
        throw new Error("User not authenticated");
      }

      const payment = await ctx.db.query.payments.findFirst({
        where: eq(payments.id, input.id),
      });

      if (!payment) {
        throw new Error("Payment not found");
      }

      // Verify tenant ownership
      if (payment.tenantId !== kindeUser.id) {
        throw new Error("Unauthorized: Only the tenant can mark payment as paid");
      }

      const [updated] = await ctx.db
        .update(payments)
        .set({
          status: "paid",
          paidDate: new Date(),
          paymentMethod: input.paymentMethod ?? null,
          transactionId: input.transactionId ?? null,
          receiptUrl: input.receiptUrl ?? null,
          updatedAt: new Date(),
        })
        .where(eq(payments.id, input.id))
        .returning();

      return updated;
    }),
});
