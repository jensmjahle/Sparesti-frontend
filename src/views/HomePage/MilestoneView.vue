<script setup lang="ts">

import {ref} from "vue";
import router from "@/router";
import CompletedMilestoneDisplay from '@/components/milestone/CompletedMilestoneDisplay.vue'
import ActiveMilestoneDisplay from '@/components/milestone/ActiveMilestoneDisplay.vue'


const activeMilestonesTestData = [
  {
    id: 1,
    title: 'Spar 1000kr!',
    description: 'Spar 1000kr i løpet av denne måneden.',
    goalSum: 1000,
    currentSum: 500,
    deadline: new Date('2021-12-24'),
    startDate: new Date('2021-12-01'),
    image: 'https://www.tlctranslation.com/wp-content/uploads/2016/05/translation-makes-you-money-1024x602-1.jpg'
  },
  {
    id: 2,
    title: 'Spar 500kr!',
    description: 'Spar 500kr i løpet av denne måneden.',
    goalSum: 500,
    currentSum: 500,
    deadline: new Date('2021-12-24'),
    startDate: new Date('2021-12-01'),
    image: 'https://www.tlctranslation.com/wp-content/uploads/2016/05/translation-makes-you-money-1024x602-1.jpg'

  },
  {
    id: 3,
    title: 'Spar 200kr!',
    description: 'Spar 200kr i løpet av denne måneden.',
    goalSum: 200,
    currentSum: 200,
    deadline: new Date('2021-12-24'),
    startDate: new Date('2021-12-01'),
    image: 'https://www.tlctranslation.com/wp-content/uploads/2016/05/translation-makes-you-money-1024x602-1.jpg'

  },
  {
    id: 4,
    title: 'Spar 100kr!',
    description: 'Spar 100kr i løpet av denne måneden.',
    goalSum: 100,
    currentSum: 100,
    deadline: new Date('2021-12-24'),
    startDate: new Date('2021-12-01'),
    image: 'https://www.tlctranslation.com/wp-content/uploads/2016/05/translation-makes-you-money-1024x602-1.jpg'

  }
]

const completedMilestonesTestData = [
  {
    id: 4,
    title: 'Spar 100kr!',
    description: 'Spar 100kr i løpet av denne måneden.',
    goalSum: 100,
    currentSum: 100,
    deadline: new Date('2021-12-24'),
    startDate: new Date('2021-12-01'),
    image: 'https://www.tlctranslation.com/wp-content/uploads/2016/05/translation-makes-you-money-1024x602-1.jpg'

  },

  {
    id: 8,
    title: 'Spar 5kr!',
    description: 'Spar 5kr i løpet av denne måneden.',
    goalSum: 5,
    currentSum: 5,
    deadline: new Date('2021-12-24'),
    startDate: new Date('2021-12-01'),
    image: 'https://www.tlctranslation.com/wp-content/uploads/2016/05/translation-makes-you-money-1024x602-1.jpg'
  },
  {
    id: 9,
    title: 'Spar 5kr!',
    description: 'Spar 5kr i løpet av denne måneden.',
    goalSum: 5,
    currentSum: 5,
    deadline: new Date('2021-12-24'),
    startDate: new Date('2021-12-01'),
    image: 'https://www.tlctranslation.com/wp-content/uploads/2016/05/translation-makes-you-money-1024x602-1.jpg'
  }
]

const activeMilestones = ref<Milestone[] | null>(activeMilestonesTestData)
const completedMilestones = ref<Milestone[] | null>(completedMilestonesTestData)

const pages = ref<number>(1)
const currentPage = ref<number>(0)
const navigateTo = (path: string) => {
  router.push(path)
}

const previousPage = () => {}
const goToPage = (pageNumber:number) => {}

const nextPage = () =>{}

interface Milestone{
  id: number;
  title: string;
  description: string
  goalSum: number;
  currentSum: number;
  deadline: Date;
  startDate: Date;
  image: string;
}



</script>

<template>
  <div class="milestone-view">
    <h2 class="title">Dine Sparemål</h2>
    <div class="main">
      <div class="left">
        <button class="create-milestone-button" @click="navigateTo('/homepage/create-milestone')">
          <h2 class="create-milestone-button-title">Lag nytt sparemål + </h2>
        </button>
        <div class="active-milestones">
          <ActiveMilestoneDisplay
            class="active-milestone"
            v-for="(activeMilestone, index) in activeMilestones"
            :key="index"
            :id="activeMilestone.id"
            :title="activeMilestone.title"
            :description="activeMilestone.description"
            :goalSum="activeMilestone.goalSum"
            :currentSum="activeMilestone.currentSum"
            :deadline="activeMilestone.deadline"
            :startDate="activeMilestone.startDate"
            :image="activeMilestone.image"
          ></ActiveMilestoneDisplay>
        </div>
      </div>

      <div class="right">

        <h2 class="completed-milestones-title">Sparemål historikk</h2>
        <div class="completed-milestones">
          <CompletedMilestoneDisplay
            class="completed-milestone"
            v-for="(completedMilestone, index) in completedMilestones"
            :key="index"
            :id="completedMilestone.id"
            :title="completedMilestone.title"
            :description="completedMilestone.description"
            :current-sum="completedMilestone.currentSum"
            :goal-sum="completedMilestone.goalSum"
            :deadline="completedMilestone.deadline"
            :start-date="completedMilestone.startDate"
            :image="completedMilestone.image"
          ></CompletedMilestoneDisplay>
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
.milestone-view{
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

.active-milestones{
  display: flex;
  flex-direction: column;
  place-content: space-between;

  height: 100%;
  width: 100%;
  gap: 2.5%;
}

.active-milestone{
  border-radius: 20px;
  border: 2px solid var(--color-border);
  box-shadow: 0 4px 4px var(--color-shadow);

  min-height: 30%;
  width: 100%;
}

.active-milestone:hover{
  transform: scale(1.02);
  transition: 0.3s;
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

.completed-milestones-title{
  color: var(--color-headerText);
  text-align: center;
  font-weight: bold;
}

.completed-milestones{
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 5.0%;
  gap: 2.5%;
}

.completed-milestone{
  border-radius: 20px;
  border: 2px solid var(--color-border);
  background-color: var(--color-background-white);

  min-height: calc(100%/4.8);
  width: 100%;
}

.completed-milestone:hover{
  transform: scale(1.05);
  transition: 0.3s;
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
  transition: 0.3s;
  transform: scale(1.05);
}

.pagination button:active{
  background-color: var(--color-pageination-button-click);
}

.pagination button:disabled {
  color: var( --color-inactive-button-text);
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
  transition: 0.3s;
  transform: scale(1.05);
}

.page-numbers button:active {
  background-color: var(--color-pageination-button-click);
}

.chosen{
  background-color: black;
}



</style>