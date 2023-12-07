<script setup>
import {ref, defineProps} from 'vue';

defineProps(["recipe"])
</script>

<template>
<div class="card">
    <div class="card__header">
       Cook time:  <span>{{ recipe.cookTime }}</span>
    </div>
    <div class="card__title">
        <h2>{{ recipe.name }}</h2>
    </div>
    <div class="card__desc">
        <!-- <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil ut, explicabo nemo dolores quam magnam?</p> -->
        <p>{{ recipe.desc }}</p>
    </div>
</div>

</template>

<style scoped>
.card{
    display: flex;
    flex-direction: column;
    padding: 1.25rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 1px dashed var(--light-grey);
    border-radius: 15px;
    flex: 1; /* Cards will take equal width within the flex container */
    max-width: calc(33.333% - 16px); /* Adjust the max-width based on your preferences */
    margin: 8px; /* Adjust margin as needed */
}

.card .card__title{
    font-family: var(--heading-font);
    color: var(--primary);
}

/* Media query for smaller screens */
@media screen and (max-width: 768px) {
  .card{
    max-width: calc(100% - 16px);
  }
}
</style>