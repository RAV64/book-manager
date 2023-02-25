import { type Book } from "@prisma/client";

type listBooksProps = {
	books: Book[];
	selectBook: (book: Book) => void;
};

export default function ListBooks(props: listBooksProps) {
	return (
		<div className="rounded overflow-scroll h-full w-[97.5%] shadow-2xl">
			<div className="flex flex-col mx-auto items-center justify-center bg-white shadow text-gray-800 overflow-hidden">
				<ul className="flex flex-col divide-y w-full">
					{props.books.map((book: Book) => (
						<li className="flex-1 flex-row" key={book.id}>
							<button
								className="select-none cursor-pointer hover:bg-gray-200 flex flex-1 p-2 text-left w-full"
								onClick={() => props.selectBook(book)}
							>
								<div className="flex-1">
									<div className="font-medium truncate w-3/4">{book.title}</div>
									<div className="text-sm truncate w-3/4">{book.author}</div>
								</div>
								<div className="flex flex-col w-10 justify-center items-center pl-2 invisible sm:visible">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										className="w-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
										/>
									</svg>
								</div>
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
