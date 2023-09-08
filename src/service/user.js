import { db } from '../../firebase_config';
import {
	addDoc,
	collection,
	query,
	where,
	getDocs,
	updateDoc,
	doc,
} from 'firebase/firestore';

//🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢( POST )🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢

export const createNewUser = async (email) => {
	const defaultProfilePic =
		'https://res.cloudinary.com/yilin1234/image/upload/v1685746074/Generic-Profile-Image_vlk1kx.png';
	const defaultAbout =
		"Hello, I'm new here and excited to be part of this community!";
	const defaultUsername = email;
	const userQuery = query(
		collection(db, 'users'),
		where('username', '==', email)
	);
	const userSnap = await getDocs(userQuery);

	if (userSnap.empty) {
		await addDoc(collection(db, 'users'), {
			username: defaultUsername,
			picture: defaultProfilePic,
			about: defaultAbout,
			email: email,
		});
	} else {
		// Handle duplicate user
		console.error('User already exists');
	}
};

//🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵( GET )🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵

export const getUserByEmail = async (email) => {
	const usersCollection = collection(db, 'users');
	const q = query(usersCollection, where('email', '==', email));
	const querySnapshot = await getDocs(q);

	if (!querySnapshot.empty) {
		const userDoc = querySnapshot.docs[0];
		return {
			id: userDoc.id,
			...userDoc.data(),
		}; // Make sure to add the document ID
	} else {
		throw new Error('No user found with the provided email');
	}
};

export const getAllUsers = async () => {
	const usersCollection = collection(db, 'users');

	try {
		const querySnapshot = await getDocs(usersCollection);
		const users = [];

		querySnapshot.forEach((doc) => {
			const user = doc.data();
			users.push({
				id: doc.id, // Include the document ID as "id"
				...user, // Include the rest of the post data
			});
		});
		console.log('users: ', users);
		return users;
	} catch (error) {
		console.error('Error fetching users:', error);
		throw new Error('Error fetching users');
	}
};

//🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡( PUT )🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡

export async function updateUserProfile(
	userId,
	username,
	profilePictureUrl,
	aboutMe
) {
	const usersCollection = collection(db, 'users');

	// Check if username is taken by another user
	const usernameQuery = query(
		usersCollection,
		where('username', '==', username)
	);
	const usernameQuerySnapshot = await getDocs(usernameQuery);

	if (!usernameQuerySnapshot.empty) {
		const existingUserDoc = usernameQuerySnapshot.docs[0];
		const existingUserId = existingUserDoc.id;

		if (existingUserId !== userId) {
			throw new Error('Username is already taken by another user');
		}
	}

	// Reference to the user document
	const userDocRef = doc(usersCollection, userId);

	try {
		// Update the user profile
		await updateDoc(userDocRef, {
			username: username,
			picture: profilePictureUrl,
			about: aboutMe,
		});
	} catch (error) {
		console.error('Error updating user profile:', error);
	}
}
