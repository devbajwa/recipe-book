<!--
  Author: Waqas,
  File: RecipesView.vue,
  Desc: This component fetch all recipes from firestore.
        Then pass the recipes in a for loop as a prop to Recipe Card component which render the recipe key details.
-->
<script setup>
import { ref, onBeforeMount, onMounted } from "vue";
import HeroSection from "../components/HeroSection.vue";
import RecipeCard from "../components/RecipeCard.vue";
import Loader from "../components/Loader.vue";
import { recipeService } from "../service/recipeService";
import { useUserStore } from "../stores/UserStore";
import { storeToRefs } from 'pinia'

/* Store */
const store = useUserStore()
const { currentUser, currentUserEmail, isSignedIn } = storeToRefs(store)
const { getCurrentUser, handleSignInGoogle, handleSignOutGoogle } = store

onMounted(async () => {
    await getCurrentUser(); // Check if the user is already logged in on the page loading
    // Fetch all the recipes from firestore via service api
    const fetchedRecipesFromAPI = await recipeService.getFirestoreCurrentUserRecipes(currentUserEmail.value);
    recipes.value = fetchedRecipesFromAPI;
});

const recipes = ref();
</script>
<template>
    <section class="subhero">
        <h1 class="title">Recipes</h1>
        <h4>{{ currentUser }}</h4>
    </section>
    <section class="container">
        <div v-if="recipes" class="card-container">
            <RecipeCard :recipe="recipe" v-for="recipe in recipes" :key="recipe.id" />
        </div>
        <div v-else>
            <Loader :text="'Fetching recipes...'" />
        </div>
    </section>
</template>

<style scoped>
.card-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.125rem;
    margin-block-end: 3rem;
}

/* Media query for smaller screens */
@media screen and (max-width: 768px) {
    .card-container {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Media query for smaller screens */
@media screen and (max-width: 580px) {
    .card-container {
        grid-template-columns: repeat(1, 1fr);
    }
}
</style>
