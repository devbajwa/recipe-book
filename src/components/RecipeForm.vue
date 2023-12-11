<script setup>
import {
  ref,
  defineEmits,
  defineProps,
  watchEffect,
  computed,
  nextTick,
  onMounted,
} from "vue";

import {v4 as uuidv4} from 'uuid';

const emit = defineEmits(["dataSubmitted"]);
const props = defineProps(["editData", "isEditModeOn"]);

/* local state recipe var */
const localRecipe = ref();

/* Ref Variables */
const name = ref("");
const desc = ref("");
const isFav = ref(false);
const ingredients = ref([]);
const ingredientInputs = ref([]);
const editedIngredients = ref([{ name: "", qty: "" }]);
const steps = ref([]);
const stepInputs = ref([]);
const editedSteps = ref([{ step: "" }]);
const selectedCategory = ref("");
const prepTime = ref("");
const cookTime = ref("");
const selectedSpiceLevel = ref("");
const selectedSugarLevel = ref("");
const chef = ref("");
const occasion = ref("");

// const reverseIngredients = computed(() => {
//   return editedIngredients.value.slice().reverse();
// });
// onMounted(() => {
//   editedIngredients.value = editedIngredients.value.slice().reverse();
//     });

/* INGREDIENTS - Function to handle add ingredinet input on the form */
const addIngredient = () => {
  if (editedIngredients.value.length) {
    //Are we adding the very first ingredient
    if (
      editedIngredients.value[editedIngredients.value.length - 1].name !== "" &&
      editedIngredients.value[editedIngredients.value.length - 1].qty !== ""
    ) {
      // If not then make sure it is filled before adding one
      editedIngredients.value.push({ name: "", qty: "" });
    }
  } else {
    editedIngredients.value.push({ name: "", qty: "" });
  }

  // Focus on the last added input
  nextTick(() => {
    const lastInput = ingredientInputs.value[ingredientInputs.value.length - 2];
    lastInput.focus();
  });
};

// Function to handle remove ingredinet input on the form
const removeIngredient = (index) => {
  editedIngredients.value.splice(index, 1);
};

// Function to handle empty ingredinet input don't send it to submit
const filterEmptyIngredients = () => {
  ingredients.value = editedIngredients.value.filter((i) => i.name !== "");
};

/* METHOD STEPS - Function to handle add method steps input on the form */
const addStep = () => {
  if (editedSteps.value.length) {
    //Are we adding the very first ingredient
    if (editedSteps.value[editedSteps.value.length - 1].step !== "") {
      // If not then make sure it is filled before adding one
      editedSteps.value.push({ step: "" });
    }
  } else {
    editedSteps.value.push({ step: "" });
  }

  // Focus on the last added input
  nextTick(() => {
    const lastInput = stepInputs.value[stepInputs.value.length - 1];
    lastInput.focus();
  });
};

// Function to handle remove method step input on the form
const removeStep = (index) => {
  editedSteps.value.splice(index, 1);
};

// Function to handle empty steps input don't send it to submit
const filterEmptySteps = () => {
  steps.value = editedSteps.value.filter((i) => i.step !== "");
};

// Function to handle spice and sugar levels
const handleSpiceAndSugarLevels = () => {
  // If recipe category is Dessert then spice level is null otherwise sugar level is null
  if(selectedCategory.value !== 'Dessert'){
    selectedSugarLevel.value = "";
  }else{
    selectedSpiceLevel.value = "";
  }
}

const getCustomFullDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
}


// Function to handle pre submit checks - validation
const handlePreSubmitChecks = () => {
    filterEmptyIngredients();
    filterEmptySteps();
    handleSpiceAndSugarLevels();
}

// Functio to handle after submit checks - default state
const handleAfterSubmitChecks = () => {
  name.value = "";
  desc.value = "";
  isFav.value = false;
  editedIngredients.value = [{ name: "", qty: "" }];
  editedSteps.value = [{ step: "" }];
  selectedCategory.value = "";
  prepTime.value = "";
  cookTime.value = "";
  selectedSpiceLevel.value = "";
  selectedSugarLevel.value = "";
  chef.value = "";
  occasion.value = "";
}

// Function to handle edit form coming from the RecipeDetail component
watchEffect(() => {
  if (props.isEditModeOn === true) {
    name.value = props.editData.name;
    desc.value = props.editData.desc;
    isFav.value = props.editData.isFav;
    editedIngredients.value = JSON.parse(
      JSON.stringify(props.editData.ingredients)
    ); // this is required for arrays if data is array as prop then must do this
  }
});

const submitForm = () => {
  let dataToSubmit;
  if (!name.value || !desc.value) {
    return;
  } else if (props.isEditModeOn === false) {
    handlePreSubmitChecks();
    dataToSubmit = {
      id: uuidv4(),
      date: getCustomFullDate(),
      name: name.value,
      desc: desc.value,
      isFav: isFav.value,
      ingredients: ingredients.value,
      steps: steps.value,
      category: selectedCategory.value,
      prepTime: prepTime.value,
      cookTime: cookTime.value,
      spiceLevel: selectedSpiceLevel.value,
      sugarLevel: selectedSugarLevel.value,
      chef: chef.value,
      occasion: occasion.value,
    };
  } else {
    handlePreSubmitChecks();
    dataToSubmit = {
      //id: props.editData.id,
      id: uuidv4(),
      date: getCustomFullDate(), //not required in edit mode
      name: name.value,
      desc: desc.value,
      isFav: isFav.value,
      ingredients: ingredients.value,
      steps: steps.value,
      category: selectedCategory.value,
      prepTime: prepTime.value,
      cookTime: cookTime.value,
      spiceLevel: selectedSpiceLevel.value,
      sugarLevel: selectedSugarLevel.value,
      chef: chef.value,
      occasion: occasion.value,
    };
  }
  //emit("dataSubmitted", dataToSubmit);
  localRecipe.value = dataToSubmit; // Local state has submitted data

  // Clear values to default after form submits
  handleAfterSubmitChecks();
};
</script>

<template>
  <section class="container">
    <h2>Form</h2>
    <form @submit.prevent="submitForm">
      <div class="form-subsection">
        <label>Recipe name:</label>
        <input
          type="text"
          id="text"
          v-model.trim="name"
          placeholder="Enter recipe name"
        />
      </div>
      <div class="form-subsection">
        <label>Recipe description:</label>
        <textarea
          type="text"
          id="desc"
          v-model.trim="desc"
          placeholder="Enter recipe description"
        />
      </div>
      <div class="form-subsection">
        <div class="row">
          <input type="checkbox" id="isFav" value="Favourite" v-model="isFav" />
          <label for="isFav">Is this your favourite recipe?</label>
        </div>
      </div>
      <!-- Ingredients -->

      <div class="repeater">
        <div class="form-subsection double-inputs">
          <label>Recipe ingredients: e.g(Salt, 1 tsp)</label>
          <div v-for="(ingredient, index) in editedIngredients" :key="index">
            <div class="repeater-flex">
                <label class="sub-label">Ingredient name</label>
            <input
              v-model.trim="ingredient.name"
              type="text"
              ref="ingredientInputs"
              placeholder="Enter ingredient"
            />
            </div>
            <div class="repeater-flex">
            <label class="sub-label">Ingredient quantity</label>
            <input
              v-model.trim="ingredient.qty"
              type="text"
              ref="ingredientInputs"
              placeholder="Enter qty"
            />
            </div>
            <span class="mt-185" type="button" @click="removeIngredient(index)"
              ><font-awesome-icon
                icon="fa-solid fa-circle-xmark"
                class="close-mark"
            /></span>
          </div>
        </div>
        <button type="button" @click="addIngredient">
          <span class="add-button"
            ><font-awesome-icon icon="fa-solid fa-plus" /><span
              >Add Ingredient</span
            ></span
          >
        </button>
      </div>
      <!-- Method -->
      <div class="repeater">
        <div class="form-subsection">
          <label>Recipe method steps:</label>
          <div v-for="(method, index) in editedSteps" :key="index">
            <textarea
              v-model.trim="method.step"
              type="text"
              ref="stepInputs"
              placeholder="Enter step"
            />
            <span type="button" @click="removeStep(index)"
              ><font-awesome-icon
                icon="fa-solid fa-circle-xmark"
                class="close-mark"
            /></span>
          </div>
        </div>
        <button type="button" @click="addStep">
          <span class="add-button"
            ><font-awesome-icon icon="fa-solid fa-plus" /><span
              >Add Step</span
            ></span
          >
        </button>
      </div>
      <!-- Category-->
      <div class="form-subsection">
        <label for="selectCategory">Choose a category:</label>
        <select v-model="selectedCategory" id="selectCategory">
          <option value="" disabled>Curry, Rice, Snack, Dessert</option>
          <option value="Curry">Curry</option>
          <option value="Rice">Rice</option>
          <option value="Snack">Snack</option>
          <option value="Dessert">Dessert</option>
        </select>
      </div>

      <!-- Spice Level-->
      <div v-if="selectedCategory !== 'Dessert' " class="form-subsection">
        <label for="selectSpiceLevel">Choose a spice level:</label>
        <select v-model="selectedSpiceLevel" id="selectSpiceLevel">
          <option value="" disabled>Low, Medium, High, Extreme</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Extreme">Extreme</option>
        </select>
      </div>

      <!-- Sugar Level-->
      <div v-if="selectedCategory === 'Dessert' " class="form-subsection">
        <label for="selectSugarLevel">Choose a sugar level:</label>
        <select v-model="selectedSugarLevel" id="selectSugarLevel">
          <option value="" disabled>Low, Medium, High</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

            <!-- Prep and Cook Time-->
            <div class="form-subsection">
        <label>How much time to prep and cook? e.g(5 mins)</label>
        <div class="row">
            <div>
                <label class="sub-label">Time to prep</label>
          <input
            type="text"
            v-model="prepTime"
            placeholder="15 mins"
          /></div>
            <div>
                <label class="sub-label">Time to cook</label>
                <input type="text" v-model="cookTime" placeholder="1 hr" />
            </div>
          
        </div>
      </div>

      <!-- Occasion-->
      <div class="form-subsection">
        <label>Which occasion suits best for this recipe?</label>
        <input type="text" v-model="occasion" placeholder="Enter occasion" />
      </div>
      <!-- Chef-->
      <div class="form-subsection">
        <label>Chef name</label>
        <input type="text" v-model="chef" placeholder="Enter Chef name" />

        <button class="submit-btn" type="submit">
          {{ isEditModeOn ? "Update Data" : "Submit" }}
        </button>
      </div>
    </form>
    <h1>Data Submitted</h1>
    {{ localRecipe }}
  </section>
</template>

<style scoped>
form,
textarea,
input,
select {
  font-family: var(--main-font);
  font-size: 1rem;
}
form {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  gap: 1.5rem;
  margin: auto;
}

input[type="text"] {
  height: 2rem;
}

textarea {
  height: 4rem;
}

input[type="text"],
textarea,
select {
  padding: 0.25rem;
  border: 1px solid var(--primary);
}

input[type="text"]:focus,
textarea:focus,
select:focus {
  border: 1px solid var(--primary);
}

input[type="text"]:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: var(--primary) auto 2px;
}

input[type="checkbox"],
input[type="checkbox"] + label {
  cursor: pointer;
}

form label.sub-label{
    font-weight: 400;
}
.mt-185{
    margin-top: 1.85rem;
}

.form-subsection {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-subsection label {
  align-self: baseline;
  font-weight: bold;
}

.svg-inline--fa.close-mark {
  color: var(--accent);
  cursor: pointer;
  font-size: 18px;
}
.svg-inline--fa.close-mark:hover {
  color: var(--dark-grey);
}

.add-button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.add-button .svg-inline--fa {
  color: var(--dark-grey);
  background-color: var(--smoke-white);
  padding: 0.15rem;
  border-radius: 50%;
  width: 0.65rem;
  height: 0.65rem;
}

.row {
  /* align-self: baseline; */
  display: flex;
  /* justify-content: space-between; */
  gap: 0.5rem;
  width: 100%;
}
/* 
.row input[type="text"] {
  width: 165px;
  flex: 1;
} */

.row div {
    width: calc(50% - 4px);
    display: flex;
    flex-direction: column;
}



.repeater {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
}

.repeater div {
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.repeater div input {
  width: 165px;
}

.repeater div textarea,
.repeater div input {
  flex: 1;
}

.repeater .repeater-flex{
    flex-direction: column;
    align-items: start;
    margin-top: 0.25rem;
}

.repeater .repeater-flex input{
    flex: auto;
    width: calc(100% - 12px);
}

button {
  cursor: pointer;
  padding: 15px 30px;
  background-color: var(--primary);
  color: var(--smoke-white);
  border: 1px solid var(--light-grey);
  width: fit-content;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 5px;
}

button:hover {
  background-color: var(--green-light);
}

button.submit-btn{
    margin-block: 1.5rem;
}


@media(max-width: 767px){
    .repeater .form-subsection.double-inputs div{
        flex-direction: column;
    }

    .repeater .form-subsection.double-inputs div .mt-185{
        margin: 0.25rem;
        align-self: start;
    }
}
</style>
