import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import useFirebase from '../firebase/useFirebase'
import { useToast } from "vue-toastification"
import { userInteractionService } from "../service/userInteractionService"

/* Toastification messages */
const toast = useToast();

export const useUserStore = defineStore('UserStore', () => {
    const getCurrentUser = () => {
        return new Promise((resolve, reject) => {
            const removeListener = firebase.onAuthStateChanged(
                firebase.auth,
                (user) => {
                    removeListener();
                    resolve(user);
                    if (user) {
                        currentUser.value = user.displayName;
                        currentUserEmail.value = user.email;
                        isSignedIn.value = true;
                    }
                },
                reject
            )
        })
    }
    /* Auth */
    const currentUser = ref("");
    const currentUserEmail = ref("");
    const isSignedIn = ref(false);
    const { firebase } = useFirebase();

    // Sing in with Google
    const handleSignInGoogle = () => {
        firebase.signInWithPopup(firebase.auth, firebase.provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                currentUser.value = user.displayName;
                currentUserEmail.value = user.email;
                isSignedIn.value = true;
                toast.success("You are logged in Successfully");
                addUserInteractionNewUser(currentUserEmail.value);
            }).catch((error) => {
                console.error(error);
            })
    }

    // Sing out from Google
    const handleSignOutGoogle = () => {
        firebase.signOut(firebase.auth).then(() => {
            // Clear values to default
            currentUser.value = "";
            currentUserEmail.value = "";
            isSignedIn.value = false;
            toast.success("You are logged out Successfully");
        })
    }

    // Add new signed in to firestore userInteraction
    const addUserInteractionNewUser = async (currentUserEmail) => {
        try {
            await userInteractionService.addUserInteractionNewSignedInUser(currentUserEmail);
        } catch (error) {
            console.error('Error saving user', error)
        }

    }

    return { getCurrentUser, currentUser, currentUserEmail, isSignedIn, handleSignInGoogle, handleSignOutGoogle }
})