<!--
  Author: Waqas,
  File: RecipesView.vue,
  Desc: This component fetch all recipes from firestore.
        Then pass the recipes in a for loop as a prop to Recipe Card component which render the recipe key details.
-->
<script setup>
import { ref, onBeforeMount, computed, onMounted, watch } from "vue";
import HeroSection from "../components/HeroSection.vue";
import RecipeCard from "../components/RecipeCard.vue";
import Loader from "../components/Loader.vue";
import { recipeService } from "../service/recipeService"
import { userInteractionService } from "../service/userInteractionService";
import { useUserStore } from "../stores/UserStore";
import { storeToRefs } from "pinia";

/* Store */
const store = useUserStore();
const { currentUser, currentUserEmail, isSignedIn } = storeToRefs(store);
const { getCurrentUser, handleSignInGoogle, handleSignOutGoogle } = store;


onBeforeMount(async () => {
  // Fetch all the recipes from firestore via service api
  const fetchedRecipesFromAPI = await recipeService.getFirestoreRecipes();
  recipes.value = fetchedRecipesFromAPI;
});

const recipes = ref();
const search = ref("");

const filteredRecipes = computed(() => {
  const query = search.value.toLowerCase()
  return recipes.value.filter(recipe => recipe.name.toLowerCase().includes(query))
})

const fetchAllRecipes = async () => {
  // Fetch again the recipes as they are updated - this will trigger filteredRecipe computed as well hence re render the component
  const fetchedRecipesFromAPI = await recipeService.getFirestoreRecipes();
  recipes.value = fetchedRecipesFromAPI;
}


/* Update the recipe likes based on id */
const updateRecipeLikes = async (recipeID) => {
  try {
    const userLiked = await userInteractionService.getUserInteractionLikeForRecipe(currentUserEmail.value, recipeID)
    if (!userLiked) {
      await recipeService.updateFirestoreRecipeLikes(recipeID);
      await userInteractionService.updateUserInteractionLikes(currentUserEmail.value, recipeID);
    }
  } catch (error) {
    console.error('Error saving likes data', error)
  }
  fetchAllRecipes()
}

/* Update the recipe collection based on id */
const updateRecipeCollection = async (recipeID, action) => {
  if (action === "ADD") {
    try {
      await userInteractionService.addUserInteractionCollection(currentUserEmail.value, recipeID);
    } catch (error) {
      console.error('Error saving likes data', error)
    }
  } else {
    try {
      await userInteractionService.removeUserInteractionCollection(currentUserEmail.value, recipeID);
    } catch (error) {
      console.error('Error saving likes data', error)
    }
  }
  fetchAllRecipes()
}

</script>
<template>
  <HeroSection />
  <section class="container">
    <input type="text" v-model.trim="search" placeholder="Search recipe..." class="search-input">
    <div v-if="recipes" class="card-container">
      <RecipeCard :recipe="recipe" v-for="recipe in filteredRecipes" :key="recipe.id" :currentUserEmail="currentUserEmail"
        @likeRecipe="updateRecipeLikes" @collectRecipe="updateRecipeCollection" />
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
