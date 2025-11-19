import { postRouter } from "@/server/api/routers/post";
import { roomToursRouter } from "@/server/api/routers/roomTours";
import { inspectionsRouter } from "@/server/api/routers/inspections";
import { peerPreviewsRouter } from "@/server/api/routers/peerPreviews";
import { emailTemplatesRouter } from "@/server/api/routers/emailTemplates";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  roomTours: roomToursRouter,
  inspections: inspectionsRouter,
  peerPreviews: peerPreviewsRouter,
  emailTemplates: emailTemplatesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
