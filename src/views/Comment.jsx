import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCommentsByPostId, createNewComment } from '../service/comment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ListItem from '../components/ListItem';

function Comment({ postId }) {
	const [input, setInput] = useState('');
	const [comments, setComments] = useState([]);
	const currentUser = useSelector((state) => state.user.value);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function initialSetUp() {
			setIsLoading(true);
			try {
				const data = await getCommentsByPostId(postId);

				setComments(data);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		}
		initialSetUp();
	}, [postId]);

	async function handleOnSubmit(e) {
		e.preventDefault();

		try {
			const now = new Date();
			await createNewComment(
				postId,
				currentUser.id,
				input,
				now.toISOString(),
				currentUser.username,
				currentUser.email,
				currentUser.picture
			);
			toast.success('create new comment successfully!');
			setInput('');
		} catch (error) {
			console.error(error);
			toast.error('An error occurred while create new comment.');
		}
	}

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className="bg-white isolate">
			<ToastContainer position="bottom-right" />
			<form onSubmit={handleOnSubmit}>
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
					<div className="sm:col-span-2">
						<textarea
							rows={5}
							className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="  add your comment..."
							required
						/>
					</div>
				</div>
				<div className="flex items-center justify-end mt-2 gap-x-6">
					<button
						type="submit"
						className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						post
					</button>
				</div>
			</form>

			<div className="max-w-xl mx-auto mt-5">
				<div>
					{comments.length > 0 &&
						comments.map((comment) => (
							<ListItem comment={comment} key={comment.id} />
						))}
				</div>
			</div>
		</div>
	);
}

export default Comment;
