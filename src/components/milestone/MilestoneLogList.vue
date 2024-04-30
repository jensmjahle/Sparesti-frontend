<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { useTokenStore } from '@/stores/token'
import { getAllMilestoneLogs } from '@/utils/MilestoneUtils'
import CompletedMilestoneDisplay from '@/components/milestone/CompletedMilestoneDisplay.vue'

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

const token = useTokenStore().jwtToken
const expandedMileStoneId = ref<number>(-1);
const completedMilestones = ref<Milestone[]>([])
const currentPage = ref<number>(0)
const pages = ref<number>(1)
const SIZE = 3

onMounted( () => {
  fetchActiveMilestones();
})

const fetchActiveMilestones = async () => {
  try{
    console.log(currentPage.value)
    const { content, totalPages, number } = await getAllMilestoneLogs(token, currentPage.value,SIZE)
    pages.value = totalPages;
    currentPage.value = number;
    completedMilestones.value = content;
  }catch (error){
    console.log(error)
  }
}

const previousPage = () => {
  currentPage.value --
  fetchActiveMilestones();
}
const goToPage = (pageNumber:number) => {
  currentPage.value = pageNumber;
  fetchActiveMilestones();
}

const nextPage = () =>{
  currentPage.value ++;
  fetchActiveMilestones();
}

const toggleMilestoneHeight = (id: number) => {
  if(expandedMileStoneId.value == id){
    expandedMileStoneId.value = -1;
  } else {
    expandedMileStoneId.value = id;
  }
};

</script>

<template>
  <div class="completed-milestones-component">
    <div class="milestones">
      <CompletedMilestoneDisplay
        v-for="(completedMilestone, index) in completedMilestones"
        class="completed-milestone"
        :class="{'expanded': expandedMileStoneId == completedMilestone.milestoneId}"
        :key="index"
        :id="completedMilestone.milestoneId"
        :title="completedMilestone.milestoneTitle"
        :description="completedMilestone.milestoneDescription"
        :current-sum="completedMilestone.milestoneCurrentSum"
        :goal-sum="completedMilestone.milestoneGoalSum"
        :deadline="completedMilestone.deadlineDate"
        :start-date="completedMilestone.startDate"
        :image="completedMilestone.milestoneImage"
        :expanded="expandedMileStoneId == completedMilestone.milestoneId"
        @click="toggleMilestoneHeight(completedMilestone.milestoneId)"
        @keyup.enter="toggleMilestoneHeight(completedMilestone.milestoneId)"
      ></CompletedMilestoneDisplay>
      <h4 class="milestone-placeholder" v-if="completedMilestones.length == 0">
        Du har ingen fullførte sparemål
        <br>Avsluttede sparemål ender opp her sånn at du får full oversikt.
      </h4>
    </div>

    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 0">Forige side</button>
      <div  v-if="pages>1" class="page-numbers">
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
</template>

<style scoped>

.completed-milestones-component{
  display: flex;
  flex-direction: column;
  text-align: center;

  height: 100%;
  width: 100%;

  padding: 5.0%;
  gap: 2.5%;
}

.milestones{
  display: flex;
  flex-direction: column;
  gap: 2.5%;
  width: 100%;
  height: 90%;
}

.completed-milestone{
  border-radius: 20px;
  border: 2px solid var(--color-border);
  background-color: var(--color-background-white);

  height: calc(calc(100% - 2.5*2%)/3);
  width: 100%;
}

.completed-milestone:hover{
  transform: scale(1.02);
  cursor: pointer;
  transition: none;
}

.expanded{
  height: calc(calc(calc(100% - 2.5*2%)/3)*1.5);
}

.milestone-placeholder{
  color:var(--color-headerText);
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
  border: 1px solid var(--color-border);
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