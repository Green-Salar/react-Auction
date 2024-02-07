// src/firebaseServices.js
import { firestore, auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


// User Authentication Services
const registerUser = async (email, password, nickname) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  
  // Save the nickname to Firestore
  const userDocRef = doc(firestore, 'users', user.uid);
  await setDoc(userDocRef, { nickname: nickname });
  
  // Return the user object along with the nickname
  return { user, nickname };
};

const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};


// Item Management Services
const postItem = async (itemData, userId) => {
          const storage = getStorage();
          let imageFiles = itemData.images;
          if (!Array.isArray(imageFiles)) {
            // Handle the error or set imageFiles to an empty array
            imageFiles = [];
          }
          const imageUrls = await Promise.all(
            
                  imageFiles.map(async (file) => {
                    // Create a unique file name for each image to avoid collisions in storage
                    const uniqueFileName = `${Date.now()}-${file.name}`;
                    const imageRef = ref(storage, `images/${uniqueFileName}`);
                    
                    await uploadBytes(imageRef, file);
                    return getDownloadURL(imageRef); // Retrieve the download URL after upload
                })
              );

          const newItemData = {
                    ...itemData,
                    images: imageUrls,
                    userId: userId,
          };

          const docRef = await addDoc(collection(firestore, 'items'), newItemData);
          return docRef.id;
};


export { registerUser, loginUser,  postItem };
