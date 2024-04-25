<script setup lang="ts">
import { completeChallenge } from '@/utils/challengeutils'
import { useTokenStore } from '@/stores/token'
import { ref } from 'vue'

const token:string = useTokenStore().jwtToken;

const emits = defineEmits(['challengeCompleted']);
const milestoneId = ref(1)

const props = defineProps({
  challengeId: Number,
  challengeTitle: String,
  challengeDescription: String
});

const completeTheChallenge = async () => {
  if(props.challengeId){
    try{
    await completeChallenge(token,props.challengeId, milestoneId.value)
    emits('challengeCompleted', props.challengeId);
    } catch (error){
      alert('Noe gikk galt! Venligst prøv på nytt!')
    }
  }
}

</script>

<template>
  <div class="potential-challenge-display">
    <h3 class="title">{{ props.challengeTitle }}</h3>
    <h4 class="description">{{ props.challengeDescription }}</h4>
    <div class="button-container">
      <button class="complete-button" @click="completeTheChallenge()">
        <h3 class="complete-button-text">Fullfør</h3>
      </button>
    </div>
  </div>

</template>

<style scoped>
.potential-challenge-display{
  display: flex;
  flex-direction: column;
  padding: 1.5%;
  place-content: space-between;
}
.title{
  text-align: center;
  color: var(--color-text-black);
}

.description{
  text-align: center;
  color: var(--color-text-black);
}

.button-container{
  display: flex;
  width: 100%;
  height: 25%;
  place-content: center;
}

.complete-button{
  border-radius: 20px;
  width: 50%;
  height: 100%;
  border: none;
  background-color: var(--color-save-button);
}

.complete-button:hover{
  transform: scale(1.02);
}

.complete-button:active{
  background-color: var(--color-save-button-click);
}

.complete-button-text{
  color: var(--color-headerText);
  font-weight: bold;
}

</style>