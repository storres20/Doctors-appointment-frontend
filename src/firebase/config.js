// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import { v4 } from 'uuid';

import {
  getStorage, ref, uploadBytes, getDownloadURL,
} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCSKF091Gv7x52TEKlU14U_mmtqZkBQ_S8',
  authDomain: 'fire-upimages.firebaseapp.com',
  projectId: 'fire-upimages',
  storageBucket: 'fire-upimages.appspot.com',
  messagingSenderId: '469969026185',
  appId: '1:469969026185:web:b1de52affe0a8b64751a58',
  measurementId: 'G-1RW56W6DKD',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);

/*
Upload a file to firebase storage
@param {File} file the file to upload
@returns {Promise<string>} url of the uploaded file
*/

export async function uploadFile(file) {
  const storageRef = ref(storage, v4());
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
