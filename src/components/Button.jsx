import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function Button({ title, path, onClick }) {
	if (path) {
		return (
			<Link
				to={path}
				onClick={onClick}
				className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]  hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			>
				{title}
			</Link>
		);
	}

	return (
		<button
			onClick={onClick}
			className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
		>
			{title}
		</button>
	);
}

export default Button;
