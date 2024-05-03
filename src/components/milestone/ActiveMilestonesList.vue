<script setup lang="ts">
import ActiveMilestoneDisplay from '@/components/milestone/ActiveMilestoneDisplay.vue'
import { onMounted, ref } from 'vue'
import { useTokenStore } from '@/stores/token'
import { getAllMilestonesPaginated } from '@/utils/MilestoneUtils'
import eventBus from '@/components/service/eventBus.js'

/**
 * Defines the necessary props for this component
 */
interface Milestone {
  milestoneId: number
  milestoneTitle: string
  milestoneDescription: string
  milestoneGoalSum: number
  milestoneCurrentSum: number
  deadlineDate: Date
  startDate: Date
  milestoneImage: string
  username: string
}

/**
 * Hold a list of active milestones
 */
const activeMilestones = ref<Milestone[]>([])

/**
 * Hold the current page
 */
const currentPage = ref<number>(0)

/**
 * Hold the amount of pages
 */
const pages = ref<number>(1)

/**
 * Specifies the amount of element per page
 */
const SIZE = 3

/**
 * Logic to be ran on component mount
 */
onMounted(() => {
  currentPage.value = 0
  fetchActiveMilestones()
})

/**
 * Fetches active milestones with pagination
 */
const fetchActiveMilestones = async () => {
  try {
    const { content, totalPages, number } = await getAllMilestonesPaginated(
      useTokenStore().jwtToken,
      currentPage.value,
      SIZE
    )
    pages.value = totalPages
    currentPage.value = number
    activeMilestones.value = content
  } catch (error) {
    console.log(error)
  }
}

/**
 * Navigates the user to the previous page and updates
 * the active milestones to show
 */
const previousPage = () => {
  currentPage.value--
  fetchActiveMilestones()
}

/**
 * Navigates the user to the specified page and updates
 * the active milestones to show
 * @param pageNumber page to navigate to
 */
const goToPage = (pageNumber: number) => {
  currentPage.value = pageNumber
  fetchActiveMilestones()
}

/**
 * Navigates the user to the next page and updates
 * the active milestones to show
 */
const nextPage = () => {
  currentPage.value++
  fetchActiveMilestones()
}

eventBus.on('updateMilestones', () => {
  fetchActiveMilestones()
})
</script>

<template>
  <div class="active-milestone-component">
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 0">Forige side</button>
      <div v-if="pages > 1" class="page-numbers">
        <button
          v-for="pageNumber in pages"
          :key="pageNumber - 2"
          :class="{ chosen: pageNumber - 1 === currentPage }"
          @click="goToPage(pageNumber - 1)"
        >
          {{ pageNumber }}
        </button>
      </div>
      <button @click="nextPage" :disabled="currentPage === pages - 1 || pages === 0">
        Neste side
      </button>
    </div>

    <div class="milestones">
      <ActiveMilestoneDisplay
        class="active-milestone"
        v-for="(activeMilestone, index) in activeMilestones"
        :key="index"
        :id="activeMilestone.milestoneId"
        :title="activeMilestone.milestoneTitle"
        :description="activeMilestone.milestoneDescription"
        :goalSum="activeMilestone.milestoneGoalSum"
        :currentSum="activeMilestone.milestoneCurrentSum"
        :deadline="activeMilestone.deadlineDate"
        :startDate="activeMilestone.startDate"
        :image="activeMilestone.milestoneImage"
      ></ActiveMilestoneDisplay>
      <h4 v-if="activeMilestones.length === 0">
        Opps, her var det tomt.<br />
        Lag ditt første sparemål for å komme i gang!
      </h4>
    </div>
  </div>
</template>

<style scoped>
.active-milestone-component {
  display: flex;
  flex-direction: column;
  text-align: center;

  height: 100%;
  width: 100%;
}

.milestones {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;

  gap: 2.5%;
}

.active-milestone {
  border-radius: 20px;
  border: 2px solid var(--color-border);
  box-shadow: 0 4px 4px var(--color-shadow);

  height: calc(95% / 3);
  width: 100%;
}

.active-milestone:hover {
  transform: scale(1.02);
  cursor: pointer;
}

.pagination {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: 10%;
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

.pagination button:active {
  background-color: var(--color-pageination-button-click);
}

.pagination button:disabled {
  color: var(--color-inactive-button-text);
  cursor: not-allowed;
  transform: none;
  background-color: var(--color-pageination-button);
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

.chosen {
  color: var(--color-heading);
  font-weight: bold;
}

@media only screen and (max-width: 1000px) {
  .pagination {
    place-content: center;
  }
}
</style>
