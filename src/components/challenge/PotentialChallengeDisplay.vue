<script setup lang="ts">

import { activateChallenge, deleteChallenge } from '@/utils/challengeutils'
import { useTokenStore } from '@/stores/token'

const token:string = useTokenStore().jwtToken;
const emits = defineEmits(['challengeAccepted', 'challengeDeclined']);

interface Challenge{
  'challengeId':number,
  'challengeTitle':string,
  'challengeDescription':string,
  'goalSum':number,
  'expirationDate':string
}

const props = defineProps({
  challenge: {
    type: Object as () => Challenge,
    required: true
  }
});

const declineChallenge = async () => {
  console.log('decline-button clicked')
  if(props.challenge.challengeId){
    try{
      await deleteChallenge(token, props.challenge.challengeId);
      emits('challengeDeclined', props.challenge.challengeId);
    } catch (error){
      alert('Noe gikk galt! Venligst prøv på nytt.')
    }
  } else {
    alert('challengeId not defined')
  }
}

const acceptChallenge = async () => {
  if(props.challenge.challengeId){
    try{
      await activateChallenge(token, props.challenge.challengeId);
      emits('challengeAccepted', props.challenge.challengeId);
    } catch (error){
      alert('Noe gikk galt! Venligst prøv på nytt.')
    }
  }
}
</script>

<template>
  <div class="potential-challenge-display">
    <h2 class="title">{{ props.challenge.challengeTitle }}</h2>
    <h4 class="description">{{ props.challenge.challengeDescription }}</h4>
    <div class="info">
      <h4>Utløpsdato: {{props.challenge.expirationDate}} |</h4>
      <h4 class="sum"> Sparesum: {{props.challenge.goalSum}} kr,-</h4>
    </div>
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
.info{
  display: flex;
  flex-direction: row;
  place-content: center;
  gap: 1.0%;
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