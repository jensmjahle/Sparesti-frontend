<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'

const router = useRouter();
const currentRoute = router.currentRoute;
const selectedPath = ref(currentRoute.value.path)
const navigateTo = (path: string) => {
  router.push(path)
}

watch(currentRoute, () => {
  selectedPath.value = currentRoute.value.path;
})

</script>

<template>
  <div class="side-navigation">
    <div class="button-menu">
      <button
        class="menu-button"
        :class="{ 'active': currentRoute.path == '/homepage/home' || currentRoute.path == '/homepage' }"
        @click="navigateTo('/homepage/home')">
        <img src="/src/components/icons/navigation/house-chimney.svg" alt="Home Icon" class="icon">
        <label class="button-label">Hjem</label>
      </button>
      <button
        class="menu-button"
        :class="{ 'active': currentRoute.path == '/homepage/discover' }"
        @click="navigateTo('/homepage/discover')">
        <img src="/src/components/icons/navigation/lightbulb-on.svg" alt="Discover Icon" class="icon">
        <label class="button-label">Sparetips</label>
      </button>
      <button
        class="menu-button"
        :class="{ 'active': currentRoute.path == '/homepage/milestone'
        || currentRoute.path == '/homepage/create-milestone'
        || currentRoute.path == '/homepage/create-milestone'
        || currentRoute.path == 'homepage/pathe'}"
        @click="navigateTo('/homepage/milestone')">
        <img src="/src/components/icons/navigation/piggy-bank.svg" alt="Milestone Icon" class="icon">
        <label class="button-label">Sparemål</label>
      </button>
      <button
        class="menu-button"
        :class="{ 'active': currentRoute.path == '/homepage/challenge' || currentRoute.path == '/homepage/create-challenge'}"
        @click="navigateTo('/homepage/challenge')">
        <img src="/src/components/icons/navigation/challenge.svg" alt="Challenge Icon" class="icon">
        <label class="button-label">Utfordringer</label>
      </button>
      <button
        class="menu-button"
        :class="{ 'active': currentRoute.path == '/homepage/economy' }"
        @click="navigateTo('/homepage/economy')">
        <img src="/src/components/icons/navigation/economy.svg" alt="Economy Icon" class="icon">
        <label class="button-label">Forbruk</label>
      </button>
      <button
        class="menu-button"
        :class="{ 'active': currentRoute.path == '/homepage/profile' }"
        @click="navigateTo('/homepage/profile')">
        <img src="/src/components/icons/navigation/user.svg" alt="Profile Icon" class="icon">
        <label class="button-label">Profil</label>
      </button>
    </div>
    <img src="/src/assets/happy-pig.png" alt="Pig Logo" class="logo">
  </div>
</template>


<style scoped>
.side-navigation{
  display: flex;
  flex-direction: column;

  align-items: center;

  height: 100%;
  width: 100%;
  background-color: var(--color-background);
}

.button-menu{
  display: flex;
  flex-direction: column;

  align-items: center;
  place-content: start;
  justify-content: space-evenly;

  height: 65%;
  width: 100%;

  gap: 5.0%;
}

.menu-button{
  display: flex;
  flex-direction: row;

  align-items: center;
  place-content: center;

  height: 12%;
  width: 100%;
  gap: 2.5%;

  border: 2px solid var(--color-border);
  border-radius: 20px;
  background-color: transparent;
}

.menu-button.active {
  border-color: var(--color-heading); /* Change to your desired color */
}

.menu-button:hover{
  transform: scale(1.05);
  cursor: pointer;
}

.icon{
  width: 15%;
  height: 80%;
  margin: 0;
}
@media (prefers-color-scheme: dark) {
  .icon {
    filter: invert(1); /* Invert colors of the image in dark mode */
  }
}

.button-label{
  margin: 0;
  font-size: medium;
  color: var(--color-text);
}

.button-label:hover{
  cursor: pointer;
}

.logo{
  height: 35%;
  padding-top: 5.0%;
}

</style>