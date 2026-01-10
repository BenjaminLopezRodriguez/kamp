import { z } from "zod";
import { eq, and, desc } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { properties, users } from "@/server/db/schema";

export const propertyRouter = createTRPCRouter({
  // Get all properties (public for browsing)
  getAll: publicProcedure
    .input(
      z
        .object({
          city: z.string().optional(),
          state: z.string().optional(),
          minRent: z.number().optional(),
          maxRent: z.number().optional(),
          propertyType: z.string().optional(),
          bedrooms: z.number().optional(),
          isAvailable: z.boolean().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      let query = ctx.db.query.properties.findMany({
        orderBy: [desc(properties.createdAt)],
      });

      // Apply filters if provided
      const conditions = [];
      if (input?.city) {
        conditions.push(eq(properties.city, input.city));
      }
      if (input?.isAvailable !== undefined) {
        conditions.push(eq(properties.isAvailable, input.isAvailable));
      }

      if (conditions.length > 0) {
        query = ctx.db.query.properties.findMany({
          where: and(...conditions),
          orderBy: [desc(properties.createdAt)],
        });
      }

      const allProperties = await query;

      // Apply additional filters that can't be done in SQL easily
      let filtered = allProperties;
      if (input?.minRent) {
        filtered = filtered.filter(
          (p) => Number(p.monthlyRent) >= input.minRent!,
        );
      }
      if (input?.maxRent) {
        filtered = filtered.filter(
          (p) => Number(p.monthlyRent) <= input.maxRent!,
        );
      }
      if (input?.propertyType) {
        filtered = filtered.filter((p) => p.propertyType === input.propertyType);
      }
      if (input?.bedrooms) {
        filtered = filtered.filter((p) => p.bedrooms === input.bedrooms);
      }

      return filtered;
    }),

  // Get property by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const property = await ctx.db.query.properties.findFirst({
        where: eq(properties.id, input.id),
      });
      
      if (property) {
        const landlord = await ctx.db.query.users.findFirst({
          where: eq(users.id, property.landlordId),
        });
        return { ...property, landlord };
      }
      
      return property;
    }),

  // Get properties for a landlord
  getByLandlord: protectedProcedure.query(async ({ ctx }) => {
    const kindeUser = ctx.user;
    if (!kindeUser?.id) {
      throw new Error("User not authenticated");
    }

    const landlordProperties = await ctx.db.query.properties.findMany({
      where: eq(properties.landlordId, kindeUser.id),
      orderBy: [desc(properties.createdAt)],
    });

    return landlordProperties;
  }),

  // Create a new property
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        address: z.string().min(1),
        city: z.string().min(1),
        state: z.string().min(1),
        zipCode: z.string().min(1),
        propertyType: z.string(),
        bedrooms: z.number().optional(),
        bathrooms: z.number().optional(),
        squareFeet: z.number().optional(),
        monthlyRent: z.number().positive(),
        description: z.string().optional(),
        images: z.array(z.string().url()).optional(),
        amenities: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const kindeUser = ctx.user;
      if (!kindeUser?.id) {
        throw new Error("User not authenticated");
      }

      // Ensure user exists in our database
      let user = await ctx.db.query.users.findFirst({
        where: eq(users.id, kindeUser.id),
      });

      if (!user) {
        const [newUser] = await ctx.db
          .insert(users)
          .values({
            id: kindeUser.id,
            email: kindeUser.email ?? "",
            name: kindeUser.given_name ?? kindeUser.family_name ?? null,
            role: "landlord",
          })
          .returning();
        user = newUser;
      }

      const [property] = await ctx.db
        .insert(properties)
        .values({
          landlordId: kindeUser.id,
          ...input,
        })
        .returning();

      return property;
    }),

  // Update a property
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1).optional(),
        address: z.string().min(1).optional(),
        city: z.string().min(1).optional(),
        state: z.string().min(1).optional(),
        zipCode: z.string().min(1).optional(),
        propertyType: z.string().optional(),
        bedrooms: z.number().optional(),
        bathrooms: z.number().optional(),
        squareFeet: z.number().optional(),
        monthlyRent: z.number().positive().optional(),
        description: z.string().optional(),
        images: z.array(z.string().url()).optional(),
        amenities: z.array(z.string()).optional(),
        isAvailable: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const kindeUser = ctx.user;
      if (!kindeUser?.id) {
        throw new Error("User not authenticated");
      }

      const { id, ...updates } = input;

      // Verify ownership
      const property = await ctx.db.query.properties.findFirst({
        where: eq(properties.id, id),
      });

      if (!property || property.landlordId !== kindeUser.id) {
        throw new Error("Unauthorized: You don't own this property");
      }

      const [updated] = await ctx.db
        .update(properties)
        .set({
          ...updates,
          updatedAt: new Date(),
        })
        .where(eq(properties.id, id))
        .returning();

      return updated;
    }),

  // Delete a property
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const kindeUser = ctx.user;
      if (!kindeUser?.id) {
        throw new Error("User not authenticated");
      }

      // Verify ownership
      const property = await ctx.db.query.properties.findFirst({
        where: eq(properties.id, input.id),
      });

      if (!property || property.landlordId !== kindeUser.id) {
        throw new Error("Unauthorized: You don't own this property");
      }

      await ctx.db.delete(properties).where(eq(properties.id, input.id));

      return { success: true };
    }),
});
