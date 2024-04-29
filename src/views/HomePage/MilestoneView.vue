<script setup lang="ts">
import router from "@/router";
import ActiveMilestonesList from '@/components/milestone/ActiveMilestonesList.vue'
import MilestoneLogList from '@/components/milestone/MilestoneLogList.vue'
import { ref } from 'vue'
import HomeHelpPopUp from '@/components/popups/help/HomeHelpPopUp.vue'
import MilestoneHelpPopUp from '@/components/popups/help/MilestoneHelpPopUp.vue'

const displayType = ref<boolean>(true)
const displayHelpPopUp = ref<boolean>(false)

const displayNewChallenges = () => {
  displayType.value = false;
}

const displayActiveChallenges = () => {
  displayType.value = true;
}
const navigateTo = (path: string) => {
  router.push(path)
}

const openHelpPopUp = () => {
  displayHelpPopUp.value = true;
}
const closeHelpPopUp = () => {
  displayHelpPopUp.value = false;
  console.log(displayHelpPopUp);
}
</script>

<template>
  <div class="milestone-view">
    <div class="header">
      <h2 class="title">Dine sparemål!</h2>
      <img
        src="/src/components/icons/navigation/help.svg"
        alt="hjelp"
        @click="openHelpPopUp"
        class="help-icon">
      <div v-if="displayHelpPopUp" class="popup-container">
        <MilestoneHelpPopUp
          @closePopUp="closeHelpPopUp"
        ></MilestoneHelpPopUp>
      </div>
    </div>
    <div class="toggle-buttons">
      <button class="toggle-button" @click="displayActiveChallenges" :class="{ 'active-button': displayType}">
        <h3 class="toggle-button-title">Aktive sparemål</h3>
      </button>
      <button class="toggle-button" @click="displayNewChallenges" :class="{ 'active-button': !displayType}">
        <h3 class="toggle-button-title">Fullførte sparemål</h3>
      </button>
    </div>
    <div class="main">
      <div class="left" :class="{ 'mobile-hide': !displayType }">
        <button class="create-milestone-button" @click="navigateTo('/homepage/create-milestone')">
          <h2 class="create-milestone-button-title">Lag nytt sparemål + </h2>
        </button>
        <ActiveMilestonesList class="active-milestones"></ActiveMilestonesList>
      </div>
      <div class="right" :class="{ 'mobile-hide': displayType }">
        <h2 class="completed-milestones-title">Sparemål historikk</h2>
        <MilestoneLogList></MilestoneLogList>
      </div>
    </div>
  </div>
</template>

<style scoped>
.milestone-view{
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;

  gap: 2.5%;
}
.header{
  display: flex;
  flex-direction: row;
  place-content: space-between;
  max-height: 6.5%;
}

.help-icon:hover{
  transform: scale(1.05);
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

.title{
  color: var(--color-heading);
}

.toggle-buttons{
  display: none;
}

.main{
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 120%;
  padding-bottom: 1.5%;
  gap: 2.5%;
}

.left{
  display: flex;
  flex-direction: column;
  width: 60%;
  min-height: 100%;
  gap: 2.5%;
}

.create-milestone-button{
  border-radius: 20px;
  background-color: var(--color-confirm-button);
  border: 2px solid var(--color-border);
  color: var(--color-button-text);
  min-height: 12%;
}

.create-milestone-button:active{
  background-color: var(--color-confirm-button-click);
}

.create-milestone-button:hover{
  transform: scale(1.02);
}

.create-milestone-button-title{
  font-weight: bold;
}

.right{
  display: flex;
  flex-direction: column;
  place-content: space-between;

  border-radius: 20px;
  border: 2px solid var(--color-border);
  box-shadow: 0 4px 4px var(--color-shadow);
  background-color: var(--color-heading);

  height: 100%;
  width: 40%;
}

.completed-milestones-title{
  color: var(--color-headerText);
  text-align: center;
  font-weight: bold;
}
@media only screen and (max-width: 1000px){
  .main{
    display: flex;
    flex-direction: column;

    min-height: 150%;
    width: 100%;

    padding-top: 1.0%;
    padding-bottom: 1.0%;
  }

  .toggle-buttons{
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: 7.5%;
    place-content: space-between;
  }

  .toggle-button{
    width: 49.5%;
    border-radius: 20px;
    border: none;
    background-color: var(--color-confirm-button);
  }

  .toggle-button:hover{
    transform: scale(1.02);
  }

  .toggle-button-title{
    font-weight: bold;
    color: var(--color-headerText);
  }

  .active-button{
    background-color: var(--color-confirm-button-click);
  }

  .mobile-hide{
    display: none;
  }

  .left{
    width: 100%;
    height: 100%;
  }

  .right{
    min-height: 110%;
    width: 100%;
  }

}

@media (prefers-color-scheme: dark) {
  .help-icon{
    filter: invert(1);
  }
}

</style>