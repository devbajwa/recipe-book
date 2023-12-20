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
    }


};