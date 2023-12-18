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
  orderBy
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
  async getFirestoreRecipe(id) {
    try {
      const q = doc(firebase.db, "recipes", id);
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
      const q = query(collection(firebase.db, "recipes"), where("currentUserEmail", "==", currentUserEmail));
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


};