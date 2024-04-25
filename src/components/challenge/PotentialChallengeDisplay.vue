<script setup lang="ts">

import { activateChallenge, deleteChallenge } from '@/utils/challengeutils'
import { useTokenStore } from '@/stores/token'

const token:string = useTokenStore().jwtToken;
const emits = defineEmits(['challengeAccepted', 'challengeDeclined']);

const props = defineProps({
  challengeId: Number,
  challengeTitle: String,
  challengeDescription: String
});

const declineChallenge = async () => {
  console.log('decline-button clicked')
  if(props.challengeId){
    try{
      await deleteChallenge(token, props.challengeId);
      emits('challengeDeclined', props.challengeId);
    } catch (error){
      alert('Noe gikk galt! Venligst prøv på nytt.')
    }
  } else {
    alert('challengeId not defined')
  }
}

const acceptChallenge = async () => {
  if(props.challengeId){
    try{
      await activateChallenge(token, props.challengeId);
      emits('challengeAccepted', props.challengeId);
    } catch (error){
      alert('Noe gikk galt! Venligst prøv på nytt.')
    }
  }
}
</script>

<template>
  <div class="potential-challenge-display">
    <h2 class="title">{{ props.challengeTitle }}</h2>
    <h4 class="description">{{ props.challengeDescription }}</h4>
    <div class="options">
      <button class="option-button" id="decline-button" @click="declineChallenge">
        <h3 class="button-text">Avslå</h3>
      </button>
      <button class="option-button" id="accept-button" @click="acceptChallenge">
        <h3 class="button-text">Godta</h3>
      </button>

    </div>
  </div>
</template>

<style scoped>
.potential-challenge-display{
  display: flex;
  flex-direction: column;
  place-content: space-between;
  padding: 1.5%;
}

.title{
  text-align: center;
}

.description{
  text-align: center;
}

.options{
  display: flex;
  flex-direction: row;
  place-content: space-between;
  gap: 2.5%;
}

.option-button{
  width: 50%;
  border-radius: 20px;
  border: none;
}

.option-button:hover{
  transform: scale(1.02);
}

.button-text{
  color: var(--color-buttonText);
  font-weight: bold;
}

#accept-button{
  background-color: var(--color-confirm-button);
}
#accept-button:active{
  background-color: var(--color-confirm-button-click);
}

#decline-button{
  background-color: var(--color-cancel-button);
}

#decline-button:active{
  background-color: var(--color-cancel-button-click);
}


</style>