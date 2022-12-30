//@typecheck

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();

// Manejo de Usuarios
export async function registerNewUser(user) {
  try {
    const usersRef = collection(db, "users");
    await setDoc(doc(usersRef, user.uid), user);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getUserInfo(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function userExists(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  return docSnap.exists();
}

export async function updateUser(user) {
  // console.log(user);
  try {
    const usersRef = collection(db, "users");
    await setDoc(doc(usersRef, user.uid), user);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function existsUsername(username) {
  const users = [];
  const q = query(collection(db, "users"), where("username", "==", username));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    users.push(doc.data());
  });
  return users.length > 0 ? users[0].uid : null;
}

export async function getUserProfilePhoto(usernamePhoto) {
  const imagesRef = ref(storage, `images/${usernamePhoto}`);
}

export async function setUserProfilePhoto(uid, file) {
  const storage = getStorage();
  const mountainImagesRef = ref(storage, `images/${uid}`);
  const res = await uploadBytes(mountainImagesRef, file);
  // console.log("file uploaded", res);
  return res;
}

export async function getProfilePhotoUrl(profilePicture) {
  const profileRef = ref(storage, profilePicture);
  // console.log(profilePicture);
  const url = await getDownloadURL(profileRef);
  // console.log({ url });
  return url;
}

// Manejo de Contactos
export async function fetchContactData(uid) {
  const contacts = [];
  const q = query(collection(db, "contacts"), where("uid", "==", uid));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const contact = { ...doc.data() };
    contact.docId = doc.id;
    // console.log(contact);
    contacts.push(contact);
  });
  return contacts;
}

export async function insertNewContact(contact) {
  try {
    const contactsRef = collection(db, "contacts");
    const res = await addDoc(contactsRef, contact);
    return res;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getUserPublicProfileInfo(uid) {
  const profileInfo = await getUserInfo(uid);
  const contactsInfo = await fetchContactData(uid);
  return {
    profile: profileInfo,
    contacts: contactsInfo,
  };
}

export async function deleteContact(docId) {
  await deleteDoc(doc(db, "contacts", docId));
}

export async function updateContact(docId, contact) {
  const res = await setDoc(doc(db, "contacts", docId), contact);
  // console.log("update contact", docId, contact, res);
}

// Salida del Sistema con Logout
export async function logout() {
  await auth.signOut();
}
