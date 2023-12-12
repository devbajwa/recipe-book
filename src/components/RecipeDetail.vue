<script setup>
import { useRoute } from "vue-router";
import { ref, onBeforeMount, onMounted } from "vue";
import { recipeService } from "../service/recipeService";

const route = useRoute();
const recipeId = route.params.id;
const recipeData = ref();
const fetchedRecipeFromAPI = ref();

onBeforeMount(async () => {
  try {
    fetchedRecipeFromAPI.value = await recipeService.getRecipe(recipeId);
    const fetchedRecipe = JSON.parse(
      JSON.stringify(fetchedRecipeFromAPI.value)
    );
    recipeData.value = fetchedRecipe;
  } catch (error) {
    console.error("Error loading data:", error);
  }
});
</script>

<template>
    <section class="subhero">
        <h1>{{ recipeData.name }}</h1>
    </section>
    <section class="container">
        {{ recipeData }}
    </section>
</template>
