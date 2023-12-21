<script setup>
import { RouterLink, useRouter } from "vue-router";
import { useUserStore } from "../stores/UserStore";
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'

onMounted(async () => {
    await getCurrentUser(); // Check if the user is already logged in on the page loading
})

/* Store */
const store = useUserStore()
const { currentUser, currentUserEmail, isSignedIn } = storeToRefs(store)
const { getCurrentUser, handleSignInGoogle, handleSignOutGoogle } = store

/* Popup */
const handlePopup = () => {
    const popup = document.getElementById('popup');
    popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'grid' : 'none';
}
// Listen to the click event for the document to close the popup
document.addEventListener('click', function (event) {
    const popup = document.getElementById('popup');
    const userProfile = document.querySelector('.user-profile');
    // Check if the click is outside the popup and the button
    if (popup) {
        if (!popup.contains(event.target) && event.target !== userProfile) {
            popup.style.display = 'none';
        }
    }
});
</script>

<template>
    <div class="wrapper">
        <div class="popup" id="popup">
            <h4>Sorry you need to be logged in with Google</h4>
            <button v-if="!isSignedIn" @click="handleSignInGoogle" class="user-profile">
                <span class="add-button"><font-awesome-icon icon="fa-brands fa-google" /><span>Sign in</span></span>
            </button>
        </div>
    </div>
</template>



<style scoped>
/* POPUP */

.wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.75);
}

.popup {
    display: block;
    grid-template-columns: 1fr;
    flex-direction: column;
    padding: 1.25rem;
    box-shadow: inset 0 0 0 2px var(--border-color);
    border-radius: 5px;
    background-color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 150px;
}

.popup h4 {
    margin-top: 0;
    color: var(--primary);
    text-transform: uppercase;
    font-weight: 400;
    letter-spacing: 0.2ch;
}

.popup .nav-links {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.125rem;
    margin-top: 0.75rem;
}

.popup .nav-links a {
    font-size: 1rem;
}
</style>