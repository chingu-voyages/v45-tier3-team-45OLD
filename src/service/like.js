import { db } from '../../firebase_config';
import {
	increment,
	addDoc,
	collection,
	getDocs,
	deleteDoc,
	updateDoc,
	doc,
	query,
	where,
} from 'firebase/firestore';

//💚 💚 💚 💚 💚 💚 💚 💚 💚 💚( LIKE POST )💚 💚 💚 💚 💚 💚 💚 💚 💚 💚

export const likePost = async (postId, userId) => {
	const likeBody = {
		postId: postId,
		userId: userId,
	};

	const postRef = doc(db, 'posts', postId); // Reference to the post

	try {
		// Add the like to the likes collection
		await addDoc(collection(db, 'likes'), likeBody);

		// Increment the likeCount for the post
		await updateDoc(postRef, {
			likesCount: increment(1),
		});
		console.log('likeCount incremented for post ID:', postId);
	} catch (error) {
		console.error('Error liking the post:', error);
		throw new Error('Error liking the post');
	}
};

//❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️( UNLIKE POST )❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️

export const unlikePost = async (postId, userId) => {
	const postRef = doc(db, 'posts', postId); // Reference to the post

	// We'll construct a query to find the specific like document for this user and post
	const likeQuery = query(
		collection(db, 'likes'),
		where('postId', '==', postId),
		where('userId', '==', userId)
	);

	try {
		// Find the like to remove
		const likeSnapshot = await getDocs(likeQuery);

		if (!likeSnapshot.empty) {
			// There should ideally be only one matching like doc, but to ensure we handle all, we'll loop through
			for (const likeDoc of likeSnapshot.docs) {
				await deleteDoc(doc(db, 'likes', likeDoc.id));
			}
			console.log('Post unliked for user:', userId);

			// Decrement the likeCount for the post
			await updateDoc(postRef, {
				likesCount: increment(-1),
			});
			console.log('likeCount decremented for post ID:', postId);
		} else {
			console.warn('No like found for user and post combination');
		}
	} catch (error) {
		console.error('Error unliking the post:', error);
		throw new Error('Error unliking the post');
	}
};
//🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵( GET LIKES )🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵

export const checkLikeStatus = async (postId, userId) => {
	// Construct a query to find the specific like document for this user and post
	const likeQuery = query(
		collection(db, 'likes'),
		where('postId', '==', postId),
		where('userId', '==', userId)
	);

	try {
		// Query for the like
		const likeSnapshot = await getDocs(likeQuery);

		// If there's at least one document in the result, then the post is liked by the user
		return !likeSnapshot.empty;
	} catch (error) {
		console.error('Error checking if post is liked by user:', error);
		throw new Error('Error checking if post is liked by user');
	}
};
