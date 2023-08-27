import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase_config';

function PrivateRoutes() {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setIsLoading(false);
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
	}, []);

	if (isLoading) {
		return <div>Loading ...</div>;
	}

	return user ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
