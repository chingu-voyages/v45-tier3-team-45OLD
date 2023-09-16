import { PacmanLoader } from 'react-spinners';
function Loader() {
	return (
		<div className="w-2 mx-auto my-48">
			<PacmanLoader color="#6d28d9" size={80} />
		</div>
	);
}

export default Loader;
