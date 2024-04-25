<script setup lang="ts">

import PotentialChallengeDisplay from '@/components/challenge/PotentialChallengeDisplay.vue'
import { onMounted, ref } from 'vue'
import ActiveChallengeDisplay from '@/components/challenge/ActiveChallengeDisplay.vue'
import router from '@/router'
import { useTokenStore } from '@/stores/token'
import { getActiveChallenges, getInactiveChallenges } from '@/utils/challengeutils'

interface Challenge{
  challengeId: number;
  challengeTitle: string;
  challengeDescription: string
}

const token:string = useTokenStore().jwtToken;

const activeChallenges = ref<Challenge[]>([])
const inactiveChallenges = ref<Challenge[]>([])

const pages = ref<number>(1)
const currentPage = ref<number>(0)


onMounted(async () => {
  try {
    await fetchInactiveChallenges();
    await fetchActiveChallenges();
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
})

const fetchInactiveChallenges = async () => {
  try {
    const response = await getInactiveChallenges(token)
    inactiveChallenges.value = []
    for (let i = 0; i < response.length; i++) {
      inactiveChallenges.value.push({
        challengeId: response[i].challengeId,
        challengeTitle: response[i].challengeTitle,
        challengeDescription: response[i].challengeDescription
      })
    }

    console.log(inactiveChallenges.value)
  } catch (error) {
    console.error('Error fetching active challenges:', error);
  }
}

const fetchActiveChallenges = async () => {
  try{
    const response = await getActiveChallenges(token)
    console.log(response)
    activeChallenges.value = [];
    for(let i = 0; i < response.length; i ++){
      console.log(response.data)
      activeChallenges.value.push({
        challengeId:response[i].challengeId,
        challengeTitle:response[i].challengeTitle,
        challengeDescription:response[i].challengeDescription
      })
    }
    console.log(activeChallenges.value)
  } catch (error){
    console.error('Error fetching inactive challenges:', error);
  }
}

// Function to handle the emitted challengeAccepted event
const handleChallengeAccepted = async () => {
  console.log('handling it')
  await fetchActiveChallenges();
  await fetchInactiveChallenges();
}

// Function to handle the emitted challengeDeclined event
const handleChallengeDeclined = async () => {
  await fetchInactiveChallenges();
}

const handleChallengeCompleted = async () => {
  await fetchActiveChallenges();
}

const previousPage = () => {}
const goToPage = (pageNumber:number) => {
  currentPage.value = pageNumber;
}

const nextPage = () =>{}

const navigateTo = (path: string) => {
  router.push(path)
}

</script>

<template>
  <div class="challenge-view">
    <h2 class="title">Dine utfordringer</h2>
    <div class="main">
      <div class="left">
        <button class="create-challenge-button" @click="navigateTo('/homepage/create-challenge')">
          <h2 class="create-challenge-button-title">Personlig utfordring + </h2>
        </button>
        <div class="challenge-recommendations">
          <PotentialChallengeDisplay
            class="potential-challenge"
            v-for="(potentialChallenge, index) in inactiveChallenges"
            :key="index"
            :challengeId="potentialChallenge.challengeId"
            :challengeTitle="potentialChallenge.challengeTitle"
            :challengeDescription="potentialChallenge.challengeDescription"
            @challengeAccepted="handleChallengeAccepted"
            @challengeDeclined="handleChallengeDeclined"
          ></PotentialChallengeDisplay>
        </div>
      </div>

      <div class="right">

        <h2 class="active-challenges-title">Aktive utfordringer</h2>
        <div class="active-challenges">
          <ActiveChallengeDisplay
            class="active-challenge"
            v-for="(activeChallenge, index) in activeChallenges"
            :key="index"
            :challengeId="activeChallenge.challengeId"
            :challengeTitle="activeChallenge.challengeTitle"
            :challengeDescription="activeChallenge.challengeDescription"
            @challengeCompleted="handleChallengeCompleted"
          ></ActiveChallengeDisplay>
          <div class="pagination">
            <button @click="previousPage" :disabled="currentPage === 0">Forige side</button>
            <div  v-if="pages>0" class="page-numbers">
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
      </div>
    </div>
  </div>
</template>

<style scoped>
.challenge-view{
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;
}

.title{
  color: var(--color-heading);
}

.main{
  display: flex;
  flex-direction: row;

  height: 100%;
  width: 100%;
  gap: 2.5%;
}

.left{
  display: flex;
  flex-direction: column;
  width: 60%;
  gap: 2.5%;
}

.create-challenge-button{
  border-radius: 20px;
  background-color: var(--color-confirm-button);
  border: 2px solid var(--color-border);
  color: var(--color-button-text);
  min-height: 12%;
}

.create-challenge-button:active{
  background-color: var(--color-confirm-button-click);
}

.create-challenge-button:hover{
  transform: scale(1.02);
}

.create-challenge-button-title{
  font-weight: bold;
}

.challenge-recommendations{
  display: flex;
  flex-direction: column;
  place-content: space-between;

  height: 100%;
  width: 100%;
  gap: 2.5%;
}

.potential-challenge{
  border-radius: 20px;
  border: 2px solid var(--color-border);
  box-shadow: 0 4px 4px var(--color-shadow);

  min-height: 30%;
  width: 100%;
}

.potential-challenge:hover{
  transform: scale(1.02);
}

.right{
  display: flex;
  flex-direction: column;
  border: 2px solid var(--color-border);
  border-radius: 20px;
  box-shadow: 0 4px 4px var(--color-shadow);
  background-color: var(--color-heading);
  height: 100%;
  width: 40%;
}

.active-challenges-title{
  color: var(--color-headerText);
  text-align: center;
  font-weight: bold;
}

.active-challenges{
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 5.0%;
  gap:2.5%
}

.active-challenge{
  border-radius: 20px;
  border: 2px solid var(--color-border);
  background-color: var(--color-background-white);

  min-height: calc(100%/4.8);
  width: 100%;
}

.active-challenge:hover{
  transform: scale(1.05);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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
  background-color: black;
}

</style>