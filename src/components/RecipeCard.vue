<script setup>
import { ref, defineProps, onMounted, defineEmits, watchEffect } from "vue"
import { useRouter } from "vue-router"
import { userInteractionService } from "../service/userInteractionService"
import { useUserStore } from "../stores/UserStore"
import { storeToRefs } from "pinia"
import { useToast } from "vue-toastification";

/* toastification messages */
const toast = useToast();

/* Store */
const store = useUserStore();
const { currentUser, currentUserEmail, isSignedIn } = storeToRefs(store);
const { getCurrentUser, handleSignInGoogle, handleSignOutGoogle } = store;

const router = useRouter();

const props = defineProps(["recipe", "currentUserEmail"]);

const emit = defineEmits(["likeRecipe", "collectRecipe"])

const spiceLevelClass = ref();
const userLikedRecipe = ref();
const userCollectedRecipe = ref();

onMounted(async () => {
  if (props.recipe.spiceLevel === "Low") {
    spiceLevelClass.value = "low";
  }
  if (props.recipe.spiceLevel === "Medium") {
    spiceLevelClass.value = "medium";
  }
  if (props.recipe.spiceLevel === "High") {
    spiceLevelClass.value = "high";
  }
  if (props.recipe.spiceLevel === "Extreme") {
    spiceLevelClass.value = "extreme";
  }
});

/* Function to emit the id of recipe to increment the like of recipe */
const handleLikes = async (recipeID) => {
  if (isSignedIn.value) {
    emit("likeRecipe", recipeID);
  } else {
    toast.warning("Sorry you need to login with Google account")
    handleSignInGoogle();
  }
}

/* Function to emit the id of recipe to increment the like of recipe */
const handleCollection = async (recipeID, action) => {
  if (isSignedIn.value) {
    emit("collectRecipe", recipeID, action);
  } else {
    toast.warning("Sorry you need to login with Google account")
    handleSignInGoogle();
  }
}

watchEffect(async () => {
  try {
    userLikedRecipe.value = await userInteractionService.getUserInteractionLikeForRecipe(props.currentUserEmail, props.recipe.id)
    userCollectedRecipe.value = await userInteractionService.getUserInteractionCollectionForRecipe(props.currentUserEmail, props.recipe.id)
  } catch (error) {
    console.error("Error", error)
  }
})

</script>

<template>
  <div class="card">
    <div class="card__header">
      <div class="card__header-details">
        <div class="name">{{ recipe.chef }}</div>
        <div class="category">{{ recipe.category }}</div>
      </div>

      <!-- <div>
        <font-awesome-icon
          icon="fa-solid fa-fire-flame-curved"
          :class="spiceLevelClass"
        /><span>Spice level: {{ recipe.spiceLevel }}</span>
      </div>
      <div>
        <font-awesome-icon icon="fa-solid fa-pepper-hot" /><span
          >Spice level: {{ recipe.spiceLevel }}</span
        >
      </div>
      <div>
        <font-awesome-icon icon="fa-solid fa-mortar-pestle" /><span
          >Ingredients: {{ recipe.ingredients.length }}</span
        >
      </div>
      <div>
        <font-awesome-icon icon="fa-solid fa-utensils" /><span
          >Chef: {{ recipe.chef }}</span
        >
      </div>
      <div>
        <font-awesome-icon icon="fa-solid fa-bowl-food" /><span
          >Category: {{ recipe.category }}</span
        >
      </div>
      <div>
        <font-awesome-icon icon="fa-regular fa-calendar" /><span
          >Date added: {{ recipe.date }}</span
        >
      </div>
      <div>
        <font-awesome-icon icon="fa-regular fa-clock" /><span
          >Time to cook: {{ recipe.cookTime }}</span
        >
      </div> -->
    </div>
    <div class="card__title" @click="router.push(`/recipe/${recipe.id}`)">
      <h2>{{ recipe.name }}</h2>
    </div>
    <div class="card__desc">
      <!-- <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil ut, explicabo nemo dolores quam magnam?</p> -->
      <p>{{ recipe.desc }}</p>
    </div>
    <div class="card__footer">
      <span class="icon">
        <div v-if="userCollectedRecipe">
          <font-awesome-icon icon="fa-solid fa-bookmark" class="fav-btn" title="Remove from collection"
            @click="handleCollection(recipe.id, 'REMOVE')" />
        </div>
        <div v-else>
          <font-awesome-icon icon="fa-regular fa-bookmark" class="fav-btn" title="Add to collection"
            @click="handleCollection(recipe.id, 'ADD')" />
        </div>
        <div class="flex" v-if="userLikedRecipe">
          <span class="number">{{ recipe.likes }} people liked</span><font-awesome-icon icon="fa-solid fa-heart"
            class="fav-btn" title="Like recipe" @click="handleLikes(recipe.id)" />
        </div>
        <div class="flex" v-else>
          <span class="number">{{ recipe.likes }} people liked</span><font-awesome-icon icon="fa-regular fa-heart"
            class="fav-btn" title="Like recipe" @click="handleLikes(recipe.id)" />
        </div>
      </span>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: grid;
  flex-direction: column;
  padding: 1.25rem;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  box-shadow: inset 0 0 0 2px var(--border-color);
  /* border: 1px dashed var(--light-grey); */
  border-radius: 5px;
  flex: 1;
  /* Cards will take equal width within the flex container */
}

.card .card__header .name {
  font-size: 0.75rem;
  letter-spacing: 0.15ch;
  text-transform: uppercase;
  padding: 0.15rem 0.25rem;
  border-radius: 5px;
  color: var(--dark-grey);
  color: var(--primary);
  display: flex;
  align-self: flex-end;

}

.card .card__header .category {
  font-size: 0.65rem;
  text-transform: uppercase;
  background-color: var(--border-color);
  padding: 0.15rem 0.25rem;
  border-radius: 5px;
  color: var(--dark-grey);
  display: flex;
  align-self: flex-end;

}



.card .card__header-details {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.card .card__title {
  font-family: var(--heading-font);
  color: var(--primary);
  text-transform: capitalize;
  cursor: pointer;
  display: inline;
}

.card .card__title:hover h2 {
  color: var(--accent);
}

/* .card .card__header {
  display: flex;
  flex-direction: column;
  align-items: start;
  flex-wrap: wrap;
} */

/* .card .card__header div {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
}

.card .card__header div span {
  flex: 1;
} */

.card .card__footer span.icon {
  display: flex;
  gap: 0.65rem;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.125rem;
}


/* Helper classes */
.flex {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.flex .number {
  font-size: 0.75rem;
}

/* Media query for smaller screens */
@media (max-width: 768px) {
  .card {
    max-width: calc(100% - 16px);
  }
}
</style>
