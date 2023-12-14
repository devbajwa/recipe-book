<script setup>
import { ref, onBeforeMount } from "vue";
import RecipeForm from "../components/RecipeForm.vue";
import { recipeService } from "../service/recipeService";
import { useRouter } from "vue-router";

const router = useRouter();
const recipes = ref([]);

onBeforeMount(async () => {
  const fetchedRecipesFromAPI = await recipeService.getRecipes();
  recipes.value = fetchedRecipesFromAPI;
});

const handleSubmitRecipe = async (recipeToSubmit) => {
  try {
    recipes.value.push(recipeToSubmit);
    await recipeService.saveRecipe(recipes.value); // Saving data into file via API
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
  <RecipeForm :isEditModeOn="false" @recipeSubmitted="handleSubmitRecipe" />
</template>
