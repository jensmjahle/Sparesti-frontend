<script setup lang="ts">

import PotentialChallengeDisplay from '@/components/challenge/PotentialChallengeDisplay.vue'
import { onMounted, ref, watch } from 'vue'
import ActiveChallengeDisplay from '@/components/challenge/ActiveChallengeDisplay.vue'
import router from '@/router'
import { useTokenStore } from '@/stores/token'
import { getActiveChallenges, getInactiveChallenges } from '@/utils/challengeutils'
import CompleteChallengePopUp from '@/components/challenge/CompleteChallengePopUp.vue'

import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()

interface Challenge{
  challengeId: number,
  challengeTitle: string,
  challengeDescription: string,
  goalSum:number,
  expirationDate:string
}

const token:string = useTokenStore().jwtToken;

const activeChallenges = ref<Challenge[]>([])
const inactiveChallenges = ref<Challenge[]>([])

const SIZE = 4

const pages = ref<number>(1)
const currentPage = ref<number>(0)

const displayType = ref<boolean>(true);

const displayPopUp = ref<boolean>(false);
const completedChallenge = ref<number|any>(null)


onMounted(async () => {
  try {
    currentPage.value = 0;

    await fetchInactiveChallenges();
    await fetchActiveChallenges();
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
})

const fetchInactiveChallenges = async () => {
  try {
    const { content }  = await getInactiveChallenges(token)

    inactiveChallenges.value = []

    for (let i = 0; i < content.length; i++) {

      const date = new Date(content[i].expirationDate);

      const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      inactiveChallenges.value.push({
        challengeId: content[i].challengeId,
        challengeTitle: content[i].challengeTitle,
        challengeDescription: content[i].challengeDescription,
        goalSum: content[i].goalSum,
        expirationDate: formattedDate
      })
    }
    console.log(inactiveChallenges.value)
  } catch (error) {
    console.error('Error fetching active challenges:', error);
  }
}

const fetchActiveChallenges = async () => {
  try{
    const { content, totalPages, number } =
      await getActiveChallenges(token, currentPage.value,SIZE)

    pages.value = totalPages;
    currentPage.value = number;

    activeChallenges.value = [];

    for(let i = 0; i < content.length; i ++){
      console.log(content.data)

      const date = new Date(content[i].expirationDate);

      const formattedDate = date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      activeChallenges.value.push({
        challengeId:content[i].challengeId,
        challengeTitle:content[i].challengeTitle,
        challengeDescription:content[i].challengeDescription,
        goalSum:content[i].goalSum,
        expirationDate:formattedDate
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

const handleRequestToCompleteChallenge = (challengeId: number) => {
  displayPopUp.value = true;
  completedChallenge.value = challengeId;
}

const handleChallengeCompleted = async () => {
  await closePopUp();
  await jsConfetti.addConfetti();
}

const closePopUp = async () => {
  displayPopUp.value = false;
  await fetchActiveChallenges();
}

const displayNewChallenges = () => {
  displayType.value = false;
}

const displayActiveChallenges = () => {
  displayType.value = true;

}

const navigateTo = (path: string) => {
  router.push(path)
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

watch(currentPage, fetchActiveChallenges);

</script>

<template>
  <div class="challenge-view" :aria-disabled="displayPopUp">

    <div v-if="displayPopUp" class="popup-container">
      <CompleteChallengePopUp
        :challenge-id="completedChallenge"
        @closePopUp="closePopUp"
        @challengeCompleted="handleChallengeCompleted"
      ></CompleteChallengePopUp>
    </div>


    <h2 class="title">Dine utfordringer</h2>
    <div class="toggle-buttons">
      <button class="toggle-button" @click="displayActiveChallenges" :class="{ 'active-button': displayType}">
        <h3 class="toggle-button-title">Nye utfordringer</h3>
      </button>

      <button class="toggle-button" @click="displayNewChallenges" :class="{ 'active-button': !displayType}">
        <h3 class="toggle-button-title">Aktive utfordringer</h3>
      </button>

    </div>
    <div class="main">
      <div class="left" :class="{ 'mobile-hide': !displayType }">

        <button class="create-challenge-button" @click="navigateTo('/homepage/create-challenge')">
          <h2 class="create-challenge-button-title">Ny personlig utfordring + </h2>
        </button>
        <div class="challenge-recommendations">
          <PotentialChallengeDisplay
            class="potential-challenge"
            v-for="(potentialChallenge, index) in inactiveChallenges"
            :key="index"
            :challenge="potentialChallenge"
            @challengeAccepted="handleChallengeAccepted"
            @challengeDeclined="handleChallengeDeclined"
          ></PotentialChallengeDisplay>

          <h4 class="challenge-placeholder" v-if="inactiveChallenges.length == 0">
            Ojda, her gikk det unna.<br>
            Vi har for øyeblikket ingen flere forslag til utfordringer. <br>
            Lag din egen personlige utfordring eller kom tilbake senere! <br>
            Nye utfordringer blir generert med gjevne mellomrom.
          </h4>
        </div>

      </div>

      <div class="right" :class="{ 'mobile-hide': displayType }">
        <h2 class="active-challenges-title">Aktive utfordringer</h2>
        <div class="active-challenge-box">
          <div class="active-challenges">
            <ActiveChallengeDisplay
              class="active-challenge"
              v-for="(activeChallenge, index) in activeChallenges"
              :key="index"
              :challenge="activeChallenge"
              @challengeCompleted="handleRequestToCompleteChallenge(activeChallenge.challengeId)"
            ></ActiveChallengeDisplay>
            <h4 class="challenge-placeholder" id="active-challenge-placeholder" v-if="activeChallenges.length == 0">
              Du har ingen aktive utfordringer.<br>
              Lag din egen utfordring eller aksepter våre tilpassede forslag!
              Aktive utfordringer vil vises i denne boksen.
            </h4>
          </div>
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

  gap: 2.5%;

  height: 100%;
  width: 100%;
}

.title{
  color: var(--color-heading);
}

.toggle-buttons {
  display: none;
}

.main{
  display: flex;
  flex-direction: row;

  min-height: 100%;
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

  height: 100%;
  width: 100%;
  gap: 2.5%;
}

.challenge-placeholder{
  text-align: center;
}

#active-challenge-placeholder{
  color: var(--color-headerText);
}
.potential-challenge{
  border-radius: 20px;
  border: 2px solid var(--color-border);
  box-shadow: 0 4px 4px var(--color-shadow);

  height: calc(100%/3);
  width: 100%;
}

.potential-challenge:hover{
  transform: scale(1.02);
}

.right{
  display: flex;
  flex-direction: column;
  place-content: space-evenly;

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

.active-challenge-box{
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;

  padding: 5.0%;

  place-content: space-between;
}

.active-challenges{
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap:2.5%
}

.active-challenge{
  border-radius: 20px;
  border: 2px solid var(--color-border);
  background-color: var(--color-background-white);

  min-height: calc(calc(100% - 2.5*4%)/4);
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
  color: var(--color-heading);
  font-weight: bold;
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


@media only screen and (max-width: 1000px){
  .main{
    display: flex;
    flex-direction: column;

    min-height: 100%;
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

  .challenge-recommendations{
    min-height: 100%;
  }

}

</style>