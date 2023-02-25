import { createTRPCRouter } from "~/server/api/trpc";
import { bookRouter } from "~/server/api/routers/book.router";

export const appRouter = createTRPCRouter({
	book: bookRouter,
});

export type AppRouter = typeof appRouter;
