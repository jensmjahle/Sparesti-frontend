<script setup lang="ts">
import ActiveChallengeDisplay from '@/components/challenge/ActiveChallengeDisplay.vue'
import { onMounted, ref, watch } from 'vue'
import { getActiveChallenges } from '@/utils/challengeutils'
import { useTokenStore } from '@/stores/token'
import JSConfetti from 'js-confetti'
import CompleteChallengePopUp from '@/components/popups/CompleteChallengePopUp.vue'
import DeleteChallengePopUp from '@/components/popups/DeleteChallengePopUp.vue'
import eventBus from '@/components/service/eventBus.js' // Import the event bus instance

/**
 * Initiates object type challenge with all necessary fields for a challenge
 */
interface Challenge {
  challengeId: number
  challengeTitle: string
  challengeDescription: string
  goalSum: number
  expirationDate: string
}

/**
 * Initiates the jsConfetti
 */
const jsConfetti = new JSConfetti()

/**
 * Setts if the displayPopUp is visible, initially false
 */
const displayPopUp = ref<boolean>(false)

/**
 * Setts if the displayDeletePopUp is visible, initially false
 */
const displayDeletePopUp = ref<boolean>(false)

/**
 * Holds a list of all active challenges
 */
const activeChallenges = ref<Challenge[]>([])

/**
 * Holds the id of the challenge that is to be completed
 */
const challengeToBeCompleted = ref<number | any>(null)

/**
 * Holds the id of the challenge that is to be deleted
 */
const challengeToBeDeleted = ref<number | any>(null)

/**
 * Holds the id of the challenge who has its contents expanded
 */
const expandedChallengeId = ref<number>(-1)

/**
 * The amount of challenges per page
 */
const SIZE = 3

/**
 * The amount of pages
 */
const pages = ref<number>(1)

/**
 * The current page
 */
const currentPage = ref<number>(0)

/**
 * Functionality to be called upon component mount
 */
onMounted(async () => {
  try {
    await fetchActiveChallenges()
  } catch (error) {
    console.error('Error fetching user info:', error)
  }
})

/**
 * Fetches active challenges for the given user.
 * Updates the amount of total pages, the current page
 * and the active challenge id
 */
const fetchActiveChallenges = async () => {
  try {
    const { content, totalPages, number } = await getActiveChallenges(
      useTokenStore().jwtToken,
      currentPage.value,
      SIZE
    )

    pages.value = totalPages
    currentPage.value = number
    activeChallenges.value = content
  } catch (error) {
    console.error('Error fetching inactive challenges:', error)
  }
}

/**
 * Handle the request to complete the given challenge
 * Displays a PopUp where the user can complete a challenge
 * @param challengeId the challenge to be completed
 */
const handleRequestToCompleteChallenge = (challengeId: number) => {
  challengeToBeCompleted.value = challengeId
  displayPopUp.value = true
}

/**
 * Handle the request to delete the given challenge
 * Displays a PopUp where the user cna delete a challenge
 * @param challengeId the challenge to be deleted
 */
const handleRequestToDeleteChallenge = async (challengeId: number) => {
  challengeToBeDeleted.value = challengeId
  displayDeletePopUp.value = true
}

/**
 * Hides the display PopUp
 */
const closePopUp = async () => {
  displayPopUp.value = false
}

/**
 * Hides the display delete PopUp
 */
const closeDeletePopUp = async () => {
  displayDeletePopUp.value = false
}

/**
 * Handles the events when a user completes a challenge
 * through the display PopUp. Emits an event to the parent to update the
 * milestones, then closes the PopUp shoots confetti and updates the
 * active challenges
 */
const handleChallengeCompleted = async () => {
  eventBus.emit('updateMilestones')
  await closePopUp()
  await jsConfetti.addConfetti()
  await fetchActiveChallenges()
}

/**
 * Handles the events when a user deletes a challenge
 * through the display delete PopUp. Closes the delete PopUp
 * and updates the active challenges
 */
const handleChallengeDeleted = async () => {
  await closeDeletePopUp()
  await fetchActiveChallenges()
}

/**
 * Navigates the user to the previous page
 */
const previousPage = () => {
  currentPage.value--
}

/**
 * Navigates the user to the given page
 * @param pageNumber page to navigate too
 */
const goToPage = (pageNumber: number) => {
  currentPage.value = pageNumber
}

/**
 * Navigates the user to the next page
 */
const nextPage = () => {
  currentPage.value++
}

/**
 * Toggles the size of the challenge div for the given challenge
 * @param id the challenge id of the given challenge
 */
const toggleChallengeHeight = (id: number) => {
  if (expandedChallengeId.value == id) {
    expandedChallengeId.value = -1
  } else {
    expandedChallengeId.value = id
  }
}

/**
 * Tels the eventbus to fetch active challenges on updates to challenges
 */
eventBus.on('updateChallenges', () => {
  fetchActiveChallenges()
})

watch(currentPage, fetchActiveChallenges)
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
    <div class="active-milestones">
      <ActiveChallengeDisplay
        class="active-challenge"
        v-for="(activeChallenge, index) in activeChallenges"
        :class="{ expanded: expandedChallengeId == activeChallenge.challengeId }"
        :key="index"
        :challenge="activeChallenge"
        :expanded="expandedChallengeId == activeChallenge.challengeId"
        @challengeCompleted="handleRequestToCompleteChallenge(activeChallenge.challengeId)"
        @challengeDeleted="handleRequestToDeleteChallenge(activeChallenge.challengeId)"
        @click="toggleChallengeHeight(activeChallenge.challengeId)"
      ></ActiveChallengeDisplay>
      <h4
        class="challenge-placeholder"
        id="active-challenge-placeholder"
        v-if="activeChallenges.length == 0"
      >
        Du har ingen aktive utfordringer.<br />
        Lag din egen utfordring eller aksepter våre tilpassede forslag! Aktive utfordringer vil
        vises i denne boksen.
      </h4>
    </div>

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

.active-challenge-component {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 5%;
  gap: 2.5%;
}

.active-milestones {
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 100%;
  gap: 2.5%;
}

.active-challenge {
  border-radius: 20px;
  border: 2px solid var(--color-border);
  background-color: var(--color-background-white);

  height: calc(calc(100% - 2.5 * 2%) / 3);
  width: 100%;
}

.active-challenge:hover {
  transform: scale(1.02);
  cursor: pointer;
}

.expanded {
  height: calc(calc(calc(100% - 2.5 * 2%) / 3) * 1.5);
}

#active-challenge-placeholder {
  color: var(--color-headerText);
}

.challenge-placeholder {
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
</style>
