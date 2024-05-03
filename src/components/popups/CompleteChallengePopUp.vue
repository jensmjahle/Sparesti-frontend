<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTokenStore } from '@/stores/token'
import { getAllMilestones } from '@/utils/MilestoneUtils'
import { completeChallenge } from '@/utils/challengeutils'

/**
 * Initiates milestone object type
 */
interface Milestone {
  milestoneId: number
  milestoneTitle: string
}

/**
 * Defines the props for this component
 */
const props = defineProps({
  challengeId: Number
})

/**
 * Defines the emits for this component
 */
const emit = defineEmits(['closePopUp', 'challengeCompleted'])

/**
 * Hold a list of milestones
 */
const milestones = ref<Milestone[]>([])

/**
 * holds the id of the chosen milestone
 */
const chosenMilestone = ref<number | null>(null)

/**
 * holds the chosen milestone error
 */
const chosenMileStoneError = ref<string | null>(null)

/**
 * Logic to execute on component mount
 */
onMounted(async () => {
  try {
    await fetchAllMilestones()
  } catch (error) {
    console.error('Error fetching user info:', error)
  }
})

/**
 * fetches all milestones for a given user
 */
const fetchAllMilestones = async () => {
  try {
    milestones.value = await getAllMilestones(useTokenStore().jwtToken)
    chosenMilestone.value = milestones.value[0].milestoneId
  } catch (error) {
    console.error('Error fetching user info:', error)
  }
}

/**
 * emits a closePopUp event to the parent
 */
const cancelCompleteThisChallenge = () => {
  emit('closePopUp')
}

/**
 * Completes the chosen milestone and emit a challenge completed
 * event to the parent
 */
const completeThisChallenge = async () => {
  if (chosenMilestone.value && props.challengeId)
    try {
      console.log(props.challengeId)
      console.log(chosenMilestone.value)
      await completeChallenge(useTokenStore().jwtToken, props.challengeId, chosenMilestone.value)
      emit('challengeCompleted')
    } catch (error) {
      console.log(error)
      chosenMileStoneError.value = 'Noe gikk galt! Venligst prøv på nytt!'
    }
}
</script>

<template>
  <div class="popup-content">
    <h2>Venligst velg et sparemål!</h2>
    <h3>Velg sparemålet som skal motta sparebeløpet fra utforderingen 🎉</h3>

    <select class="milestones" :class="{ error: chosenMileStoneError }" v-model="chosenMilestone">
      <option v-for="(milestone, index) in milestones" :key="index" :value="milestone.milestoneId">
        {{ milestone.milestoneTitle }}
      </option>
    </select>
    <div class="alert-box">
      <h3 class="error-message" v-if="chosenMileStoneError">{{ chosenMileStoneError }}</h3>
    </div>

    <div class="option-buttons">
      <button class="option-button" id="cancel-button" @click="cancelCompleteThisChallenge()">
        <h2 class="option-button-title">Avbryt</h2>
      </button>
      <button class="option-button" id="delete-button" @click="completeThisChallenge()">
        <h2 class="option-button-title">Fullfør</h2>
      </button>
    </div>
  </div>
</template>

<style scoped>
.popup-content {
  display: flex;
  flex-direction: column;

  width: 50%;
  height: 50%;
  background-color: var(--color-background);

  padding: 20px;
  border-radius: 10px;
  border: 2px solid var(--color-border);

  place-content: space-between;
}

.milestones {
  height: 15%;
  width: 100%;
  border-radius: 20px;
  border: 2px solid var(--color-border);
}

.milestones:hover {
  transform: scale(1.02);
}

.option-buttons {
  display: flex;
  flex-direction: row;

  width: 100%;
  place-content: space-between;
}

.option-button {
  border: none;
  border-radius: 20px;
  width: 35%;
}

.option-button-title {
  color: var(--color-headerText);
  font-weight: bold;
}

.alert-box {
  display: flex;
  flex-direction: column;
  place-items: center;
  min-height: 20px;
}

.error-message {
  color: var(--color-text-error);
}
#cancel-button {
  background-color: var(--color-cancel-button);
}
#cancel-button:active {
  background-color: var(--color-cancel-button-click);
}

#delete-button {
  background-color: var(--color-confirm-button);
}
#delete-button:active {
  background-color: var(--color-confirm-button-click);
}

#delete-button:hover,
#cancel-button:hover {
  transform: scale(1.02);
}

@media only screen and (max-width: 1000px) {
  .popup-content {
    width: 90%;
    height: 60%;
  }
}
</style>
