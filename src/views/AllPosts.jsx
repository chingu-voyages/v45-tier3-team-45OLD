import { getAllPosts } from '../service/post';
import { useState, useEffect } from 'react';
import List from '../components/List';
import Loader from '../components/Loader';

export default function AllPosts() {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function initialSetUp() {
			setIsLoading(true);
			try {
				const data = await getAllPosts();
				setPosts(data);
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
