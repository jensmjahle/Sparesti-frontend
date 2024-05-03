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
    <h2>Er du sikker på at du vil gjennomføre en direkte overføring på <span style="font-weight: bold;">{{props.transferAmount}}</span> NOK</h2>
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