<script setup>
import { ref, onBeforeMount } from "vue";
import RecipeForm from "../components/RecipeForm.vue";
import { recipeService } from "../service/recipeService";

const recipes = ref([]);

onBeforeMount(async ()=>{
  const fetchedRecipesFromAPI = await recipeService.getRecipes();
  recipes.value = fetchedRecipesFromAPI;
  console.log(recipes.value)
  console.log(fetchedRecipesFromAPI)
})

const handleSubmitRecipe = async (recipeToSubmit) => {
  try {
    console.log(recipeToSubmit)
    recipes.value.push(recipeToSubmit);
    await recipeService.saveRecipe(recipes.value); // Saving data into file via API
  } catch (error) {
    console.error("Error saving data:", error);
  }
};
</script>

<template>
  <h1 class="title">Add Recipe</h1>

  <RecipeForm :isEditModeOn="false" @recipeSubmitted="handleSubmitRecipe" />
</template>
