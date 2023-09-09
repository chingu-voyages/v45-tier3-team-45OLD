import { getPostsByUserName } from '../service/post';
import { useState, useEffect } from 'react';
import List from '../components/List';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';

export default function MyPosts() {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const currentUser = useSelector((state) => state.user.value);

	useEffect(() => {
		async function initialSetUp() {
			setIsLoading(true);
			try {
				const data = await getPostsByUserName(currentUser.username);
				setPosts(data);
				console.log(data);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		}
		initialSetUp();
	}, []);

	if (isLoading) return <Loader />;

	return <List posts={posts} />;
}
