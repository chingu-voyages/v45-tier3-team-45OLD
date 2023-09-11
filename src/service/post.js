import { db } from '../../firebase_config';
import {
	addDoc,
	collection,
	getDocs,
	getDoc,
	deleteDoc,
	updateDoc,
	doc,
	query,
	where,
	orderBy,
} from 'firebase/firestore';

//🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢( POST )🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢

export const createNewPost = async (body) => {
	try {
		await addDoc(collection(db, 'posts'), body);
	} catch (e) {
		console.error('Error adding document: ', e);
	}
};

//🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵( GET )🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵

export const getAllPosts = async () => {
	const postsCollection = collection(db, 'posts');
	const sortedQuery = query(postsCollection, orderBy('createdAt', 'desc'));
	try {
		const querySnapshot = await getDocs(sortedQuery);
		const posts = [];

		querySnapshot.forEach((doc) => {
			const post = doc.data();
			posts.push({
				id: doc.id, // Include the document ID as "id"
				...post, // Include the rest of the post data
			});
		});

		return posts;
	} catch (error) {
		console.error('Error fetching posts:', error);
		throw new Error('Error fetching posts');
	}
};

export const getPostsByEmail = async (email) => {
	const postsCollection = collection(db, 'posts');
	const sortedQuery = query(postsCollection, where('email', '==', email)); // Query where 'userId' field matches provided userId

	try {
		const querySnapshot = await getDocs(sortedQuery);
		const posts = [];

		querySnapshot.forEach((doc) => {
			const post = doc.data();
			posts.push({
				id: doc.id, // Include the document ID as "id"
				...post, // Include the rest of the post data
			});
		});

		return posts;
	} catch (error) {
		console.error('Error fetching posts by user Email:', error);
		throw new Error('Error fetching posts by user Email');
	}
};

export const getPostById = async (postId) => {
	const postRef = doc(db, 'posts', postId); // Get a reference to the post document by its ID

	try {
		const postDoc = await getDoc(postRef);

		if (postDoc.exists()) {
			return {
				id: postDoc.id, // Include the document ID as "id"
				...postDoc.data(), // Include the rest of the post data
			};
		} else {
			console.warn('No such post exists!');
			return null;
		}
	} catch (error) {
		console.error('Error fetching post by ID:', error);
		throw new Error('Error fetching post by ID');
	}
};

export const getLikedPostsByUser = async (userId) => {
	// Step 1: Query the likes collection to get all likes by the specified userId
	const likesCollection = collection(db, 'likes');
	const userLikesQuery = query(likesCollection, where('userId', '==', userId));
	const userLikes = await getDocs(userLikesQuery);

	// Step 2: Extract the list of postId from the likes
	const postIds = userLikes.docs.map((likeDoc) => likeDoc.data().postId);

	let likedPosts = [];

	// Step 3: For each postId, fetch the corresponding post from the posts collection
	for (let postId of postIds) {
		const postData = await getDoc(doc(db, 'posts', postId));

		if (postData.exists()) {
			likedPosts.push({
				id: postData.id,
				...postData.data(),
			});
		}
	}

	return likedPosts;
};
//🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡( PUT )🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡
export const updatePostById = async (postId, body) => {
	const postRef = doc(db, 'posts', postId); // Get a reference to the post document by its ID

	try {
		await updateDoc(postRef, body);
	} catch (error) {
		console.error('Error updating content and image by ID:', error);
		throw new Error('Error updating content and image by ID');
	}
};

//🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴(DELETE)🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴
export const deletePostById = async (postId) => {
	const postRef = doc(db, 'posts', postId); // Get a reference to the post document

	try {
		await deleteDoc(postRef);
	} catch (error) {
		console.error('Error deleting document:', error);
		throw new Error('Error deleting post');
	}
};
