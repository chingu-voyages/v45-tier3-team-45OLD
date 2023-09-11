import { db } from '../../firebase_config';
import {
	increment,
	addDoc,
	collection,
	query,
	where,
	getDocs,
	getDoc,
	updateDoc,
	deleteDoc,
	doc,
} from 'firebase/firestore';

//💚 💚 💚 💚 💚 💚 💚 💚 💚( create New Comment )💚 💚 💚 💚 💚 💚 💚 💚 💚 💚
export const createNewComment = async (
	postId,
	userId,
	content,
	createdAt,
	username,
	picture
) => {
	const commentBody = {
		postId: postId,
		userId: userId,
		content: content,
		createdAt: createdAt,
		username: username,
		picture: picture,
	};

	const postRef = doc(db, 'posts', postId);
	try {
		await addDoc(collection(db, 'comments'), commentBody);
		await updateDoc(postRef, { commentsCount: increment(1) });
	} catch (error) {
		console.error('Error creating comment:', error);
		throw new Error('Error creating comment');
	}
};
//🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵( GET COMMENTS )🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵

export const getCommentsByPostId = async (postId) => {
	const commentsCollection = collection(db, 'comments');
	const sortedQuery = query(commentsCollection, where('postId', '==', postId));

	try {
		const querySnapshot = await getDocs(sortedQuery);
		const comments = [];

		querySnapshot.forEach((doc) => {
			const comment = doc.data();
			comments.push({
				id: doc.id, // Include the document ID as "id"
				...comment, // Include the rest of the comment data
			});
		});

		return comments;
	} catch (error) {
		console.error('Error fetching comments by post ID:', error);
		throw new Error('Error fetching comments by post ID');
	}
};
//🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴(DELETE)🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴

export const deleteCommentById = async (commentId) => {
	const commentRef = doc(db, 'comments', commentId); // Reference to the comment

	try {
		// Get the comment data first, to retrieve the associated postId
		const commentDoc = await getDoc(commentRef);
		if (!commentDoc.exists()) {
			console.warn('No such comment exists!');
			return;
		}

		const { postId } = commentDoc.data();
		const postRef = doc(db, 'posts', postId); // Reference to the post

		// Delete the comment
		await deleteDoc(commentRef);
		console.log('Comment deleted with ID:', commentId);

		// Decrement the commentsCount for the associated post
		await updateDoc(postRef, {
			commentsCount: increment(-1),
		});
		console.log('commentsCount decremented for post ID:', postId);
	} catch (error) {
		console.error('Error deleting comment:', error);
		throw new Error('Error deleting comment');
	}
};
//🛠️ 🛠️ 🛠️ 🛠️ 🛠️ 🛠️ 🛠️ 🛠️ 🛠️ 🛠️( UPDATE COMMENT BY ID )🛠️ 🛠️ 🛠️ 🛠️ 🛠️ 🛠️ 🛠️ 🛠️ 🛠️ 🛠️

export const updateCommentById = async (commentId, updatedContent) => {
	const commentRef = doc(db, 'comments', commentId); // Reference to the comment

	try {
		// Update the comment's content
		await updateDoc(commentRef, {
			content: updatedContent,
		});
		console.log('Comment updated with ID:', commentId);
	} catch (error) {
		console.error('Error updating comment:', error);
		throw new Error('Error updating comment');
	}
};
