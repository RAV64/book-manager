import { type CreateBook } from "~/schema/book.schema";
import { type Book } from "@prisma/client";
import { type SyntheticEvent, useEffect, useState } from "react";

type bookFormProps = {
	createOneBook: (book: CreateBook) => void;
	updateOneBook: (book: Book) => void;
	deleteOneBook: (book: Book) => void;
	selectedBook: Book;
	setSelectedBook: (book: Book) => void;
};

export default function BookForm(props: bookFormProps) {
	const [book, setBook] = useState<Book>(props.selectedBook);

	useEffect(() => {
		setBook(props.selectedBook);
	}, [props.selectedBook]);

	const handleCreateBook = (event: SyntheticEvent) => {
		event.preventDefault();
		props.createOneBook(book);
	};

	const handleDeleteBook = (event: SyntheticEvent) => {
		event.preventDefault();
		props.deleteOneBook(book);
	};

	const handleUpdateBook = (event: SyntheticEvent) => {
		event.preventDefault();
		props.updateOneBook(book);
	};

	const clearBook = () => {
		props.setSelectedBook({ title: "", author: "", description: "", id: "" });
	};

	return (
		<div className="flex flex-col justify-center w-full">
			{/* form fields with corresponding labels */}
			<div className="flex flex-col md:flex-row">
				<div className="flex flex-col flex-1 p-2">
					<label
						className="block text-sm font-bold mb-2"
						htmlFor="title"
					>
						Title
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
						id="title"
						type="text"
						placeholder="Title of the book"
						value={book ? book.title : ""}
						onChange={(e) => setBook({ ...book, title: e.target.value })}
					/>

					<label
						className="block text-sm font-bold my-2"
						htmlFor="author"
					>
						Author
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
						id="author"
						type="text"
						placeholder="Author's name"
						value={book ? book.author : ""}
						onChange={(e) => setBook({ ...book, author: e.target.value })}
					/>
				</div>

				<div className="flex flex-col flex-1 p-2">
					<label
						className="block text-sm font-bold mb-2"
						htmlFor="description"
					>
						Description
					</label>
					<textarea
						className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline h-[100%]"
						id="description"
						placeholder="The book's description"
						value={book ? book.description : ""}
						onChange={(e) => setBook({ ...book, description: e.target.value })}
					/>
				</div>
			</div>

			{/* show different buttons based on state of the form */}
			<div className="text-sm">
				{book.id ? (
					<div className="flex flex-row">
						<button
							className="bg-[#a6e3a1] w-20 rounded border-solid appearance-none shadow m-2 hover:bg-gray-200"
							onClick={handleUpdateBook}
						>
							Edit
						</button>
						<button
							className="bg-[#f38ba8] w-20 rounded border-solid appearance-none shadow m-2 hover:bg-gray-200"
							onClick={handleDeleteBook}
						>
							Delete
						</button>
						<button
							className="bg-[#9399b2] w-20 rounded border-solid appearance-none shadow m-2 hover:bg-gray-200"
							onClick={clearBook}
						>
							Cancel
						</button>
						<div className="p-2 text-right flex-1">Book id: {book.id}</div>
					</div>
				) : (
					<div className="flex flex-row">
						<button
							className="bg-[#a6e3a1] w-20 rounded border-solid appearance-none shadow m-2 hover:bg-gray-200"
							onClick={handleCreateBook}
						>
							Save new
						</button>

						{(book.author || book.title || book.description) && (
							<button
								className="bg-[#9399b2] w-20 rounded border-solid appearance-none shadow m-2 hover:bg-gray-200"
								onClick={clearBook}
							>
								Clear
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
