<script setup lang="ts">

/**
 * Defines the emits for this component
 */
const emit = defineEmits(['closePopUp']);

/**
 * Emits a closePopUp event to the parent
 */
const closePopUp = () => {
  emit('closePopUp');
}
</script>

<template>
  <div class="popup-content">
    <div class="header">
      <img src="/src/components/icons/navigation/lightbulb-on.svg" alt="pop-up-icon" class="img">
      <h2>Sparemål</h2>
    </div>
    <h3>
      Hei! Du befinner deg for øyeblikket på sparemål-siden til sparesti.
      På denne siden finner du en oversikt over alle dine nåværende sparemål. Klikk på sparemålene
      for å se flere detaljer. Er det noe du sparer til? Klikk på den store grønne knappen "Lag nytt sparemål + "
      for å opprette et nytt sparemål. Du finner også en oversikt over dine tidligere sparemål til venstre på siden.

    </h3>

    <div class="option-buttons">
      <button class="option-button" id="delete-button" @click="closePopUp()">
        <h2 class="option-button-title">Ok</h2>
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
  align-items: start;

  overflow-y: scroll;
  gap: 2.5%;
}

.header{
  display: flex;
  flex-direction: row;
  place-content: start;
  width: 100%;
  height: 10%;
  gap: 1.5%;
}

.img{
  height: 100%;
}

.option-buttons{
  display: flex;
  flex-direction: row;

  width: 100%;
  place-content: center;
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

#delete-button{
  background-color: var(--color-confirm-button);
}
#delete-button:active{
  background-color: var(--color-confirm-button-click);
}

#delete-button:hover{
  transform: scale(1.02);
}

@media only screen and (max-width: 1000px){
  .popup-content {
    width: 90%;
    height: 60%;
  }
}

@media (prefers-color-scheme: dark) {
  .img{
    filter: invert(1);
  }
}

</style>