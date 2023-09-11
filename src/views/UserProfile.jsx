import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getPostsByEmail } from '../service/post';
import { getUserByEmail } from '../service/user';
import { EnvelopeIcon } from '@heroicons/react/20/solid';

import List from '../components/List';

function UserProfile() {
	const { email } = useParams();
	const [user, setUser] = useState(null);
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const currentUser = useSelector((state) => state.user.value);
	const isMySelf = email === currentUser.email;

	useEffect(() => {
		async function initialSetUp() {
			setIsLoading(true);

			try {
				const user = await getUserByEmail(email);
				setUser(user);

				const posts = await getPostsByEmail(email);
				setPosts(posts);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		}
		initialSetUp();
	}, [email]);

	if (isLoading) return <div>Loading...</div>;

	if (user)
		return (
			<div className="h-screen p-10 bg-background-grey">
				<div className="overflow-hidden bg-white border rounded-lg shadow-md">
					<div className="bg-white border-b border-gray-200">
						<div className="p-6 sm:flex sm:items-center sm:justify-between">
							<div className="sm:flex sm:space-x-5">
								<div className="flex-shrink-0">
									<img
										className="object-cover w-20 h-20 mx-auto rounded-full"
										src={user.picture}
										alt="user"
									/>
								</div>
								<div className="text-center sm:mt-0 sm:pt-1 sm:text-left">
									<p className="text-sm font-medium text-gray-600">
										welcome to my profile!
									</p>
									<p className="text-xl font-bold text-gray-900 sm:text-2xl">
										{user.username}
									</p>
								</div>
							</div>
							{!isMySelf && (
								<div className="flex justify-center mt-5 sm:mt-0">
									<Link to={'/dashboard/direct-message'} state={user}>
										<button
											type="button"
											className="inline-flex justify-center px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
										>
											<EnvelopeIcon
												className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
												aria-hidden="true"
											/>

											<span>Message</span>
										</button>
									</Link>
								</div>
							)}
						</div>
						<div className="p-6 text-sm font-medium text-gray-600 border-t border-gray-200">
							{user.about}
						</div>
					</div>
				</div>
				{posts.length > 0 && <List posts={posts} />}
			</div>
		);
}

export default UserProfile;
