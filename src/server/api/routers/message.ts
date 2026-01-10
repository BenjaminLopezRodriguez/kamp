import { z } from "zod";
import { eq, and, or, desc } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { messages } from "@/server/db/schema";

export const messageRouter = createTRPCRouter({
  // Get all messages for a user (inbox)
  getInbox: protectedProcedure.query(async ({ ctx }) => {
    const kindeUser = ctx.user;
    if (!kindeUser?.id) {
      throw new Error("User not authenticated");
    }

    const messageList = await ctx.db.query.messages.findMany({
      where: eq(messages.recipientId, kindeUser.id),
      orderBy: [desc(messages.createdAt)],
    });

    return messageList;
  }),

  // Get sent messages
  getSent: protectedProcedure.query(async ({ ctx }) => {
    const kindeUser = ctx.user;
    if (!kindeUser?.id) {
      throw new Error("User not authenticated");
    }

    const messageList = await ctx.db.query.messages.findMany({
      where: eq(messages.senderId, kindeUser.id),
      orderBy: [desc(messages.createdAt)],
    });

    return messageList;
  }),

  // Get conversation between two users
  getConversation: protectedProcedure
    .input(z.object({ userId: z.string(), propertyId: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      const kindeUser = ctx.user;
      if (!kindeUser?.id) {
        throw new Error("User not authenticated");
      }

      const conversation = await ctx.db.query.messages.findMany({
        where: or(
          and(
            eq(messages.senderId, kindeUser.id),
            eq(messages.recipientId, input.userId),
          ),
          and(
            eq(messages.senderId, input.userId),
            eq(messages.recipientId, kindeUser.id),
          ),
        ),
        orderBy: [desc(messages.createdAt)],
      });

      return conversation.reverse(); // Return in chronological order
    }),

  // Send a message
  send: protectedProcedure
    .input(
      z.object({
        recipientId: z.string(),
        propertyId: z.number().optional(),
        subject: z.string().optional(),
        content: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const kindeUser = ctx.user;
      if (!kindeUser?.id) {
        throw new Error("User not authenticated");
      }

      const [message] = await ctx.db
        .insert(messages)
        .values({
          senderId: kindeUser.id,
          recipientId: input.recipientId,
          propertyId: input.propertyId ?? null,
          subject: input.subject ?? null,
          content: input.content,
        })
        .returning();

      return message;
    }),

  // Mark message as read
  markRead: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const kindeUser = ctx.user;
      if (!kindeUser?.id) {
        throw new Error("User not authenticated");
      }

      const message = await ctx.db.query.messages.findFirst({
        where: eq(messages.id, input.id),
      });

      if (!message) {
        throw new Error("Message not found");
      }

      // Verify recipient
      if (message.recipientId !== kindeUser.id) {
        throw new Error("Unauthorized");
      }

      await ctx.db
        .update(messages)
        .set({ isRead: true })
        .where(eq(messages.id, input.id));

      return { success: true };
    }),

  // Get unread message count
  getUnreadCount: protectedProcedure.query(async ({ ctx }) => {
    const kindeUser = ctx.user;
    if (!kindeUser?.id) {
      throw new Error("User not authenticated");
    }

    const unreadMessages = await ctx.db.query.messages.findMany({
      where: and(
        eq(messages.recipientId, kindeUser.id),
        eq(messages.isRead, false),
      ),
    });

    return { count: unreadMessages.length };
  }),
});
