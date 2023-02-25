type toastManagerProps = {
	setToasts: (toastList: Toast[]) => void;
	toasts: Toast[];
};

export default function Toastmanager(props: toastManagerProps) {
	return (
		<div className="absolute right-2 h-[95%] overflow-scroll">
			{props.toasts.map((toast: Toast, index: number) => {
				switch (toast.type) {
					case "SUCCESS":
						return successToast(
							toast.message,
							index,
							props.toasts,
							props.setToasts,
						);
					case "ERROR":
						return errorToast(
							toast.message,
							index,
							props.toasts,
							props.setToasts,
						);
				}
			})}
		</div>
	);
}

function successToast(
	msg: string,
	index: number,
	toasts: Toast[],
	setToasts: (toasts: Toast[]) => void,
) {
	return (
		<div
			className="flex items-center w-80 p-4 mb-4 text-black  bg-[#a6e3a1] rounded-lg shadow"
			role="alert"
			key={index}
		>
			<div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-black bg-green-100 rounded-lg">
				<svg
					aria-hidden="true"
					className="w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
						clipRule="evenodd"
					/>
				</svg>
			</div>
			<div className="ml-3 text-sm font-normal truncate">{msg}</div>
			<button
				type="button"
				className="ml-auto -mx-1.5 -my-1.5 bg-white text-black hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
				aria-label="Close"
				onClick={() => setToasts(toasts.filter((_t, i) => i !== index))}
			>
				<svg
					aria-hidden="true"
					className="w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clipRule="evenodd"
					/>
				</svg>
			</button>
		</div>
	);
}

function errorToast(
	msg: string,
	index: number,
	toasts: Toast[],
	setToasts: (toasts: Toast[]) => void,
) {
	return (
		<div
			className="flex items-center w-80 p-4 mb-4 text-black bg-[#eba0ac] rounded-lg shadow"
			role="alert"
			key={index}
		>
			<div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-black bg-[#f38ba8] rounded-lg">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
					/>
				</svg>
			</div>
			<div className="ml-3 text-sm font-normal truncate">{msg}</div>
			<button
				type="button"
				className="ml-auto -mx-1.5 -my-1.5 bg-white text-black hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
				aria-label="Close"
				onClick={() => setToasts(toasts.filter((_t, i) => i !== index))}
			>
				<svg
					aria-hidden="true"
					className="w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</div>
	);
}
export type Toast = {
	type: "SUCCESS" | "ERROR" | "WARNING";
	message: string;
};
