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
} from 'firebase/firestore';

//🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢( POST )🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢

export const createNewPost = async (body) => {
	try {
		const docRef = await addDoc(collection(db, 'posts'), body);
		console.log('Document written with ID: ', docRef.id);
	} catch (e) {
		console.error('Error adding document: ', e);
	}
};

//🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵( GET )🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵

export const getAllPosts = async () => {
	const postsCollection = collection(db, 'posts');

	try {
		const querySnapshot = await getDocs(postsCollection);
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

export const getPostsByUserName = async (username) => {
	const postsCollection = collection(db, 'posts');
	const q = query(postsCollection, where('username', '==', username)); // Query where 'userId' field matches provided userId

	try {
		const querySnapshot = await getDocs(q);
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
		console.error('Error fetching posts by user ID:', error);
		throw new Error('Error fetching posts by user ID');
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
//🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡( PUT )🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡
export const updatePostById = async (postId, body) => {
	const postRef = doc(db, 'posts', postId); // Get a reference to the post document by its ID

	try {
		await updateDoc(postRef, body);
		console.log(`Document with ID ${postId} updated successfully.`);
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
		console.log('Document deleted with ID:', postId);
	} catch (error) {
		console.error('Error deleting document:', error);
		throw new Error('Error deleting post');
	}
};
