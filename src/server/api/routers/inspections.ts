import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { inspections } from "@/server/db/schema";
import { eq, desc } from "drizzle-orm";

export const inspectionsRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        propertyId: z.number(),
        tenantId: z.number().optional(),
        type: z.enum(["move-in", "move-out", "routine", "emergency"]),
        scheduledDate: z.date(),
        notes: z.string().optional(),
        checklist: z.string().optional(), // JSON string
        createdBy: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [inspection] = await ctx.db
        .insert(inspections)
        .values({
          propertyId: input.propertyId,
          tenantId: input.tenantId,
          type: input.type,
          scheduledDate: input.scheduledDate,
          notes: input.notes,
          checklist: input.checklist,
          createdBy: input.createdBy,
          status: "scheduled",
        })
        .returning();
      
      return inspection;
    }),

  getAll: publicProcedure
    .input(
      z.object({
        createdBy: z.string().optional(),
        propertyId: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      let query = ctx.db.select().from(inspections);
      
      if (input.createdBy) {
        query = query.where(eq(inspections.createdBy, input.createdBy)) as any;
      }
      
      if (input.propertyId) {
        query = query.where(eq(inspections.propertyId, input.propertyId)) as any;
      }

      return await query.orderBy(desc(inspections.scheduledDate));
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const [inspection] = await ctx.db
        .select()
        .from(inspections)
        .where(eq(inspections.id, input.id));
      
      return inspection;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["scheduled", "completed", "cancelled"]).optional(),
        findings: z.string().optional(),
        notes: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [inspection] = await ctx.db
        .update(inspections)
        .set({
          status: input.status,
          findings: input.findings,
          notes: input.notes,
        })
        .where(eq(inspections.id, input.id))
        .returning();
      
      return inspection;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(inspections).where(eq(inspections.id, input.id));
      return { success: true };
    }),
});
