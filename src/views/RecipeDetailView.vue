<!--
  Author: Waqas,
  File: RecipeDetail.vue,
  Desc: This component fetch a single recipe from firestore based on id passed to the URL params.
        Then pass the recipe as a prop to SingleRecipe component which render the recipe details.
-->
<script setup>
import { useRoute } from "vue-router";
import { ref, onBeforeMount, onMounted, watch } from "vue";
import { recipeService } from "../service/recipeService";
import Loader from "../components/Loader.vue";
import SingleRecipe from "../components/SingleRecipe.vue";

const route = useRoute();
const recipeId = route.params.id;
const recipe = ref();
const fetchedRecipeFromAPI = ref();

onBeforeMount(async () => {
  try {
    fetchedRecipeFromAPI.value = await recipeService.getFirestoreRecipe(
      recipeId
    );
    recipe.value = {
      id: fetchedRecipeFromAPI.value.id,
      data: fetchedRecipeFromAPI.value.data(),
    };
  } catch (error) {
    console.error("Error loading data:", error);
  }
});
</script>

<template>
  <main v-if="recipe">
    <SingleRecipe :recipe="recipe" />
  </main>
  <div class="container" v-else>
    <Loader :text="'Fetching recipe..'" />
  </div>
</template>
