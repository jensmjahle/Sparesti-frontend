<script setup lang="ts">

import { activateChallenge, deleteChallenge } from '@/utils/challengeutils'
import { useTokenStore } from '@/stores/token'
import eventBus from '@/components/service/eventBus.js'
import { useToast } from 'vue-toast-notification'

/**
 * Initiates toast alerts
 */
const toast = useToast()

/**
 * Initiates object type challenge with all necessary fields for a challenge
 */
interface Challenge{
  'challengeId':number,
  'challengeTitle':string,
  'challengeDescription':string,
  'goalSum':number,
  'expirationDate':string
}

/**
 * Defines the props that the components requires from the parent.
 * In this instance a challenge object
 */
const props = defineProps({
  challenge: {
    type: Object as () => Challenge,
    required: true
  }
});


/**
 * Defines the emits for this component.
 * Defines a challenge accepted emit and a challenge declined emit
 */
const emit = defineEmits(['challengeAccepted', 'challengeDeclined']);

/**
 * Calculates the expiration date for the challenge
 */
const expirationDate = () => {
  return new Date(props.challenge?.expirationDate).
  toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

/**
 * Allows the user to decline a suggested challenge.
 * First calls to delete the challenge from the list,
 * then emits a challenge declined event to the parent.
 * In the event of an error displays an error PopUp
 * to the user
 */
const declineChallenge = async () => {
  if(props.challenge.challengeId){
    try{
      await deleteChallenge(useTokenStore().jwtToken, props.challenge.challengeId);
      emit('challengeDeclined', props.challenge.challengeId);
    } catch (error){
      toast.error('Noe gikk galt! Venligst prøv på nytt.')
    }
  } else {
    toast.error('challengeId not defined')
  }
}

/**
 * Allows the user to accept a suggested challenge.
 * First calls to activate the challenge, then emits
 * a challenge accepted event to the parent.
 * In the event of an error displays an error PopUp to the user
 */
const acceptChallenge = async () => {
  if(props.challenge.challengeId){
    try{
      await activateChallenge(useTokenStore().jwtToken, props.challenge.challengeId);
      emit('challengeAccepted', props.challenge.challengeId);
      eventBus.emit('updateChallenges');
    } catch (error){
      toast.error('Noe gikk galt! Venligst prøv på nytt.')
    }
  }
}
</script>

<template>
  <div class="potential-challenge-display">
    <h2 class="title">{{ props.challenge.challengeTitle }}</h2>
    <h4 class="description">{{ props.challenge.challengeDescription }}</h4>
    <div class="info">
      <h4>Utløpsdato: {{expirationDate()}} |</h4>
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