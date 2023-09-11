import { getLikedPostsByUser } from '../service/post';
import { useState, useEffect } from 'react';
import List from '../components/List';

import { useSelector } from 'react-redux';

function LikedPosts() {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const currentUser = useSelector((state) => state.user.value);

	useEffect(() => {
		async function initialSetUp() {
			setIsLoading(true);
			try {
				const data = await getLikedPostsByUser(currentUser.id);
				setPosts(data);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		}
		initialSetUp();
	}, [currentUser.id]);

	if (isLoading) return <div>Loading...</div>;

	return <List posts={posts} />;
}

export default LikedPosts;
