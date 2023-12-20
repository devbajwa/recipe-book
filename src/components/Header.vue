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

/* Route */
const router = useRouter();

/* Popup */
const handlePopup = () => {
  const popup = document.getElementById('popup');
  const userIcon = document.querySelector('.user-icon');
  const buttonRect = userIcon.getBoundingClientRect();
  const deviceWidth = window.innerWidth;

  // Set the popup position relative to the button
  if (deviceWidth > 545) {
    popup.style.left = (buttonRect.left - 100) + 'px';
  } else {
    popup.style.left = (buttonRect.left) + 'px';
  }
  popup.style.top = (buttonRect.bottom + 10) + 'px';
  popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'grid' : 'none';
}

// Listen to the click event for the document to close the popup
document.addEventListener('click', function (event) {
  const popup = document.getElementById('popup');
  const userIcon = document.querySelector('.user-icon');
  // Check if the click is outside the popup and the button
  if (popup) {
    if (!popup.contains(event.target) && event.target !== userIcon) {
      popup.style.display = 'none';
    }
  }
});
</script>

<template>
  <div class="nav container">
    <div class="nav-logo">
      <h1 @click="router.push('/')">ReciPen</h1>
    </div>
    <div class="nav-wrapper">
      <div class="nav-links">
        <RouterLink active-class="active" to="/">Recipes</RouterLink>
        <RouterLink active-class="active" to="/add-recipe">Add Recipe</RouterLink>
        <RouterLink active-class="active" to="/about">About</RouterLink>

      </div>
      <button v-if="!isSignedIn" @click="handleSignInGoogle" class="user-profile">
        <span class="add-button"><font-awesome-icon icon="fa-brands fa-google" /><span>Sign in</span></span>
      </button>
      <div class="user-profile" v-else>
        <div @click.stop="handlePopup" class="user-icon">
          <font-awesome-icon icon="fa-regular fa-circle-user" />
          <h4 class="username">{{ currentUser }}</h4>
        </div>

        <!--POPUP -->
        <div class="popup" id="popup">
          <h4>Dashboard</h4>
          <div class="nav-links">
            <a href="#" @click="router.push('/my-recipes')">My Recipes</a>
            <a href="#" @click="handleSignOutGoogle">Log out</a>
          </div>
        </div>
        <!-- <button @click="handleSignOutGoogle">
          <span class="add-button"><font-awesome-icon icon="fa-brands fa-google" /><span>Sign out</span></span>
        </button> -->
      </div>

    </div>

  </div>
  <!-- <HeroSection /> -->
</template>
<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav .nav-logo h1 {
  font-family: var(--signature-font);
  cursor: pointer;
  text-shadow: 0 0px 30px #42b883;
}

.nav .nav-logo h1:hover {
  color: var(--accent);
}

.nav .nav-wrapper {
  display: flex;
  gap: 1.5rem;
}

.nav .nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav .nav-links a {
  text-decoration: none;
  color: var(--dark-grey);
  font-weight: none;
  font-size: 1.125rem;
}

.nav .nav-links a:hover {
  color: var(--accent);
}

.nav .nav-links a.active {
  color: var(--accent);
}

.nav .user-profile {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.nav .user-profile .username {
  color: var(--primary);
  margin-block: 0rem;
  cursor: pointer;
}

.nav .user-profile .username:hover {
  color: var(--accent);
}

.nav .user-icon {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

/* POPUP */
.popup {
  display: none;
  grid-template-columns: 1fr;
  flex-direction: column;
  padding: 1.25rem;
  box-shadow: inset 0 0 0 2px var(--border-color);
  border-radius: 5px;
  background-color: white;
  position: absolute;
  top: 10vh;
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

@media (max-width: 545px) {
  .nav {
    flex-direction: column;
    padding-bottom: 1.5rem;
  }

  .nav .nav-wrapper {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0rem;
  }

  .nav .user-profile {
    margin-top: 1.5rem;
  }
}
</style>
