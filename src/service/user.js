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
		return userDoc.data(); // Make sure to add the document ID
	} else {
		throw new Error('No user found with the provided email');
	}
};

//🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡( PUT )🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡

// export const updateUserByEmail = async (email, body) => {
//   const usersCollection = collection(db, "users");
//   const q = query(usersCollection, where("email", "==", email));
//   const querySnapshot = await getDocs(q);

//   if (!querySnapshot.empty) {
//     const userDoc = querySnapshot.docs[0];
//     const userRef = doc(db, "users", userDoc.id);

//     try {
//       await updateDoc(userRef, body);
//       console.log("User profile updated successfully");
//     } catch (error) {
//       console.error("Error updating user profile:", error);
//     }
//   } else {
//     console.error("No user found with the provided email");
//   }
// };

// Check if a username is already taken by another user
async function isUsernameTakenByOtherUser(username, email) {
	const usersCollection = collection(db, 'users');
	const q = query(usersCollection, where('username', '==', username));
	const querySnapshot = await getDocs(q);

	if (!querySnapshot.empty) {
		const existingUserDoc = querySnapshot.docs[0];
		const existingUserEmail = existingUserDoc.data().email;
		return existingUserEmail !== email; // Return true if the username is taken by another user
	}

	return false; // Username is not taken by another user
}

// Create or update a user profile with username uniqueness check
export async function updateUserByEmail(
	email,
	username,
	profilePictureUrl,
	aboutMe
) {
	const isTakenByOtherUser = await isUsernameTakenByOtherUser(username, email);

	if (isTakenByOtherUser) {
		throw new Error('Username is already taken by another user');
	}

	const usersCollection = collection(db, 'users');
	const q = query(usersCollection, where('email', '==', email));
	const querySnapshot = await getDocs(q);

	try {
		if (!querySnapshot.empty) {
			const userDoc = querySnapshot.docs[0];
			const userDocRef = doc(usersCollection, userDoc.id);

			// Update the user profile
			await updateDoc(userDocRef, {
				username: username,
				picture: profilePictureUrl,
				about: aboutMe,
			});
		}
	} catch (error) {
		console.error('Error updating user profile:', error);
	}
}
