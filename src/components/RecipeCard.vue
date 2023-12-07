<script setup>
import { ref, defineProps, onMounted } from "vue";

const props = defineProps(["recipe"]);

const spiceLevelClass = ref();

onMounted(() => {
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
</script>

<template>
  <div class="card">
    <div class="card__header">
      <div>
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
      </div>
    </div>
    <div class="card__title">
      <h2>{{ recipe.name }}</h2>
    </div>
    <div class="card__desc">
      <!-- <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil ut, explicabo nemo dolores quam magnam?</p> -->
      <p>{{ recipe.desc }}</p>
    </div>
    <div class="card__footer">
      <span v-if="recipe.isFav">
        <font-awesome-icon icon="fa-solid fa-heart" />
      </span>
      <span v-else>
        <font-awesome-icon icon="fa-regular fa-heart" />
      </span>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: grid;
  flex-direction: column;
  padding: 1.25rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px dashed var(--light-grey);
  border-radius: 15px;
  flex: 1; /* Cards will take equal width within the flex container */
  /*width: 33%;
  max-width: calc(33.333% - 16px); /* Adjust the max-width based on your preferences */
  margin: 8px; /* Adjust margin as needed */
}

.card .card__title {
  font-family: var(--heading-font);
  color: var(--primary);
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

.card .card__footer {
  text-align: right;
}

/* Media query for smaller screens */
@media screen and (max-width: 768px) {
  .card {
    max-width: calc(100% - 16px);
  }
}

/* Font Awesome */
.svg-inline--fa {
  color: var(--primary);
  width: 1rem;
}

.card .card__footer .svg-inline--fa {
  color: var(--accent);
  font-size: 1.55rem;
  cursor: pointer;
}

.svg-inline--fa.low {
  color: var(--primary);
}
.svg-inline--fa.medium {
  color: var(--amber);
}
.svg-inline--fa.high {
  color: var(--accent);
}
.svg-inline--fa.extreme {
  color: red;
}
</style>
