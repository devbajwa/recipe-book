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
    increment,
    arrayRemove,
    arrayUnion
} from "firebase/firestore";
const { firebase } = useFirebase();

export const userInteractionService = {
    /* Firestore Cloud */

    // Add user interaction with the collection data for recipe - Bookmark
    async addUserInteractionCollection(currentUserEmail, recipeID) {
        try {
            const recipeRef = doc(firebase.db, "userInteractions", currentUserEmail);
            // Push the recipeID to user interaction collection collection field
            await updateDoc(recipeRef, {
                collection: arrayUnion(recipeID)
            });
        } catch (error) {
            console.error('Error saving data:', error);
            throw error;
        }
    },

    // Remove user interaction with the collection data for recipe - Bookmark
    async removeUserInteractionCollection(currentUserEmail, recipeID) {
        try {
            const recipeRef = doc(firebase.db, "userInteractions", currentUserEmail);
            // Remove the recipeID to user interaction collection collection field
            await updateDoc(recipeRef, {
                collection: arrayRemove(recipeID)
            });
        } catch (error) {
            console.error('Error saving data:', error);
            throw error;
        }
    },

    // Update user interaction with the like data for recipe - Likes
    async updateUserInteractionLikes(currentUserEmail, recipeID) {
        try {
            const recipeRef = doc(firebase.db, "userInteractions", currentUserEmail);
            // Push the recipeID to user interaction collection likes field
            await updateDoc(recipeRef, {
                likes: arrayUnion(recipeID)
            });
        } catch (error) {
            console.error('Error saving data:', error);
            throw error;
        }
    },

    // Get user interaction with the like and collection data for recipe - Likes & Collection
    async getUserInteractionData(currentUserEmail) {
        try {
            const q = doc(firebase.db, "userInteractions", currentUserEmail);
            const querySnapshot = await getDoc(q);
            return querySnapshot;
        } catch (error) {
            console.error('Error saving data:', error);
            throw error;
        }
    },

    // Check user interaction with the like data for recipe, is current user already liked the recipe - Likes
    async getUserInteractionLikeForRecipe(currentUserEmail, recipeID) {
        try {
            const q = doc(firebase.db, "userInteractions", currentUserEmail);
            const querySnapshot = await getDoc(q);
            const likesData = { id: querySnapshot.id, likes: querySnapshot.data().likes }
            const userLikedRecipe = likesData.likes.find(id => id === recipeID);
            if (userLikedRecipe) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.error('Error saving data:', error);
            throw error;
        }
    }


};