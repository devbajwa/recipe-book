<script setup>
import { ref, onBeforeMount, onMounted, watch } from "vue";
import RecipeForm from "../components/RecipeForm.vue";
import { recipeService } from "../service/recipeService";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../stores/UserStore";
import { storeToRefs } from "pinia";

/* Router */
const router = useRouter();
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

/* Store */
const store = useUserStore();
const { currentUser, currentUserEmail, isSignedIn } = storeToRefs(store);
const { getCurrentUser, handleSignInGoogle, handleSignOutGoogle } = store;

const handleSubmitRecipe = async (recipeToSubmit) => {
    try {
        await recipeService.updateFirestoreRecipe(recipeId, recipeToSubmit);
        router.push(`/`); // Back to recipes
    } catch (error) {
        console.error("Error updating data:", error);
    }
};

onMounted(async () => {
    await getCurrentUser(); // Check if the user is already logged in on the page loading
});
</script>

<template>
    <section class="subhero">
        <h1 class="title">Update Recipe</h1>
    </section>
    <!-- If the user is NOT Logged In -->
    <section v-if="!isSignedIn" class="container login-user">
        <h2 class="sub-heading">Welcome to ReciPen</h2>
        <p>
            For recipe sharing and additional features, simply log in with Google.
            Explore the full potential of our platform and enhance your culinary
            experience.
        </p>
        <p>Log in and let the cooking journey commence!</p>
        <button @click="handleSignInGoogle">
            <span class="add-button"><font-awesome-icon icon="fa-brands fa-google" /><span>Sign in with Google</span></span>
        </button>
    </section>
    <!-- If the user IS Logged In -->
    <section v-if="isSignedIn" class="render-form">
        <div class="profile container">
            <h2>
                Welcome <span class="username">{{ currentUser }}</span>
            </h2>
            <button @click="handleSignOutGoogle">
                <span class="add-button"><font-awesome-icon icon="fa-brands fa-google" /><span>Sign out</span></span>
            </button>
        </div>

        <RecipeForm :isEditModeOn="true" @recipeSubmitted="handleSubmitRecipe" :currentUserEmail="currentUserEmail"
            :editData="recipe" />
    </section>
</template>

<style scoped>
.username {
    text-transform: capitalize;
    color: var(--primary);
}
</style>
