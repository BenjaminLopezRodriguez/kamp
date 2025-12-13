import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { peerPreviews } from "@/server/db/schema";
import { eq, desc, or } from "drizzle-orm";

export const peerPreviewsRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        propertyId: z.number(),
        requestedBy: z.string(),
        reviewerEmail: z.string().email(),
        reviewerName: z.string().optional(),
        topic: z.string(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [preview] = await ctx.db
        .insert(peerPreviews)
        .values({
          propertyId: input.propertyId,
          requestedBy: input.requestedBy,
          reviewerEmail: input.reviewerEmail,
          reviewerName: input.reviewerName,
          topic: input.topic,
          description: input.description,
          status: "pending",
        })
        .returning();
      
      return preview;
    }),

  getAll: publicProcedure
    .input(
      z.object({
        userId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (!input.userId) {
        return await ctx.db.select().from(peerPreviews).orderBy(desc(peerPreviews.createdAt));
      }

      // Get previews where user is either requester or reviewer
      return await ctx.db
        .select()
        .from(peerPreviews)
        .where(
          or(
            eq(peerPreviews.requestedBy, input.userId),
            eq(peerPreviews.reviewerEmail, input.userId),
          ),
        )
        .orderBy(desc(peerPreviews.createdAt));
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const [preview] = await ctx.db
        .select()
        .from(peerPreviews)
        .where(eq(peerPreviews.id, input.id));
      
      return preview;
    }),

  submitFeedback: publicProcedure
    .input(
      z.object({
        id: z.number(),
        feedback: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [preview] = await ctx.db
        .update(peerPreviews)
        .set({
          feedback: input.feedback,
          status: "reviewed",
          reviewedAt: new Date(),
        })
        .where(eq(peerPreviews.id, input.id))
        .returning();
      
      return preview;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(peerPreviews).where(eq(peerPreviews.id, input.id));
      return { success: true };
    }),
});
