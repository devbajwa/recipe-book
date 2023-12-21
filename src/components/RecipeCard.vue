<script setup>
import { ref, defineProps, onMounted, defineEmits, watchEffect } from "vue"
import { useRouter } from "vue-router"
import { userInteractionService } from "../service/userInteractionService"

const router = useRouter();

const props = defineProps(["recipe", "currentUserEmail"]);

const emit = defineEmits(["likeRecipe", "collectRecipe"])

const spiceLevelClass = ref();
const userLikedRecipe = ref();

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
  emit("likeRecipe", recipeID);
}

/* Function to emit the id of recipe to increment the like of recipe */
const handleCollection = async (recipeID, action) => {
  emit("collectRecipe", recipeID, action);
}

watchEffect(async () => {
  userLikedRecipe.value = await userInteractionService.getUserInteractionLikeForRecipe(props.currentUserEmail, props.recipe.id)
})

</script>

<template>
  <div class="card">
    <div class="card__header">
      <span class="category">{{ recipe.category }}</span>

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
      <span v-if="userLikedRecipe" class="icon">
        <div class="flex">
          <span class="number">{{ recipe.likes }}</span><font-awesome-icon icon="fa-solid fa-heart" class="fav-btn"
            title="Like recipe" @click="handleLikes(recipe.id)" />
        </div>

        <font-awesome-icon icon="fa-solid fa-bookmark" class="fav-btn" title="Remove from collection"
          @click="handleCollection(recipe.id, 'ADD')" />
      </span>
      <span v-else class="icon">
        <div class="flex">
          <span class="number">{{ recipe.likes }}</span><font-awesome-icon icon="fa-regular fa-heart" class="fav-btn"
            title="Like recipe" @click="handleLikes(recipe.id)" />
        </div>
        <font-awesome-icon icon="fa-regular fa-bookmark" class="fav-btn" title="Add to collection"
          @click="handleCollection(recipe.id, 'ADD')" />
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

.card .card__header {
  display: flex;
  flex-direction: column;
  align-items: start;
  flex-wrap: wrap;
}

.card .card__header div {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
}

.card .card__header div span {
  flex: 1;
}

.card .card__footer span {
  display: flex;
  gap: 0.65rem;
  align-items: center;
  justify-content: end;
}


/* Helper classes */
.flex {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.flex .number {
  font-size: 0.85rem;
}

/* Media query for smaller screens */
@media (max-width: 768px) {
  .card {
    max-width: calc(100% - 16px);
  }
}
</style>
