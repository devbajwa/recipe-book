<!--
  Author: Waqas,
  File: SingleRecipe.vue,
  Desc: This component takes recipe as prop.
        Then render the recipe details.
-->
<script setup>
import {
  ref,
  onBeforeMount,
  onMounted,
  watch,
  defineProps,
  computed,
} from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/UserStore";
import { storeToRefs } from 'pinia'

/* Props */
const props = defineProps(["recipe"]);

/* Router */
const router = useRouter();

/* Store */
const store = useUserStore()
const { currentUser, currentUserEmail, isSignedIn } = storeToRefs(store)
const { getCurrentUser, handleSignInGoogle, handleSignOutGoogle } = store

const spiceLevelClass = ref();

onMounted(async () => {
  // Check if the user is already logged in on the page loading
  await getCurrentUser();
  // Classes and styles for spice level
  const checkSpiceLevel = () => {
    if (props.recipe.data.spiceLevel === "Low") {
      spiceLevelClass.value = "low";
    }
    if (props.recipe.data.spiceLevel === "Mild") {
      spiceLevelClass.value = "mild";
    }
    if (props.recipe.data.spiceLevel === "High") {
      spiceLevelClass.value = "high";
    }
    if (props.recipe.data.spiceLevel === "Extreme") {
      spiceLevelClass.value = "extreme";
    }
  };
  checkSpiceLevel();
});

const handleEdit = () => {
  router.push(`/update-recipe/${props.recipe.id}`)

}
</script>

<template>
  <section class="subhero heading-font">
    <h1>{{ recipe.data.name }}</h1>
  </section>
  <section class="container recipe-detail">
    <h2 class="sub-heading">Summary</h2>
    <div class="card recipe-detail__section">
      <div>
        <font-awesome-icon icon="fa-solid fa-user" /><span>Chef: {{ recipe.data.chef }}</span>
      </div>
      <div>
        <font-awesome-icon icon="fa-solid fa-bowl-food" /><span>Category: {{ recipe.data.category }}</span>
      </div>
      <div>
        <font-awesome-icon icon="fa-solid fa-mortar-pestle" /><span>Ingredients: {{ recipe.data.ingredients.length
        }}</span>
      </div>
      <div>
        <font-awesome-icon icon="fa-solid fa-utensils" /><span>Prep time: {{ recipe.data.prepTime }}</span>
      </div>
      <div>
        <font-awesome-icon icon="fa-solid fa-fire-flame-curved" class="high" /><span>Cook time: {{ recipe.data.cookTime
        }}</span>
      </div>
      <div>
        <font-awesome-icon icon="fa-solid fa-bowl-rice" /><span>Serve: {{ recipe.data.serve }} people</span>
      </div>

      <div>
        <font-awesome-icon icon="fa-solid fa-cubes-stacked" /><span>Sugar level: {{ recipe.data.sugarLevel }}</span>
      </div>
      <div>
        <font-awesome-icon icon="fa-solid fa-pepper-hot" :class="spiceLevelClass" /><span>Spice level: {{
          recipe.data.spiceLevel }}</span>
      </div>

      <div>
        <font-awesome-icon icon="fa-solid fa-cake-candles" /><span>Occasion: {{ recipe.data.occasion }}</span>
      </div>
      <div>
        <font-awesome-icon icon="fa-regular fa-calendar" /><span>Date added: {{ recipe.data.date }}</span>
      </div>
    </div>
    <h2 class="sub-heading">Description</h2>
    <section class="recipe-detail__section">
      <p>{{ recipe.data.desc }}</p>
    </section>
    <section class="two-col">
      <div class="ingredients">
        <h2 class="sub-heading">Ingredients</h2>
        <ul class="list">
          <li v-for="ingredient in recipe.data.ingredients" :key="ingredient.name">
            <div class="row">
              <font-awesome-icon icon="fa-solid fa-caret-right" />
              <span>{{ ingredient.qty }} {{ ingredient.name }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="method">
        <h2 class="sub-heading">Method</h2>
        <ul class="list">
          <li v-for="step in recipe.data.steps" :key="step.step">
            <div class="row">
              <font-awesome-icon icon="fa-solid fa-caret-right" />
              <span>{{ step.step }}</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <div v-if="isSignedIn" class="crud-operations">
      <div class="edit" @click="handleEdit">
        <a href="#"><font-awesome-icon icon="fa-regular fa-edit" /> Edit this recipe</a>
      </div>
      <div class="delete" @click="handleDelete">
        <a href="#"><font-awesome-icon icon="fa-regular fa-trash-can" /> Delete this recipe</a>
      </div>
    </div>

  </section>
</template>

<style scoped>
.heading-font {
  font-family: var(--heading-font);
}

.recipe-detail__section {
  padding: 1.75rem 1rem;
  margin-block-end: 1.85rem;
  background: var(--light-grey);
  border-radius: 5px;
  font-size: 1.125rem;
}

.card {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 1rem;
}

.card div {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.row {
  display: flex;
  align-items: baseline;
  gap: 0.85rem;
}

.list {
  list-style-type: none;
  font-size: 1.125rem;
  line-height: 2.25rem;
  padding-left: unset;
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
}

.two-col div ul {
  padding: 1.75rem 1rem;
  margin-block-end: 1.85rem;
  background: var(--light-grey);
  border-radius: 5px;
  font-size: 1.125rem;
}

/* 
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
} */

.crud-operations {
  display: flex;
  gap: 2rem;
  margin-block: 2rem;
}

.crud-operations a {
  text-decoration: none;
  color: var(--primary);
  font-weight: 600;
}

.crud-operations a:hover {
  color: var(--accent);
}

.crud-operations .svg-inline--fa.fa-trash-can {
  color: var(--bright-red);
}

/* Fontawesome */
.svg-inline--fa.low {
  color: var(--primary);
}

.svg-inline--fa.mild {
  color: var(--amber);
}

.svg-inline--fa.high {
  color: var(--accent);
}

.svg-inline--fa.extreme {
  color: red;
}

@media (max-width: 768px) {
  .card {
    grid-template-columns: 1fr 1fr;
  }

  .two-col {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 568px) {
  .card {
    grid-template-columns: 1fr;
  }

  .recipe-detail__section {
    font-size: 1rem;
  }
}
</style>
