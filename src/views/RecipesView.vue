<script setup>
import { ref, onBeforeMount } from "vue";
import HeroSection from "../components/HeroSection.vue";
import RecipeCard from "../components/RecipeCard.vue";
import Loader from "../components/Loader.vue";
import { recipeService } from "../service/recipeService";

onBeforeMount(async () => {
  //const fetchedRecipesFromAPI = await recipeService.getRecipes();
  const fetchedRecipesFromAPI = await recipeService.getFirestoreRecipes();
  console.log(fetchedRecipesFromAPI);

  recipes.value = fetchedRecipesFromAPI;
});

const recipes = ref();
</script>
<template>
  <HeroSection />
  <section class="container">
    <div v-if="recipes" class="card-container">
      <RecipeCard :recipe="recipe" v-for="recipe in recipes" />
    </div>
    <div v-else>
      <Loader />
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
