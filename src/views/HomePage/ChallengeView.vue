<script setup lang="ts">
import { ref } from 'vue'
import ActiveChallengesList from '@/components/challenge/ActiveChallengesList.vue'
import InactiveChallengeList from '@/components/challenge/InactiveChallengeList.vue'
import router from '@/router'
import MilestoneHelpPopUp from '@/components/popups/help/MilestoneHelpPopUp.vue'
import ChallengeHelpPopUp from '@/components/popups/help/ChallengeHelpPopUp.vue'

const displayType = ref<boolean>(true)
const displayHelpPopUp = ref<boolean>(false)

/**
 * Sets the display type to show new challenges by setting `displayType.value` to false.
 * @returns {void} This function does not return a value.
 */
const displayNewChallenges = () => {
  displayType.value = false
}

/**
 * Sets the display type to show active challenges by setting `displayType.value` to true.
 * @returns {void} This function does not return a value.
 */
const displayActiveChallenges = () => {
  displayType.value = true
}

/**
 * Navigates to the specified path using Vue Router.
 * @param {string} path - The path to navigate to.
 * @returns {void} This function does not return a value.
 */
const navigateTo = (path: string) => {
  router.push(path)
}

/**
 * Opens the help pop-up by setting the `displayHelpPopUp.value` to true.
 * @returns {void} This function does not return a value.
 */
const openHelpPopUp = () => {
  displayHelpPopUp.value = true
}

/**
 * Closes the help pop-up by setting the `displayHelpPopUp.value` to false.
 * @returns {Promise<void>} A promise that resolves after closing the help pop-up.
 */
const closeHelpPopUp = async () => {
  displayHelpPopUp.value = false
}
</script>

<template>
  <div class="home-view">
    <div class="header">
      <h2 class="title">Dine utfordringer!</h2>
      <img
        src="/src/components/icons/navigation/help.svg"
        alt="hjelp"
        @click="openHelpPopUp"
        tabindex="0"
        @keyup.enter="openHelpPopUp"
        class="help-icon"
      />
      <div v-if="displayHelpPopUp" class="popup-container">
        <ChallengeHelpPopUp @closePopUp="closeHelpPopUp"></ChallengeHelpPopUp>
      </div>
    </div>
    <div class="toggle-buttons">
      <button
        class="toggle-button"
        @click="displayActiveChallenges"
        :class="{ 'active-button': displayType }"
      >
        <h3 class="toggle-button-title">Nye utfordringer</h3>
      </button>
      <button
        class="toggle-button"
        @click="displayNewChallenges"
        :class="{ 'active-button': !displayType }"
      >
        <h3 class="toggle-button-title">Aktive utfordringer</h3>
      </button>
    </div>
    <div class="main">
      <div class="left" :class="{ 'mobile-hide': !displayType }">
        <button class="create-challenge-button" @click="navigateTo('/homepage/create-challenge')">
          <h2 class="display-help-button">Ny personlig utfordring +</h2>
        </button>
        <InactiveChallengeList></InactiveChallengeList>
      </div>
      <div class="right" :class="{ 'mobile-hide': displayType }">
        <h2 class="active-challenges-title">Aktive utfordringer</h2>
        <ActiveChallengesList></ActiveChallengesList>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;

  gap: 2.5%;
}

.header {
  display: flex;
  flex-direction: row;
  place-content: space-between;
  max-height: 6.5%;
}

.help-icon:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.popup-container {
  position: fixed; /* Change to fixed to cover the entire viewport */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: rgba(64, 64, 64, 0.5);

  align-items: center;
  z-index: 1000; /* Adjust z-index as needed */
}

.title {
  color: var(--color-heading);
}

.toggle-buttons {
  display: none;
}

.main {
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 120%;
  padding-bottom: 1.5%;
  gap: 2.5%;
}

.left {
  display: flex;
  flex-direction: column;
  width: 60%;
  min-height: 100%;
  gap: 2.5%;
}

.create-challenge-button {
  border-radius: 20px;
  background-color: var(--color-confirm-button);
  border: 2px solid var(--color-border);
  color: var(--color-button-text);
  min-height: 10%;
}

.create-challenge-button:active {
  background-color: var(--color-confirm-button-click);
}

.create-challenge-button:hover {
  transform: scale(1.02);
}

.display-help-button {
  font-weight: bold;
}

.right {
  display: flex;
  flex-direction: column;
  place-content: space-between;

  border-radius: 20px;
  border: 2px solid var(--color-border);
  box-shadow: 0 4px 4px var(--color-shadow);
  background-color: var(--color-heading);

  min-height: 100%;
  width: 40%;
}

.active-challenges-title {
  color: var(--color-headerText);
  text-align: center;
  font-weight: bold;
}

@media only screen and (max-width: 1000px) {
  .main {
    display: flex;
    flex-direction: column;

    min-height: 115%;
    width: 100%;
  }

  .toggle-buttons {
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: 7.5%;
    place-content: space-between;
  }

  .toggle-button {
    width: 49.5%;
    border-radius: 20px;
    border: none;
    background-color: var(--color-confirm-button);
  }

  .toggle-button:hover {
    transform: scale(1.02);
  }

  .toggle-button-title {
    font-weight: bold;
    color: var(--color-headerText);
  }

  .active-button {
    background-color: var(--color-confirm-button-click);
  }

  .mobile-hide {
    display: none;
  }

  .left {
    width: 100%;
    height: 100%;
  }

  .right {
    min-height: 110%;
    width: 100%;
  }
}

@media (prefers-color-scheme: dark) {
  .help-icon {
    filter: invert(1);
  }
}
</style>
