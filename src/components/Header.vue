<script setup>
import { RouterLink, useRouter } from "vue-router";
const router = useRouter();
</script>
<template>
  <div class="nav container">
    <div class="nav-logo">
      <h1 @click="router.push('/')">ReciPen</h1>
    </div>
    <div class="nav-links">
      <RouterLink active-class="active" to="/">Recipes</RouterLink>
      <RouterLink active-class="active" to="/add-recipe">Add Recipe</RouterLink>
      <RouterLink active-class="active" to="/about">About</RouterLink>
    </div>
  </div>
  <!-- <HeroSection /> -->
</template>
<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav .nav-logo h1 {
  font-family: var(--signature-font);
  cursor: pointer;
}
.nav .nav-logo h1:hover {
  color: var(--accent);
}

.nav .nav-links {
  display: flex;
  gap: 2rem;
}

.nav .nav-links a {
  text-decoration: none;
  color: var(--dark-grey);
  font-weight: none;
  font-size: 1.125rem;
}

.nav .nav-links a:hover {
  color: var(--accent);
}

.nav .nav-links a.active {
  color: var(--accent);
}

@media (max-width: 545px) {
  .nav {
    flex-direction: column;
    padding-bottom: 1.5rem;
  }
}
</style>
