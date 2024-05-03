<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import {useToast} from "vue-toast-notification";

/**
 * Holds the amount to transfer
 */
const transferValue = ref<number>(0)
const toast = useToast();

/**
 * Initiates emits for component
 */
const emits = defineEmits(['transfer-value'])

/**
 * Emits a transfer value event to the parent and
 * updates the transferValue to 0
 */
function transfer() {
  if (transferValue.value <= 0) {
    toast.info('Beløpet må være større enn 0');
    transferValue.value = 0
    return
  }
  emits('transfer-value', transferValue.value)
  transferValue.value = 0
}
</script>

<template>
  <div id="DirectTransfer">
    <h2 id="Title">Direkte overføring:</h2>
    <div id="Transfer">
      <input type="number" min="1" id="TransferInput" v-model="transferValue" />
      <button id="TransferButton" @click="transfer()">Overfør</button>
    </div>
  </div>
</template>

<style scoped>
#DirectTransfer {
  border: 3px solid var(--color-border);
  border-radius: 20px;
  width: 100%;
  padding: 2%;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
}

#Title {
  font-size: 1.5em;
  font-weight: bold;
}

#Transfer {
  display: flex;
  justify-content: space-between;
}

#TransferInput {
  width: 70%;
  font-size: 1.5em;
  border-radius: 20px;
  border-color: var(--color-border);
}

#TransferButton {
  border: 0;
  border-radius: 20px;
  padding: 3% 5% 3% 5%;
  font-size: 1.5em;
  background-color: var(--color-confirm-button);
  color: var(--color-buttonText);
}

#TransferButton:hover {
  transform: scale(1.05);
}
</style>
