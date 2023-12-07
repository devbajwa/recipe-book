<script setup>
import {ref} from 'vue';
import RecipeCard from '../components/RecipeCard.vue';

const getDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
}


const recipes = ref([
    {
        id: 1,
        date: getDate(),
        name: "Biryani",
        desc: "This is the delicious meal.",
        isFav: true,
        ingredients: [{ name: "Love", qty: "1sp" }, { name: "Effection",  qty: "2sp"}],
        method: [{step: "Hold the hands"}, {step: "Never let go"}],
        category: "Cuddle",
        prepTime: "2 min",
        cookTime: "Forever",
        spiceLevel: "Low",
        chef: "Wife",
        occasion: "Life"
    },
    {
        id: 2,
        date: getDate(),
        name: "Nihari",
        desc: "This is the delicious meal.",
        isFav: false,
        ingredients: [{ name: "Love", qty: "1sp" }, { name: "Effection",  qty: "2sp"}],
        method: [{step: "Hold the hands"}, {step: "Never let go"}],
        category: "Cuddle",
        prepTime: "2 min",
        cookTime: "Forever",
        spiceLevel: "Medium",
        chef: "Wife",
        occasion: "Life"
    },
    {
        id: 3,
        date: getDate(),
        name: "Samosa",
        desc: "This is the delicious meal.",
        isFav: true,
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
        id: 4,
        date: getDate(),
        name: "Haleem",
        desc: "This is the delicious meal.",
        isFav: true,
        ingredients: [{ name: "Love", qty: "1sp" }, { name: "Effection",  qty: "2sp"}],
        method: [{step: "Hold the hands"}, {step: "Never let go"}],
        category: "Cuddle",
        prepTime: "2 min",
        cookTime: "1 hr",
        spiceLevel: "High",
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
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

/* Media query for smaller screens */
@media screen and (max-width: 768px) {
  .card-container{
    grid-template-columns: repeat(2, 1fr);
  }
}
/* Media query for smaller screens */
@media screen and (max-width: 580px) {
  .card-container{
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>