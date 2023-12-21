<!--
  Author: Waqas,
  File: RecipesView.vue,
  Desc: This component fetch all recipes from firestore.
        Then pass the recipes in a for loop as a prop to Recipe Card component which render the recipe key details.
-->
<script setup>
import { ref, onBeforeMount, onMounted, computed, watchEffect, isProxy, toRaw } from "vue";
import RecipeCard from "../components/RecipeCard.vue";
import Loader from "../components/Loader.vue";
import { recipeService } from "../service/recipeService";
import { useUserStore } from "../stores/UserStore";
import { storeToRefs } from "pinia";
import { userInteractionService } from "../service/userInteractionService";
import { useToast } from "vue-toastification";

/* toastification messages */
const toast = useToast();

/* Store */
const store = useUserStore();
const { currentUser, currentUserEmail, isSignedIn } = storeToRefs(store);
const { getCurrentUser, handleSignInGoogle, handleSignOutGoogle } = store;

onMounted(() => {
    fetchUserCollectedRecipes()
});

const favouriteRecipes = ref([]);
const search = ref("");
const loading = ref(true);

const filteredRecipes = computed(() => {
    const query = search.value.toLowerCase()
    return favouriteRecipes.value.filter(recipe => recipe.name.toLowerCase().includes(query))
})

const fetchUserCollectedRecipes = async () => {
    const userInteractionData = await userInteractionService.getUserInteractionData(currentUserEmail.value)
    const userCollection = { id: userInteractionData.id, collection: userInteractionData.data().collection };
    const data = [];
    // Assuming userCollection.collection is an array of ids
    await Promise.all(userCollection.collection.map(async (id) => {
        const fetchedRecipeFromAPI = await recipeService.getFirestoreRecipe(id);
        const recipe = {
            id: fetchedRecipeFromAPI.id,
            ...fetchedRecipeFromAPI.data(),
        };
        data.push(recipe);
    }));

    favouriteRecipes.value = data;
    loading.value = false;
}

/* Update the recipe likes based on id */
const updateRecipeLikes = async (recipeID) => {
    try {
        const userLiked = await userInteractionService.getUserInteractionLikeForRecipe(currentUserEmail.value, recipeID)
        if (!userLiked) {
            await recipeService.updateFirestoreRecipeLikes(recipeID);
            await userInteractionService.updateUserInteractionLikes(currentUserEmail.value, recipeID);
            toast.success('Hurray, your liked this recipe ')
        }
        else {
            toast.success('Thanks, your already liked this recipe ')
        }
    } catch (error) {
        console.error('Error saving likes data', error)
    }
    fetchUserCollectedRecipes()
}

/* Update the recipe collection based on id */
const updateRecipeCollection = async (recipeID, action) => {
    if (action === "ADD") {
        try {
            await userInteractionService.addUserInteractionCollection(currentUserEmail.value, recipeID);
            toast.success('Hurray, reciped added to your favourites')
        } catch (error) {
            console.error('Error saving likes data', error)
        }
    } else {
        try {
            await userInteractionService.removeUserInteractionCollection(currentUserEmail.value, recipeID);
            toast.success('Thank you, reciped removed from your favourites')
        } catch (error) {
            console.error('Error saving likes data', error)
        }
    }
    fetchUserCollectedRecipes()
}
</script>
<template>
    <section class="subhero">
        <h1 class="title">Favourite Recipes</h1>
        <h4>{{ currentUser }}</h4>
    </section>
    <section class="container">
        <div v-if="loading">
            <Loader :text="'Fetching recipes...'" />
        </div>
        <div v-else-if="!loading && favouriteRecipes.length > 0">
            <input type="text" v-model.trim="search" placeholder="Search recipe..." class="search-input">
            <div v-if="favouriteRecipes" class="card-container">
                <RecipeCard :recipe="recipe" v-for="recipe in filteredRecipes" :key="recipe.id"
                    :currentUserEmail="currentUserEmail" @likeRecipe="updateRecipeLikes"
                    @collectRecipe="updateRecipeCollection" />
            </div>
        </div>
        <div v-else>
            <h3>Sorry you dont have any favourite recipes added. Please add favourite recipes to your collection.</h3>
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
