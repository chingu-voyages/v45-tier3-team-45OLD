import { db } from "../../firebase_config";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";

//🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢( POST )🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢

export const createNewUser = async (email) => {
  const defaultProfilePic =
    "https://res.cloudinary.com/yilin1234/image/upload/v1685746074/Generic-Profile-Image_vlk1kx.png";
  const defaultAbout =
    "Hello, I'm new here and excited to be part of this community!";
  const defaultUsername = email
  const userQuery = query(
    collection(db, "users"),
    where("username", "==", email),
  );
  const userSnap = await getDocs(userQuery);

  if (userSnap.empty) {
    const docRef = await addDoc(collection(db, "users"), {
      username: defaultUsername,
      picture: defaultProfilePic,
      about: defaultAbout,
      email: email,
    });
  } else {
    // Handle duplicate user
    console.error("User already exists");
  }
};

// //🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵( GET )🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵

export const getUserByEmail = async (email) => {
  const usersCollection = collection(db, "users");
  const q = query(usersCollection, where("username", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    return userDoc.data(); // Make sure to add the document ID
  } else {
    throw new Error("No user found with the provided email");
  }
};

// //🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡( PUT )🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡

// export const updateUserById = async (id: string, body: UserUpdateBody) => {
//     await instance.put(update-user/${id}, body);
// };
