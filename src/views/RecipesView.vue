<script setup>
import { ref, onBeforeMount } from "vue";
import HeroSection from "../components/HeroSection.vue";
import RecipeCard from "../components/RecipeCard.vue";
import { recipeService } from "../service/recipeService";

onBeforeMount(async () => {
  const fetchedRecipesFromAPI = await recipeService.getRecipes();
  console.log(fetchedRecipesFromAPI);

  recipes.value = fetchedRecipesFromAPI;
});

const recipes = ref();
</script>
<template>
  <HeroSection />
  <section class="container">
    <div class="card-container">
      <RecipeCard :recipe="recipe" v-for="recipe in recipes" />
    </div>
  </section>
</template>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
