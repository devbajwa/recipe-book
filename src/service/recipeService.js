/**
    File:  recipeService.js
    Author: Waqas Naeem Bajwa
*/
import axios from 'axios';

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
  deleteDoc
} from "firebase/firestore";
const { firebase } = useFirebase();

export const recipeService = {
  async getRecipes() {
    try {
      const response = await axios.get('https://devbajwa-server.onrender.com/api/getRecipes');
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },

  async getRecipe(id) {
    try {
      const response = await axios.get(`https://devbajwa-server.onrender.com/api/getRecipe/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },

  async saveRecipe(data) {
    try {
      const response = await axios.post('https://devbajwa-server.onrender.com/api/saveRecipe', data);
      console.log('Server Response:', response.data.message);
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  },


  /* Firestore Cloud */

  // Get all the recipes
  async getFirestoreRecipes() {
    try {
      const querySnapshot = await getDocs(collection(firebase.db, "recipes"));
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


};