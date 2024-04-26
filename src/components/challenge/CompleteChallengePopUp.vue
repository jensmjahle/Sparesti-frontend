<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { useTokenStore } from '@/stores/token'
import { getAllMilestones } from '@/utils/MilestoneUtils'
import { completeChallenge } from '@/utils/challengeutils'

interface Milestone{
  'milestoneId': number,
  'milestoneTitle': string
}

const props = defineProps({
  challengeId: Number,
});

const token:string = useTokenStore().jwtToken;
const emit = defineEmits(['closePopUp', 'challengeCompleted']);

const milestones = ref<Milestone[]>([]);
const chosenMilestone = ref<number|null>(null);
const chosenMileStoneError = ref<string|null>(null)


onMounted(async () => {
  try {
    await fetchAllMilestones();
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
})
const fetchAllMilestones = async () =>{
  try{
    milestones.value = await getAllMilestones(token)
    chosenMilestone.value = milestones.value[0].milestoneId;

  } catch (error){
    console.error('Error fetching user info:', error);
  }
}

const cancelCompleteThisChallenge = () => {
  emit('closePopUp');
}

const completeThisChallenge = async () => {
  if(chosenMilestone.value && props.challengeId)
  try{
    console.log(props.challengeId)
    console.log(chosenMilestone.value)
    await completeChallenge(token, props.challengeId, chosenMilestone.value);
    emit('challengeCompleted');

  }catch (error){
    console.log(error)
    chosenMileStoneError.value = 'Noe gikk galt! Venligst prøv på nytt!'
  }
}

</script>

<template>
  <div class="popup-content">
    <!-- Pop-up content goes here -->
    <h2>Venligst velg et sparemål!</h2>
    <h3>Velg sparemålet som skal motta sparebeløpet fra utforderingen 🎉</h3>

    <select class="milestones" :class="{'error': chosenMileStoneError}" v-model="chosenMilestone">
      <option v-for="(milestone, index) in milestones"
              :key="index" :value="milestone.milestoneId">{{ milestone.milestoneTitle }}</option>
    </select>
    <div class="alert-box">
      <h3 class="error-message" v-if="chosenMileStoneError">{{chosenMileStoneError}}</h3>
    </div>

    <div class="option-buttons">
      <button class="option-button" id="cancel-button" @click="cancelCompleteThisChallenge()">
        <h2 class="option-button-title">Avbryt</h2>
      </button>
      <button class="option-button" id="complete-button" @click="completeThisChallenge()">
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

.milestones{
  height: 15%;
  width: 100%;
  border-radius: 20px;
  border: 2px solid var(--color-border)
}

.milestones:hover{
  transform: scale(1.02);
}

.option-buttons{
  display: flex;
  flex-direction: row;

  width: 100%;
  place-content: space-between;
}

.option-button{
  border: none;
  border-radius: 20px;
  width: 35%;

}

.option-button-title{
  color: var(--color-headerText);
  font-weight: bold;
}


.alert-box{
  display: flex;
  flex-direction: column;
  place-items: center;
  min-height: 20px;
}

.error-message{
  color: var(--color-text-error);
}
#cancel-button{
  background-color: var(--color-cancel-button);
}
#cancel-button:active{
  background-color: var(--color-cancel-button-click);
}

#complete-button{
  background-color: var(--color-confirm-button);
}
#complete-button:active{
  background-color: var(--color-confirm-button-click);
}

#complete-button:hover, #cancel-button:hover{
  transform: scale(1.02);
}

@media only screen and (max-width: 1000px){
  .popup-content {
    width: 90%;
    height: 60%;
  }
}


</style>