<script setup lang="ts">

import ActiveChallengeDisplay from '@/components/challenge/ActiveChallengeDisplay.vue'
import { onMounted, ref, watch } from 'vue'
import { getActiveChallenges } from '@/utils/challengeutils'
import { useTokenStore } from '@/stores/token'
import JSConfetti from 'js-confetti'
import CompleteChallengePopUp from '@/components/popups/CompleteChallengePopUp.vue'
import DeleteChallengePopUp from '@/components/popups/DeleteChallengePopUp.vue'
import eventBus from '@/components/service/eventBus.js'; // Import the event bus instance

interface Challenge{
  challengeId: number,
  challengeTitle: string,
  challengeDescription: string,
  goalSum:number,
  expirationDate:string
}

const token:string = useTokenStore().jwtToken;

const jsConfetti = new JSConfetti()

const displayPopUp = ref<boolean>(false);
const displayDeletePopUp = ref<boolean>(false);

const activeChallenges = ref<Challenge[]>([])

const challengeToBeCompleted = ref<number|any>(null)
const challengeToBeDeleted = ref<number|any>(null)

const expandedChallengeId = ref<number>(-1);

const SIZE = 3
const pages = ref<number>(1)
const currentPage = ref<number>(0)

onMounted(async () => {
  try {
    await fetchActiveChallenges();
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
})

const fetchActiveChallenges = async () => {
  try{
    const { content, totalPages, number } = await getActiveChallenges(token, currentPage.value,SIZE)

    pages.value = totalPages;
    currentPage.value = number;
    activeChallenges.value = content;

  } catch (error){
    console.error('Error fetching inactive challenges:', error);
  }
}

const handleRequestToCompleteChallenge = (challengeId: number) => {
  challengeToBeCompleted.value = challengeId;
  displayPopUp.value = true;
}

const handleRequestToDeleteChallenge = async (challengeId: number) => {
  challengeToBeDeleted.value = challengeId;
  displayDeletePopUp.value = true;
}
const closePopUp = async () => {
  displayPopUp.value = false;
}

const closeDeletePopUp = async () => {
  displayDeletePopUp.value = false;
}

const handleChallengeCompleted = async () => {
  eventBus.emit('updateMilestones');
  await closePopUp();
  await jsConfetti.addConfetti();
  await fetchActiveChallenges();
}

const handleChallengeDeleted = async () => {
  await closeDeletePopUp();
  await fetchActiveChallenges();
}

const previousPage = () => {
  currentPage.value --
}
const goToPage = (pageNumber:number) => {
  currentPage.value = pageNumber;
}

const nextPage = () =>{
  currentPage.value ++;
}

const toggleMilestoneHeight = (id: number) => {
  if(expandedChallengeId.value == id){
    expandedChallengeId.value = -1;
  } else {
    expandedChallengeId.value = id;
  }
};

eventBus.on('updateChallenges', () => {
  fetchActiveChallenges();
});

watch(currentPage, fetchActiveChallenges);

</script>

<template>
  <div v-if="displayPopUp" class="popup-container">
    <CompleteChallengePopUp
      :challenge-id="challengeToBeCompleted"
      @closePopUp="closePopUp"
      @challengeCompleted="handleChallengeCompleted"
    ></CompleteChallengePopUp>
  </div>

  <div v-if="displayDeletePopUp" class="popup-container">
    <DeleteChallengePopUp
      :challenge-id="challengeToBeDeleted"
      @closeDeletePopUp="closeDeletePopUp"
      @challengeDeleted="handleChallengeDeleted"
    ></DeleteChallengePopUp>
  </div>

  <div class="active-challenge-component">
    <div class="active-challenges">
      <ActiveChallengeDisplay
        class="active-challenge"
        v-for="(activeChallenge, index) in activeChallenges"
        :class="{'expanded': expandedChallengeId == activeChallenge.challengeId}"
        :key="index"
        :challenge="activeChallenge"
        :expanded="expandedChallengeId == activeChallenge.challengeId"
        @challengeCompleted="handleRequestToCompleteChallenge(activeChallenge.challengeId)"
        @challengeDeleted ="handleRequestToDeleteChallenge(activeChallenge.challengeId)"
        @click="toggleMilestoneHeight(activeChallenge.challengeId)"
      ></ActiveChallengeDisplay>
      <h4 class="challenge-placeholder" id="active-challenge-placeholder" v-if="activeChallenges.length == 0">
        Du har ingen aktive utfordringer.<br>
        Lag din egen utfordring eller aksepter våre tilpassede forslag!
        Aktive utfordringer vil vises i denne boksen.
      </h4>
    </div>

    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 0">Forige side</button>
      <div  v-if="pages>1" class="page-numbers">
        <button
          v-for="pageNumber in pages"
          :key="pageNumber-2"
          :class="{ chosen: pageNumber-1 === currentPage }"
          @click="goToPage(pageNumber-1)"
        >{{ pageNumber}}</button>
      </div>
      <button @click="nextPage" :disabled="currentPage === pages - 1 || pages === 0">Neste side</button>
    </div>
  </div>

</template>

<style scoped>

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

.active-challenge-component{
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 5.0%;
  gap: 2.5%;
}

.active-challenges{
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 100%;
  gap:2.5%
}

.active-challenge{
  border-radius: 20px;
  border: 2px solid var(--color-border);
  background-color: var(--color-background-white);

  height: calc(calc(100% - 2.5*2%)/3);
  width: 100%;
}

.active-challenge:hover{
  transform: scale(1.02);
  cursor: pointer;
}

.expanded{
  height: calc(calc(calc(100% - 2.5*2%)/3)*1.5);
}

#active-challenge-placeholder{
  color: var(--color-headerText);
}

.challenge-placeholder{
  text-align: center;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  flex: 1;
}

.pagination button {
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  border-radius: 5px;
  background-color: var(--color-pageination-button);
}

.pagination button:hover {
  transform: scale(1.05);
}

.pagination button:active{
  background-color: var(--color-pageination-button-click);
}

.pagination button:disabled {
  color:  var(--color-inactive-button-text);
  cursor: not-allowed;
  transform: none;
  background-color: var(--color-pageination-button) ;
}

.page-numbers {
  display: flex;
}

.page-numbers button {
  border: 1px solid var(--color-border);
  border-radius: 5px;
  background-color: var(--color-pageination-button);
}

.page-numbers button:hover {
  transform: scale(1.05);
}

.page-numbers button:active {
  background-color: var(--color-pageination-button-click);
}

.chosen{
  color: var(--color-heading);
  font-weight: bold;
}

</style>