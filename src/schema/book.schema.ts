import * as z from "zod";

export const bookSchema = z.object({
	id: z.string(),
	title: z.string().min(1, "Title can't be empty"),
	author: z.string().min(1, "Author can't be empty"),
	description: z.string().min(1, "Description can't be empty"),
});

export const createBookSchema = z.object({
	title: z.string().min(1, "Title can't be empty"),
	author: z.string().min(1, "Author can't be empty"),
	description: z.string().min(1, "Description can't be empty"),
});

export type CreateBook = z.infer<typeof createBookSchema>;
