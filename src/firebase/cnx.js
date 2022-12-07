import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL, getBytes } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs, getDoc, query, where, setDoc, deleteDoc } from 'firebase/firestore';

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
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getFirestore(app);
const dbCollections = {
  Contacts: "Contacts",
};

export async function userExist(uid) {
  const docRef = doc(db,dbCollections, uid);
  const res = await getDoc(docRef);
  console.log(res);
  return res.exists();
}

export async function existUsername(username) {
  const users = []
  const docsRef = collection(db, dbCollections)
  const q = query(docsRef, where('username','==', username))

  const querySanpshot = await getDocs(q)
  querySanpshot.forEach(doc => {
    users.push(doc.data())
  })

  return users.length > 0 ? users[0].uid : null
}

export async function registerNewUser(user) {
  try {
    const collectionRef = collection(db, dbCollections)
    const docRef = doc(collectionRef, user.uid)
    await setDoc(docRef, user)
  } catch (error) {
    console.error(error);
  }
}

export async function updateUser(user) {
  try {
    const collectionRef = collection(db, dbCollections)
    const docRef = doc(collectionRef, user.uid)
    await setDoc(docRef, user)
  } catch (error) {
    console.error(error);
  }
}

export async function getUserInfo(uid) {
  try {
    const docRef = doc(db,dbCollections, uid);
    const res = await getDoc(docRef);
    return res.data();
  } catch (error) {
    console.error(error);
  }
}