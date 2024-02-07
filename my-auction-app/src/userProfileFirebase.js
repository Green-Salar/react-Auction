import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore } from './firebase'; // Adjust the path as necessary

const getUserProfile = async (userId) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error('User profile not found');
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

const updateUserProfile = async (userId, profileData) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    await updateDoc(userRef, profileData);
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export { getUserProfile, updateUserProfile };
