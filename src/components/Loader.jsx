import { PacmanLoader } from 'react-spinners';
function Loader() {
	return (
		<div className="w-2 mx-auto my-48">
			<PacmanLoader color="#36d7b7" size={80} />
		</div>
	);
}

export default Loader;
