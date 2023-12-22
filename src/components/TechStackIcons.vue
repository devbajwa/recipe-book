<template>
    <div class="tech-stack">
        <font-awesome-icon icon="fa-brands fa-html5" />
        <font-awesome-icon icon="fa-brands fa-css3" />
        <font-awesome-icon icon="fa-brands fa-js" />
        <font-awesome-icon icon="fa-brands fa-vuejs" />
        <!-- <img src="../assets/html5.png" alt="HTML5">
      <img src="../assets/css3.png" alt="CSS3">
      <img src="../assets/js.png" alt="JS">
      <img src="../assets/vue.png" alt="VUE">
      <img src="../assets/firebase.png" alt="Firebase"> -->
    </div>
</template>

<style scoped>
.tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    margin-block: 2rem;
}

.tech-stack .svg-inline--fa {
    width: 50px;
    height: 50px;
    opacity: 0.80;
}

.tech-stack img {
    height: 150px;
}

@media (max-width: 768px) {
    .tech-stack img {
        height: 80px;
    }
}
</style>