<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import useFirebase from "../firebase/useFirebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";

import { recipeService } from "../service/recipeService";
import { userInteractionService } from "../service/userInteractionService";
import { useUserStore } from "../stores/UserStore";
import { storeToRefs } from "pinia";
/* Store */
const store = useUserStore();
const { currentUser, currentUserEmail, isSignedIn } = storeToRefs(store);
const { getCurrentUser, handleSignInGoogle, handleSignOutGoogle } = store;

const { firebase } = useFirebase();
const recipes = ref([]);
const singleRecipe = ref();

onMounted(async () => {
  // Function to fetch data from Firestore
  /*const querySnapshot = await getDocs(collection(firebase.db, "recipes"));
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
    //console.log(doc.id, doc.data())
  });
  recipes.value = data;*/

  // Function to get single data from Firestore
  const q = doc(firebase.db, "recipes", "Qp8GRcd7STicfgs5cTLg");
  const querySnapshot2 = await getDoc(q);
  console.log(querySnapshot2.id, " => ", querySnapshot2.data());

  //Add a new document with a generated id.
  // const docRef = await addDoc(collection(firebase.db, "recipes"), {
  //     name: "Nihari",
  //     desc: "Behtreen cheez"
  // },);
  // console.log("Document written with ID: ", docRef.id);

  const toBeDeleted = ["4WLb0ik4W2Ou9d905iOG"];

  toBeDeleted.forEach(async (item) => {
    await deleteDoc(doc(firebase.db, "recipes", item));
  });

  // firestore as service

  // fetch all recipes
  const fbData = await recipeService.getFirestoreCurrentUserRecipes('asd@asd');
  console.log(fbData)
  recipes.value = fbData;
  // add a recipe
  //   await recipeService.addFirestoreRecipe({
  //         name: "Nihari",
  //         desc: "Behtreen cheez"
  //     });

  //const recipeRef = doc(firebase.db, "recipes", "4k6qCisxymPWVsIvlG65");
  await recipeService.updateFirestoreRecipeLikes("XDA5FnromKFX4a3pa7iM")
  // Set the "capital" field of the city 'DC'
  // await updateDoc(recipeRef, {
  //   category: "Snack",
  //   chef: "Waqas",
  //   currentUserEmail: "wbajwa313@gmail.com"
  // });
});

onBeforeMount(async () => {
  // get single recipe with id
  const singleData = await recipeService.getFirestoreRecipe(
    "XDA5FnromKFX4a3pa7iM"
  );
  singleRecipe.value = { id: singleData.id, data: singleData.data() };
  //console.log(JSON.parse(JSON.stringify(singleRecipe.value)));
  /* Get Current User Interaction Data */
  // const userInteractionData = await userInteractionService.getUserInteractionData(currentUserEmail.value)
  // const userCollection = { id: userInteractionData.id, data: userInteractionData.data().collection };
  // console.log(userCollection)
  // const userLiked = await userInteractionService.getUserInteractionLikeForRecipe(currentUserEmail.value, "2wuLjwtx5zpcKo2ynaUU")
  // console.log(userLiked)

  //await addDoc(collection(firebase.db, "userInteractions"), { collection, likes });
  //

});
</script>
<template>
  <h1>Hi from DEMO</h1>
  <div v-if="singleRecipe">
    {{ singleRecipe.id }}
    {{ singleRecipe.data.name }}
  </div>
  <div v-else>Fetching...</div>
  <ul>
    <li v-for="recipe in recipes" :key="recipe.id">
      <h3>Recipe for</h3>
      {{ recipe.name }}
      <h3>Ingredients</h3>
      <ol>
        <li v-for="ingredient in recipe.ingredients" :key="ingredient.name">
          {{ ingredient.name }} = {{ ingredient.qty }}
        </li>
      </ol>
      <h3>Methods</h3>
      <ol>
        <li v-for="step in recipe.steps" :key="step.step">
          {{ step.step }}
        </li>
      </ol>
      <h3>Category</h3>
      {{ recipe.category }}
      <h3>Prep Time</h3>
      {{ recipe.prepTime }}
      <h3>Cook Time</h3>
      {{ recipe.cookTime }}
      <h3 v-if="recipe.spiceLevel">Spice Level</h3>
      {{ recipe.spiceLevel }}
      <h3 v-if="recipe.sugarLevel">Sugar Level</h3>
      {{ recipe.sugarLevel }}
      <h3>Chef</h3>
      {{ recipe.chef }}
      <h3>Occasion</h3>
      {{ recipe.occasion }}
      <h3>Date</h3>
      {{ recipe.date }}
    </li>
  </ul>
</template>
