<script setup lang="ts">

const emits = defineEmits(['challengeCompleted']);

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

const completeTheChallenge = () => {
  if(props.challenge.challengeId){
    emits('challengeCompleted', props.challenge.challengeId);
  }
}

</script>

<template>
  <div class="potential-challenge-display">
    <h3 class="title">{{ props.challenge.challengeTitle }}</h3>
    <h4 class="description">{{ props.challenge.challengeDescription }}</h4>
    <div class="on-object-hover">
      <h4>Utløpsdato: {{props.challenge.expirationDate}} |</h4>
      <h4 class="sum"> Sparesum: {{props.challenge.goalSum}} kr,-</h4>
    </div>
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

.on-object-hover{
  display: none;
}


.potential-challenge-display:hover{
  .on-object-hover{
    display: flex;
    flex-direction: row;
    place-content: center;
    gap: 1.0%;
  }
  .description{
    display: none;
  }
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