<script setup>
import {useRoute} from 'vue-router';
import {ref, onBeforeMount, onMounted} from 'vue';
import { recipeService } from "../service/recipeService";

const route = useRoute()
const recipeId = route.params.id;
const recipeData = ref();
const fetchedRecipesFromAPI = ref();

onBeforeMount(async () => {
  try {
    fetchedRecipesFromAPI.value = await recipeService.getRecipe(parseInt(recipeId));
    const fetchedRecipes = JSON.parse(JSON.stringify(fetchedRecipesFromAPI.value));
    recipeData.value = fetchedRecipes;
  } catch (error) {
    console.error('Error loading data:', error);
  }
});
</script>

<template>
    <h1 class="title">Recipe Detail</h1>
    {{recipeData  }}
</template>