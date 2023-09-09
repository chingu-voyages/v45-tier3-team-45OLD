import { signOut } from 'firebase/auth';
import { removeUser } from '../features/auth/authSlice';

export function onLogout(auth, dispatch, navigate) {
	return function (event) {
		event.preventDefault();
		signOut(auth)
			.then(() => {
				dispatch(removeUser());
				navigate('/');
			})
			.catch((error) => {
				console.error(error);
			});
	};
}
