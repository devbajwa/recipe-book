/**
    File:  recipeService.js
    Author: Waqas Naeem Bajwa
*/

import useFirebase from "../firebase/useFirebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  orderBy,
  FieldValue,
  increment
} from "firebase/firestore";
const { firebase } = useFirebase();

export const recipeService = {
  /* Firestore Cloud */

  // Get all the recipes
  async getFirestoreRecipes() {
    try {
      const q = query(collection(firebase.db, "recipes"), orderBy("date", "desc"));
      //const querySnapshot = await getDocs(collection(firebase.db, "recipes"));
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return data;
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  },

  // Add single recipe with auto gen id
  async addFirestoreRecipe(recipe) {
    try {
      const docRef = await addDoc(collection(firebase.db, "recipes"), recipe);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  },

  // Get single recipe with id
  async getFirestoreRecipe(recipeID) {
    try {
      const q = doc(firebase.db, "recipes", recipeID);
      const querySnapshot = await getDoc(q);
      return querySnapshot;
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  },

  // Get recipe(s) which the current user added
  async getFirestoreCurrentUserRecipes(currentUserEmail) {
    try {
      const q = query(collection(firebase.db, "recipes"), where("currentUserEmail", "==", currentUserEmail), orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return data;
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  },

  // Update recipe which the updated data for recipe
  async updateFirestoreRecipe(recipeID, recipeData) {
    try {
      const recipeRef = doc(firebase.db, "recipes", recipeID);
      // Set the recipeData to matching id in firestore
      await updateDoc(recipeRef, recipeData);
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  },

  // Delete recipe with recipe ID
  async deleteFirestoreRecipe(recipeID) {
    try {
      await deleteDoc(doc(firebase.db, "recipes", recipeID));
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  },

  // Increment likes by 1
  async updateFirestoreRecipeLikes(recipeID) {
    try {
      await updateDoc(doc(firebase.db, "recipes", recipeID), {
        likes: increment(1)
      });
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  },


};