<script setup>
import {ref} from 'vue';
import RecipeCard from '../components/RecipeCard.vue';


const recipes = ref([
    {
        id: 1,
        date: Date.now(),
        name: "Biryani",
        desc: "This is the delicious meal.",
        isFav: false,
        ingredients: [{ name: "Love", qty: "1sp" }, { name: "Effection",  qty: "2sp"}],
        method: [{step: "Hold the hands"}, {step: "Never let go"}],
        category: "Cuddle",
        prepTime: "2 min",
        cookTime: "Forever",
        spiceLevel: "Extreme",
        chef: "Wife",
        occasion: "Life"
    },
    {
        id: 2,
        date: Date.now(),
        name: "Nihari",
        desc: "This is the delicious meal.",
        isFav: false,
        ingredients: [{ name: "Love", qty: "1sp" }, { name: "Effection",  qty: "2sp"}],
        method: [{step: "Hold the hands"}, {step: "Never let go"}],
        category: "Cuddle",
        prepTime: "2 min",
        cookTime: "Forever",
        spiceLevel: "Extreme",
        chef: "Wife",
        occasion: "Life"
    },
    {
        id: 3,
        date: Date.now(),
        name: "Samosa",
        desc: "This is the delicious meal.",
        isFav: false,
        ingredients: [{ name: "Love", qty: "1sp" }, { name: "Effection",  qty: "2sp"}],
        method: [{step: "Hold the hands"}, {step: "Never let go"}],
        category: "Cuddle",
        prepTime: "2 min",
        cookTime: "Forever",
        spiceLevel: "Extreme",
        chef: "Wife",
        occasion: "Life"
    }
])
</script>
<template>
    <section>
        <h1>Recipes</h1>
        <div class="card-container">
            <RecipeCard :recipe="recipe" v-for="recipe in recipes"/>
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