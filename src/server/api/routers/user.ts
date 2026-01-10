import { z } from "zod";
import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { users } from "@/server/db/schema";

export const userRouter = createTRPCRouter({
  // Get or create user profile
  getOrCreate: protectedProcedure
    .query(async ({ ctx }) => {
      const kindeUser = ctx.user;
      if (!kindeUser?.id) {
        throw new Error("User not authenticated");
      }

      let user = await ctx.db.query.users.findFirst({
        where: eq(users.id, kindeUser.id),
      });

      if (!user) {
        // Create user profile if it doesn't exist
        const [newUser] = await ctx.db
          .insert(users)
          .values({
            id: kindeUser.id,
            email: kindeUser.email ?? "",
            name: kindeUser.given_name ?? kindeUser.family_name ?? null,
          })
          .returning();
        user = newUser;
      }

      return user;
    }),

  // Update user profile
  update: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        phone: z.string().optional(),
        role: z.enum(["landlord", "tenant"]).optional(),
        avatar: z.string().url().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const kindeUser = ctx.user;
      if (!kindeUser?.id) {
        throw new Error("User not authenticated");
      }

      const [updated] = await ctx.db
        .update(users)
        .set({
          ...input,
          updatedAt: new Date(),
        })
        .where(eq(users.id, kindeUser.id))
        .returning();

      return updated;
    }),

  // Get user by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, input.id),
      });
      return user;
    }),
});
