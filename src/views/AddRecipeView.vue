<script setup>
import { ref, onMounted } from "vue";
import RecipeForm from "../components/RecipeForm.vue";
import { recipeService } from "../service/recipeService";
import { useRouter } from "vue-router";
import useFirebase from '../firebase/useFirebase';
import { useUserStore } from "../stores/UserStore";
import { storeToRefs } from 'pinia'

/* Store */
const store = useUserStore()
const { currentUser, currentUserEmail, isSignedIn } = storeToRefs(store)
const { getCurrentUser, handleSignInGoogle, handleSignOutGoogle } = store

/* Router */
const router = useRouter();

const handleSubmitRecipe = async (recipeToSubmit) => {
  try {
    await recipeService.addFirestoreRecipe(recipeToSubmit);
    router.push(`/`); // Back to recipes
  } catch (error) {
    console.error("Error saving data:", error);
  }
};
</script>

<template>
  <section class="subhero">
    <h1 class="title">Add Recipe</h1>
  </section>
  <!-- If the user is NOT Logged In -->
  <section v-if="!isSignedIn" class="container login-user">
    <h2 class="sub-heading">Welcome to ReciPen</h2>
    <p>
      For recipe sharing and additional features, simply log in with Google.
      Explore the full potential of our platform and enhance your culinary
      experience.
    </p>
    <p>Log in and let the cooking journey commence!</p>
    <button @click="handleSignInGoogle">
      <span class="add-button"><font-awesome-icon icon="fa-brands fa-google" /><span>Sign in with Google</span></span>
    </button>
  </section>
  <!-- If the user IS Logged In -->
  <section v-if="isSignedIn" class="render-form container">
    <div class="profile d-none-mobile">
      <h2>Welcome<br /><span class="username">{{ currentUser }}</span></h2>
      <button @click="handleSignOutGoogle">
        <span class="add-button"><font-awesome-icon icon="fa-brands fa-google" /><span>Sign out</span></span>
      </button>
    </div>

    <RecipeForm :isEditModeOn="false" @recipeSubmitted="handleSubmitRecipe" :currentUserEmail="currentUserEmail" />
  </section>
</template>

<style scoped></style>
