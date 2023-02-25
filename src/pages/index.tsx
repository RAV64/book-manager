import { type NextPage } from "next";
import { type Book } from "@prisma/client";
import ListBooks from "~/components/listBooks";
import { type CreateBook } from "~/schema/book.schema";
import { api } from "~/utils/api";
import BookForm from "~/components/bookForm";
import { useState } from "react";
import { type TRPCClientErrorLike } from "@trpc/client";
import { type AppRouter } from "~/server/api/root";
import Toastmanager, { type Toast } from "~/components/toastManager";

const emptyBook = {
	title: "",
	author: "",
	description: "",
	id: "",
};

const Home: NextPage = () => {
	const [selectedBook, setSelectedBook] = useState<Book>(emptyBook);
	const [toasts, setToasts] = useState<Toast[]>([]);

	const { data: allBooks, refetch } = api.book.getAll.useQuery();

	const handleError = (err: TRPCClientErrorLike<AppRouter>) => {
		// there must be a better way..
		const errors: Toast[] = JSON.parse(err.message).map(
			(e: { message: string }): Toast => {
				return { type: "ERROR", message: e.message };
			},
		);
		setToasts([...toasts, ...errors]);
	};

	const bookCreateOne = api.book.createOne.useMutation({
		onSuccess: (e) => {
			setToasts([
				...toasts,
				{ type: "SUCCESS", message: `Succesfully added ${e.title}` },
			]);
			void refetch();
		},
		onError: handleError,
	});

	const bookDeleteOne = api.book.deleteOne.useMutation({
		onSuccess: (e) => {
			setToasts([
				...toasts,
				{ type: "SUCCESS", message: `Succesfully deleted ${e.title}` },
			]);
			void refetch();
		},
		onError: handleError,
	});

	const bookUpdateOne = api.book.updateOne.useMutation({
		onSuccess: (e) => {
			setToasts([
				...toasts,
				{ type: "SUCCESS", message: `Succesfully updated ${e.title}` },
			]);
			void refetch();
		},
		onError: handleError,
	});

	const deleteOneBook = (book: Book) => {
		bookDeleteOne.mutate({ id: book.id });
	};

	const createOneBook = (book: CreateBook) => {
		bookCreateOne.mutate({ book });
	};

	const updateOneBook = (book: Book) => {
		bookUpdateOne.mutate({ book });
	};

	return (
		<main className="flex min-h-screen flex-col items-center">
			<div className="flex flex-col items-center gap-6 py-6 w-3/4 max-h-screen">
				<BookForm
					createOneBook={createOneBook}
					deleteOneBook={deleteOneBook}
					updateOneBook={updateOneBook}
					selectedBook={selectedBook}
					setSelectedBook={setSelectedBook}
				/>
				{allBooks ? (
					<ListBooks books={allBooks} selectBook={setSelectedBook} />
				) : (
					"Loading"
				)}
				<Toastmanager toasts={toasts} setToasts={setToasts} />
			</div>
		</main>
	);
};

export default Home;
