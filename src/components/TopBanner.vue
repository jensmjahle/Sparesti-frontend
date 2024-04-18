<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter();

function navigateToStartingPage(){
  router.push('/')
}
</script>

<template>
  <div id = TopBanner>
    <h2 id = "AppName">Sparesti<img src="../assets/pig_394778.png" alt = "logo" id = "logo" @click="navigateToStartingPage()"></h2>
  </div>
</template>

<style scoped>

#TopBanner{
  background-color: var(--color-header);
  min-width: 100%;
}

#AppName{
  color: var(--color-buttonText);
  padding: 2vh;
  align-items: center;
  display: flex;
  cursor: pointer;
}

#logo{
  max-width: 7vh;
  max-height: 7vh;
}
</style>