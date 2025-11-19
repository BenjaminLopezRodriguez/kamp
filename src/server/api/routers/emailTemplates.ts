import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { emailTemplates } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const emailTemplatesRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        type: z.enum(["room_tour", "inspection", "peer_preview", "general"]),
        subject: z.string(),
        body: z.string(),
        variables: z.string().optional(),
        isDefault: z.boolean().default(false),
        createdBy: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [template] = await ctx.db
        .insert(emailTemplates)
        .values(input)
        .returning();
      
      return template;
    }),

  getAll: publicProcedure
    .input(
      z.object({
        type: z.enum(["room_tour", "inspection", "peer_preview", "general"]).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (!input.type) {
        return await ctx.db.select().from(emailTemplates);
      }

      return await ctx.db
        .select()
        .from(emailTemplates)
        .where(eq(emailTemplates.type, input.type));
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const [template] = await ctx.db
        .select()
        .from(emailTemplates)
        .where(eq(emailTemplates.id, input.id));
      
      return template;
    }),

  getDefault: publicProcedure
    .input(
      z.object({
        type: z.enum(["room_tour", "inspection", "peer_preview", "general"]),
      }),
    )
    .query(async ({ ctx, input }) => {
      const [template] = await ctx.db
        .select()
        .from(emailTemplates)
        .where(eq(emailTemplates.type, input.type))
        .where(eq(emailTemplates.isDefault, true));
      
      return template;
    }),

  sendEmail: publicProcedure
    .input(
      z.object({
        templateId: z.number(),
        to: z.string().email(),
        variables: z.record(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Get template
      const [template] = await ctx.db
        .select()
        .from(emailTemplates)
        .where(eq(emailTemplates.id, input.templateId));

      if (!template) {
        throw new Error("Template not found");
      }

      // Replace variables in subject and body
      let subject = template.subject;
      let body = template.body;

      Object.entries(input.variables).forEach(([key, value]) => {
        const placeholder = `{{${key}}}`;
        subject = subject.replace(new RegExp(placeholder, "g"), value);
        body = body.replace(new RegExp(placeholder, "g"), value);
      });

      // Here you would integrate with your email service (SendGrid, AWS SES, etc.)
      console.log("Sending email:", {
        to: input.to,
        subject,
        body,
      });

      return {
        success: true,
        message: "Email sent successfully",
      };
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(emailTemplates).where(eq(emailTemplates.id, input.id));
      return { success: true };
    }),
});
