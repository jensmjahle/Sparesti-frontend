<script setup lang="ts">
import { useRouter } from 'vue-router'

/**
 * Initiates the router
 */
const router = useRouter()

/**
 * Navigates the user to the starting page
 */
function navigateToStartingPage() {
  router.push('/')
}
</script>

<template>
  <div id="TopBanner">
    <div id="banner-item" tabindex="0" @keyup.enter="navigateToStartingPage">
      <h2 id="AppName" @click="navigateToStartingPage">
        Sparesti<img src="../assets/png/pig_394778.png" alt="logo" id="logo" />
      </h2>
    </div>
  </div>
</template>

<style scoped>
#TopBanner {
  background-color: var(--color-header);
  min-width: 100%;
}

#banner-item {
  width: fit-content;
  height: fit-content;
}

#AppName {
  color: var(--color-buttonText);
  padding: 2vh;
  align-items: center;
  display: flex;
  cursor: pointer;
}

#AppName:hover {
  transform: scale(1.05);
}

#logo {
  max-width: 7vh;
  max-height: 7vh;
}
</style>
