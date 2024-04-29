<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { defineEmits } from 'vue'
  const emit = defineEmits(['route-pushed']);


  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
    emit('route-pushed', false);
  }
</script>

<template>
  <div class="burger-menu-component">
    <div class="button-menu">
      <button class="menu-button" @click="navigateTo('/homepage/home')" data-testid="home-button">
        <img src="/src/components/icons/navigation/house-chimney.svg" alt="Home Icon" class="icon">
        <label class="button-label">Hjem</label>
      </button>
      <button class="menu-button" @click="navigateTo('/homepage/discover')" data-testid="discover-button">
        <img src="/src/components/icons/navigation/lightbulb-on.svg" alt="Discover Icon" class="icon">
        <label class="button-label">Sparetips</label>
      </button>
      <button class="menu-button" @click="navigateTo('/homepage/milestone')" data-testid="milestone-button">
        <img src="/src/components/icons/navigation/piggy-bank.svg" alt="Milestone Icon" class="icon">
        <label class="button-label">Sparemål</label>
      </button>
      <button class="menu-button" @click="navigateTo('/homepage/challenge')" data-testid="challenge-button">
        <img src="/src/components/icons/navigation/challenge.svg" alt="Challenge Icon" class="icon">
        <label class="button-label">Utfordringer</label>
      </button>
      <button class="menu-button" @click="navigateTo('/homepage/economy')" data-testid="economy-button">
        <img src="/src/components/icons/navigation/economy.svg" alt="Economy Icon" class="icon">
        <label class="button-label">Forbruk</label>
      </button>
      <button class="menu-button" @click="navigateTo('/homepage/profile')" data-testid="profile-button">
        <img src="/src/components/icons/navigation/user.svg" alt="Profile Icon" class="icon">
        <label class="button-label">Profil</label>
      </button>
    </div>
  </div>
</template>

<style scoped>

.burger-menu-component{
  display: flex;
  flex-direction: column;

  align-items: center;
  place-items: center;

  width: 100vw;
  height: 100vh;
  min-height: 650px;
  overflow-y: scroll;

  padding: 5.0%;

  background-color: var(--color-background);
}

.button-menu{
  display: flex;
  flex-direction: column;

  align-items: center;
  place-content: center;
  justify-content: space-evenly;

  height: 100%;
  width: 100%;

  gap: 2.5%;
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


</style>