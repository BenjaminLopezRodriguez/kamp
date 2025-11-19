import { postRouter } from "@/server/api/routers/post";
import { userRouter } from "@/server/api/routers/user";
import { propertyRouter } from "@/server/api/routers/property";
import { leaseRouter } from "@/server/api/routers/lease";
import { maintenanceRouter } from "@/server/api/routers/maintenance";
import { paymentRouter } from "@/server/api/routers/payment";
import { messageRouter } from "@/server/api/routers/message";
import { applicationRouter } from "@/server/api/routers/application";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  user: userRouter,
  property: propertyRouter,
  lease: leaseRouter,
  maintenance: maintenanceRouter,
  payment: paymentRouter,
  message: messageRouter,
  application: applicationRouter,
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
