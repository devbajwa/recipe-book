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
    fetchedRecipeFromAPI.value = await recipeService.getFirestoreRecipe(
      recipeId
    );
    recipeData.value = {
      id: fetchedRecipeFromAPI.value.id,
      data: fetchedRecipeFromAPI.value.data(),
    };
  } catch (error) {
    console.error("Error loading data:", error);
  }
});
</script>

<template>
  <section class="subhero">
    <h1>{{ recipeData.id }}</h1>
    <h1>{{ recipeData.data.name }}</h1>
  </section>
  <section class="container">
    {{ recipeData }}
  </section>
</template>
