import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { bookSchema, createBookSchema } from "~/schema/book.schema";

export const bookRouter = createTRPCRouter({
	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.book.findMany();
	}),
	createOne: publicProcedure
		.input(z.object({ book: createBookSchema }))
		.mutation(({ ctx, input }) => {
			return ctx.prisma.book.create({ data: input.book });
		}),
	deleteOne: publicProcedure
		.input(z.object({ id: z.string() }))
		.mutation(({ ctx, input }) => {
			return ctx.prisma.book.delete({ where: { id: input.id } });
		}),
	updateOne: publicProcedure
		.input(z.object({ book: bookSchema }))
		.mutation(({ ctx, input }) => {
			return ctx.prisma.book.update({
				where: { id: input.book.id },
				data: input.book,
			});
		}),
});
