<script setup>

</script>
<template>
<div class="nav container">
  <div class="nav-logo">
    <h1>Recipes Book</h1>
  </div>
    <!-- <RouterLink active-class="active" to="/">Home</RouterLink>
    <RouterLink active-class="active" to="/about">About</RouterLink>
    <RouterLink active-class="active" to="/add-recipe">Add Recipe</RouterLink> -->
    <div class="nav-links">
      <a href="#">Recipes</a>
      <a href="#">Add Recipe</a>
      <a href="#">About</a>
    </div>
</div>

</template>
<style scoped>

.nav{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #f6f6f6;
}

.nav .nav-logo h1{
  font-family: var(--signature-font);
}

.nav .nav-links{
  display: flex;
  gap: 1.25rem;
}

.nav .nav-links a{
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.nav .nav-links a:hover{
  color: #FF5555;
}

@media(max-width: 545px){
    .nav{
        flex-direction: column;
        padding-bottom: 1.5rem;
    }
}
</style>

