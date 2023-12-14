<script setup>
import { ref, onMounted, defineProps } from "vue";

defineProps(["text"]);
//const empty = document.querySelector("#empty");
const icoLow =
  '<font-awesome-icon icon="fa-solid fa-pepper-hot" class="low" />';
const icoMedium =
  '<font-awesome-icon icon="fa-solid fa-pepper-hot" class="medium" />';
const icoHigh =
  '<font-awesome-icon icon="fa-solid fa-pepper-hot" class="high" />';
const icoExtreme =
  '<font-awesome-icon icon="fa-solid fa-pepper-hot" class="extreme" />';

// const icons = [empty, icoLow, icoMedium, icoHigh, icoExtreme];

onMounted(() => {
  const empty = document.querySelector("#empty");
  const icoLow = document.querySelector("#icoLow");
  const icoMedium = document.querySelector("#icoMedium");
  const icoHigh = document.querySelector("#icoHigh");
  const icoExtreme = document.querySelector("#icoExtreme");

  const icons = [empty, icoLow, icoMedium, icoHigh, icoExtreme];

  const currentIconIndex = ref(0);

  setInterval(() => {
    if (currentIconIndex.value < icons.length) {
      icons[currentIconIndex.value].style.display = "block";
      currentIconIndex.value++;
    } else {
      currentIconIndex.value = 0;
      hideIcons();
    }
  }, 500);

  const hideIcons = () => {
    icons.map((ico) => (ico.style.display = "none"));
  };
});
</script>

<template>
  <div class="recipe-loader">
    <div class="loading-content">
      <div class="loading-text">
        <h4>{{ text }}</h4>
      </div>
      <div class="loading-icons">
        <font-awesome-icon icon="fa-solid fa-pepper-hot" class="" id="empty" />
        <font-awesome-icon
          icon="fa-solid fa-pepper-hot"
          class="low"
          id="icoLow"
        />
        <font-awesome-icon
          icon="fa-solid fa-pepper-hot"
          class="medium"
          id="icoMedium"
        />
        <font-awesome-icon
          icon="fa-solid fa-pepper-hot"
          class="high"
          id="icoHigh"
        />
        <font-awesome-icon
          icon="fa-solid fa-pepper-hot"
          class="extreme"
          id="icoExtreme"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.recipe-loader {
  height: 50dvh;
  display: grid;
  place-items: center;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-icons {
  display: flex;
}

.loading-content h4 {
  color: var(--primary);
}
.svg-inline--fa {
  display: none;
  font-size: 2rem;
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
