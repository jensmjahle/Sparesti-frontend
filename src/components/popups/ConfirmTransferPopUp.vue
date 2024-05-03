<script setup lang="ts">

import { defineProps } from 'vue';
import JSConfetti from 'js-confetti'

/**
 * Defines the props necessary for this component
 */
const props = defineProps({
  transferAmount: Number,
});

/**
 * Define the emits for this component
 */
const emit = defineEmits(['closePopUp', 'confirmTransfer'])

/**
 * Initialize jsConfetti
 */
const jsConfetti = new JSConfetti()

/**
 * Passes a confirm transfer emit to the parent and shoots confetti
 */
async function confirm(){
  emit('confirmTransfer')
  await jsConfetti.addConfetti();
}

/**
 * Emits a closePopUp signal to the parent
 */
function cancel(){
  emit('closePopUp')
}

</script>

<template>
  <div id = confirmation>
    <h2>Er du klar for til å ta et steg videre på sparestien med å overføre <span style="font-weight: bold;">{{props.transferAmount}}</span> NOK?</h2>
    <div class="content">
      <img class="sad-pig-img" src="/src/assets/png/satisfied-pig.png" alt="sad-pig" >
      <h3> Husk! Dagens små sparinger kan føre til morgendagens store drømmer.</h3>

    </div>

    <div id = buttons>
      <button @click ="cancel" id="cancelButton"><h2>Avbryt</h2></button>
      <button @click="confirm()" id="confirmButton"><h2>Bekreft</h2></button>
    </div>
  </div>
</template>

<style scoped>

  #confirmation{
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

  .content{
    display: flex;
    flex-direction: row;
    place-items: center;
  }

  .sad-pig-img{
    width:30%;
  }

  #buttons{
    display: flex;
    flex-direction: row;

    width: 100%;
    place-content: space-between;
  }

  #confirmButton, #cancelButton{
    border: none;
    border-radius: 20px;
    width: 35%;
    color: var(--color-buttonText);
    padding: 3%;
  }

  #confirmButton:hover, #cancelButton:hover{
    transform: scale(1.02);
  }

  #confirmButton{
    background-color: var(--color-confirm-button);

  }

  #confirmButton:active{
    background-color: var(--color-confirm-button-click);
  }

  #cancelButton{
    background-color: var(--color-cancel-button);
  }

  #cancelButton:active{
    background-color: var(--color-cancel-button-click);
  }

</style>