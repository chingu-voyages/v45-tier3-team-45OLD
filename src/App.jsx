import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from './components/Loader';
const Landing = lazy(() => import('./views/Landing'));
const Login = lazy(() => import('./views/Login'));
const Signup = lazy(() => import('./views/Signup'));
const Dashboard = lazy(() => import('./views/Dashboard'));
const PrivateRoutes = lazy(() => import('./views/PrivateRoutes'));
const AllPosts = lazy(() => import('./views/AllPosts'));
const Create = lazy(() => import('./views/Create'));
const MyProfile = lazy(() => import('./views/MyProfile'));
const MyPosts = lazy(() => import('./views/MyPosts'));
const EditPost = lazy(() => import('./views/EditPost'));

function App() {
	return (
		<Suspense fallback={<Loader />}>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route element={<PrivateRoutes />}>
					<Route path="/dashboard" element={<Dashboard />}>
						<Route path="my-profile" element={<MyProfile />} />
						<Route path="all-posts" element={<AllPosts />} />
						<Route path="my-posts" element={<MyPosts />} />
						<Route path="edit/:id" element={<EditPost />} />
						<Route path="create" element={<Create />} />
					</Route>
				</Route>
			</Routes>
		</Suspense>
	);
}

export default App;
