<script setup>
import RecipeCard from '../components/RecipeCard.vue'
</script>
<template>
    <section>
        <h1>Recipes</h1>
        <div class="card-container">
            <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        </div>

    </section>
</template>

<style scoped>
.card-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

/* Media query for smaller screens */
@media screen and (max-width: 768px) {
  .card-container{
    display: block;
  }
}
</style>