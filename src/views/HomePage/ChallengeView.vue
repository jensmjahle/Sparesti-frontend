<script setup lang="ts">

import PotentialChallengeDisplay from '@/components/challenge/PotentialChallengeDisplay.vue'
import { ref } from 'vue'
import ActiveChallengeDisplay from '@/components/challenge/ActiveChallengeDisplay.vue'
import router from '@/router'

const challengeRecomendationsTestData = [
  {
    id:1,
    title:'Gå til skolen!',
    description:'Spar 46kr hver dag du går isteden for å ta buss til skolen denne uken.'
  },
  { id: 2,
    title:'Unngå kjøp av kaffe!',
    description:'Spar 59kr for å unngå kjøp av kaffe i dag.'
  },
  { id: 3,
    title:'Bruk handlenett på butikken!',
    description:'Spar 5kr for å burke handlenett på butikken.'
  },
];

const activeChallengesTestData = [
  {
    id: 4,
    title:'Spis middag hjemme!',
    description:'Spar 200kr for å spise middag hjemme i dag.'
  },
  { id: 5,
    title:'Kjøp brukt isteden for nytt!',
    description:'Spar 250kr for å kun kjøpe brukt denne uken.'
  },
  { id: 6,
    title: 'Ta med lunsj hjemmefra!',
    description:'Spar 100kr for å ta med lunsj hjemmefra i dag.'
  },
  { id: 7,
    title: 'Unngå netthandel!',
    description:'Spar 500kr for å unngå netthandel denne måneden.'
  },
]

const activeChallenges = ref<Challenge[] | null>(activeChallengesTestData)

const challengeRecommendations = ref<Challenge[] | null>(challengeRecomendationsTestData)

const pages = ref<number>(1)
const currentPage = ref<number>(0)
const navigateTo = (path: string) => {
  router.push(path)
}

const previousPage = () => {}
const goToPage = (pageNumber:number) => {}

const nextPage = () =>{}

interface Challenge{
  id: number;
  title: string;
  description: string
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
            v-for="(potentialChallenge, index) in challengeRecommendations"
            :key="index"
            :id="potentialChallenge.id"
            :title="potentialChallenge.title"
            :description="potentialChallenge.description"
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
            :id="activeChallenge.id"
            :title="activeChallenge.title"
            :description="activeChallenge.description"
          ></ActiveChallengeDisplay>
          <div class="pagination">
            <button @click="previousPage" :disabled="currentPage === 0">Forige side</button>
            <div  v-if="pages>0" class="page-numbers">
              <button
                v-for="pageNumber in pages"
                :key="pageNumber-2"
                @click="goToPage(pageNumber-1)"
                :class="{ chosen: pageNumber-1 === currentPage }"
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