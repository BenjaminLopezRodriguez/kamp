import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { roomTours, properties } from "@/server/db/schema";
import { eq, desc } from "drizzle-orm";

export const roomToursRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        propertyId: z.number(),
        tenantEmail: z.string().email(),
        tenantName: z.string(),
        scheduledDate: z.date(),
        type: z.enum(["in-person", "virtual"]),
        notes: z.string().optional(),
        createdBy: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [tour] = await ctx.db
        .insert(roomTours)
        .values({
          propertyId: input.propertyId,
          tenantEmail: input.tenantEmail,
          tenantName: input.tenantName,
          scheduledDate: input.scheduledDate,
          type: input.type,
          notes: input.notes,
          createdBy: input.createdBy,
          status: "scheduled",
        })
        .returning();
      
      return tour;
    }),

  getAll: publicProcedure
    .input(
      z.object({
        createdBy: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const query = input.createdBy
        ? ctx.db.select().from(roomTours).where(eq(roomTours.createdBy, input.createdBy))
        : ctx.db.select().from(roomTours);

      return await query.orderBy(desc(roomTours.scheduledDate));
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const [tour] = await ctx.db
        .select()
        .from(roomTours)
        .where(eq(roomTours.id, input.id));
      
      return tour;
    }),

  updateStatus: publicProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["scheduled", "completed", "cancelled"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [tour] = await ctx.db
        .update(roomTours)
        .set({ status: input.status })
        .where(eq(roomTours.id, input.id))
        .returning();
      
      return tour;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(roomTours).where(eq(roomTours.id, input.id));
      return { success: true };
    }),
});
