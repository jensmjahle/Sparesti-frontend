<script setup lang="ts">

/**
 * Defines the emits for this component.
 * Defines a challenge completed emit and a challenge deleted emit
 */
const emits = defineEmits(['challengeCompleted', 'challengeDeleted']);

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
  },
  expanded: Boolean
});

/**
 * Calculates the expiration date for the challenge
 */
const expirationDate = () => {
  return new Date(props.challenge?.expirationDate).
  toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

/**
 * Calls the challenge completed emit and passes along the challenge id
 * of the completed challenge
 */
const completeTheChallenge = () => {
  if(props.challenge.challengeId){
    emits('challengeCompleted', props.challenge.challengeId);
  }
}

/**
 * Calls the delete challenge emit and passes along the challenge id
 * of the challenge to be deleted
 */
const deleteTheChallenge = () => {
  if(props.challenge.challengeId){
    emits('challengeDeleted', props.challenge.challengeId)
  }
}

/**
 * Checks if a challenge is about to expire
 * Returns true if challenge is about to expire and
 * false if not
 */
const isToExpire = () => {
  if (props.challenge.expirationDate) {
    const today = new Date();
    const deadlineDate = new Date(props.challenge.expirationDate);
    return (
      today.getFullYear() === deadlineDate.getFullYear() &&
      today.getMonth() === deadlineDate.getMonth() &&
      today.getDate() === deadlineDate.getDate()
    );
  }
  return false;
}


</script>

<template>
  <div class="potential-challenge-display">
    <img
      class="close-img"
      tabindex="0"
      @keyup.enter="deleteTheChallenge()"
      src="/src/components/icons/navigation/close.svg"
      alt="delete-button"
      @click="deleteTheChallenge()">
    <h3 class="title" :class="{'expire': isToExpire()}">{{ props.challenge.challengeTitle }}</h3>

    <div class="content">
      <div class="description-container">
        <h4 class="description-title">Beskrivelse</h4>
        <img src="/src/components/icons/navigation/info.svg" alt="show-more" class="show-more-icon">
        <div class="description" :class="{'expanded':expanded}">
          <h4 class="description-info" >{{ props.challenge.challengeDescription}}</h4>
        </div>
      </div>
      <div class="extra-info">
        <h4 class="expiration-date" :class="{'expire': isToExpire()}">Utløpsdato: {{expirationDate()}}</h4>
        <h4 class="sum" :class="{'expire': isToExpire()}"> | Sparesum: {{props.challenge.goalSum}}kr</h4>
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
  height: 100%;
  width: 100%;
  padding: 1.5%;
}

h1:hover, h3:hover, h2:hover, h4:hover{
  cursor: pointer;
}

.close-img{
  width: 5.0%;
}

.close-img:hover{
  transform: scale(1.2);
}

.title{
  width: 100%;
  text-align: center;
  color: var(--color-text-black);
}

.content{
  display: flex;
  flex-direction: column;
  place-items: center;
  place-content: space-between;
  width: 100%;
  height: 75%;
}

.description-container{
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
}

.description-title{
  color: var(--color-text-black);
  text-decoration: underline;
  text-align: center;
}

.show-more-icon{
  height: 1.5vh;
}

.extra-info{
  display: flex;
  flex-direction: row;
  place-content: center;
  gap: 0.5rem;
}

.expiration-date, .sum{
  color: var(--color-text-black);
}

.expire{
  color: var(--color-text-error);
}

.description{
  height: 100%;
  display: none;
  place-content: center;
  align-content: center;
  color: var(--color-text-black);
}

.expanded{
  display: flex;
  place-content: center;
}

.description-info{
  text-align: center;
  color: var(--color-text-black);
}

.button-container{
  margin-top: 1.5%;
  display: flex;
  width: 100%;
  place-content: center;
}

.complete-button{
  border-radius: 20px;
  width: 50%;
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