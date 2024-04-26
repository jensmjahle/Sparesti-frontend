<script setup lang="ts">

import {onMounted, ref} from "vue";
import router from "@/router";
import CompletedMilestoneDisplay from '@/components/milestone/CompletedMilestoneDisplay.vue'
import ActiveMilestoneDisplay from '@/components/milestone/ActiveMilestoneDisplay.vue'
import {getAllMilestoneLogs, getAllMilestones} from "@/utils/MilestoneUtils";
import {useTokenStore} from "@/stores/token";
import ActiveMilestonesList from '@/components/milestone/ActiveMilestonesList.vue'

const activeMilestones = ref(<Milestone[]>[])
const completedMilestones = ref<Milestone[]>([])

onMounted(async () => {
  const token = useTokenStore().$state.jwtToken
  activeMilestones.value = await getAllMilestones(token);
  completedMilestones.value = await getAllMilestoneLogs(token);
  console.log(completedMilestones.value);
})

const pages = ref<number>(1)
const currentPage = ref<number>(0)
const navigateTo = (path: string) => {
  router.push(path)
}

const previousPage = () => {}
const goToPage = (pageNumber:number) => {}

const nextPage = () =>{}

interface Milestone{
  milestoneId: number;
  milestoneTitle: string;
  milestoneDescription: string
  milestoneGoalSum: number;
  milestoneCurrentSum: number;
  deadlineDate: Date;
  startDate: Date;
  milestoneImage: string;
  username: string;
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
        <ActiveMilestonesList/>
      </div>

      <div class="right">

        <h2 class="completed-milestones-title">Sparemål historikk</h2>
        <div class="completed-milestones">
          <template v-if="activeMilestones.length === 0">
            <h4>Du har ingen fullførte sparemål<br>Avsluttede sparemål ender opp her sånn at du får full oversikt.</h4>
          </template>
          <template v-else>
          <CompletedMilestoneDisplay
            class="completed-milestone"
            v-for="(completedMilestone, index) in completedMilestones"
            :key="index"
            :id="completedMilestone.milestoneId"
            :title="completedMilestone.milestoneTitle"
            :description="completedMilestone.milestoneDescription"
            :current-sum="completedMilestone.milestoneCurrentSum"
            :goal-sum="completedMilestone.milestoneGoalSum"
            :deadline="completedMilestone.deadlineDate"
            :start-date="completedMilestone.startDate"
            :image="completedMilestone.milestoneImage"
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
        </template>
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
  text-align: center;
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