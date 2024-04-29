<script setup lang="ts">

const emits = defineEmits(['challengeCompleted', 'challengeDeleted']);

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
const expirationDate = () => {
  return new Date(props.challenge?.expirationDate).
  toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

const completeTheChallenge = () => {
  if(props.challenge.challengeId){
    emits('challengeCompleted', props.challenge.challengeId);
  }
}

const deleteTheChallenge = () => {
  if(props.challenge.challengeId){
    emits('challengeDeleted', props.challenge.challengeId)
  }
}
</script>

<template>
  <div class="potential-challenge-display">
    <img
      class="close-img"
      src="/src/components/icons/navigation/close.svg"
      alt="delete-button"
      @click="deleteTheChallenge()">
    <div class="content">
      <h3 class="title">{{ props.challenge.challengeTitle }}</h3>
      <h4 class="description">{{ props.challenge.challengeDescription }}</h4>
      <div class="extra-info">
        <h4 class="expiration-date">Utløpsdato: {{expirationDate()}} |</h4>
        <h4 class="sum"> Sparesum: {{props.challenge.goalSum}} kr,-</h4>
      </div>
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
  place-items: end;
  place-content: space-between;
  padding: 1.5%;
  gap: 1.0%;
}

.content{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 65%;
}
.close-img{
  width: 5.0%;
}

.close-img:hover{
  transform: scale(1.2);
}

.title{
  text-align: center;

  color: var(--color-text-black);
}

.description{
  text-align: center;
  color: var(--color-text-black);
  overflow: hidden;
}

.extra-info{
  display: none;
}

.expiration-date{
  color: var(--color-text-black);
}

.sum{
  color: var(--color-text-black);
}

.potential-challenge-display:hover{
  .extra-info{
    display: flex;
    flex-direction: row;
    place-content: center;
    gap: 1.0%;
  }

  .expiration-date{
    font-weight: bold;
  }

  .sum{
    font-weight: bold;
  }

  .content{
    overflow: scroll;
  }

  .description{
    overflow: visible;
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

@media only screen and (max-width: 1000px){
  .extra-info{
    display: flex;
    flex-direction: row;
    place-content: center;
    gap: 1.0%;
  }
  .potential-challenge-display:hover{
    .description{
      text-align: center;
      color: var(--color-text-black);
    }
  }

  .potential-challenge-display:hover{
    .extra-info{
      display: flex;
      flex-direction: row;
      place-content: center;
      gap: 1.0%;
    }
  }
}



</style>