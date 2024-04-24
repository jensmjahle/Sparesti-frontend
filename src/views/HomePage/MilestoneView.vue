<script setup lang="ts">

import {ref} from "vue";
import router from "@/router";
import CompletedMilestoneDisplay from '@/components/milestone/CompletedMilestoneDisplay.vue'
import ActiveMilestoneDisplay from '@/components/milestone/ActiveMilestoneDisplay.vue'


const activeMilestonesTestData = [
  {
    id: 1,
    title: 'Spar 1000kr!',
    description: 'Spar 1000kr i løpet av denne måneden.'
  },
  {
    id: 2,
    title: 'Spar 500kr!',
    description: 'Spar 500kr i løpet av denne måneden.'
  },
  {
    id: 3,
    title: 'Spar 200kr!',
    description: 'Spar 200kr i løpet av denne måneden.'
  },
]

const completedMilestonesTestData = [
  {
    id: 4,
    title: 'Spar 100kr!',
    description: 'Spar 100kr i løpet av denne måneden.'
  },
  {
    id: 5,
    title: 'Spar 50kr!',
    description: 'Spar 50kr i løpet av denne måneden.'
  },
  {
    id: 6,
    title: 'Spar 20kr!',
    description: 'Spar 20kr i løpet av denne måneden.'
  },
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
}

</script>

<template>
  <div class="milestone-view">
    <h2 class="title">Dine Sparemål</h2>
    <div class="main">
      <div class="left">
        <button class="create-milestone-button" @click="navigateTo('/homepage/create-milestone')">
          <h2 class="create-milestone-button-title">Personlig sparemål + </h2>
        </button>
        <div class="active-milestones">
          <ActiveMilestoneDisplay
            class="active-milestone"
            v-for="(activeMilestone, index) in activeMilestones"
            :key="index"
            :id="activeMilestone.id"
            :title="activeMilestone.title"
            :description="activeMilestone.description"
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
  padding: 5%;
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
  transform: scale(1.05);
}

.page-numbers button:active {
  background-color: var(--color-pageination-button-click);
}

.chosen{
  background-color: black;
}



</style>