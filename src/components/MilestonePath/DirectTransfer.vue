<script setup lang="ts">

import { ref, defineEmits } from 'vue';

const transferValue = ref<number>(0);
const emits = defineEmits(['transfer-value']); // Define custom events

function transfer() {
  emits('transfer-value', transferValue.value);
}

</script>

<template>
  <div id = DirectTransfer>
    <h2 id = Title>Direkte overføring:</h2>
    <div id = Transfer>
      <input type="number" min = "1" id = TransferInput v-model="transferValue"/>
      <button id = TransferButton @click = "transfer()">Overfør</button>
    </div>
  </div>
</template>

<style scoped>
  #DirectTransfer{
    border: 3px solid var(--color-border);
    border-radius: 20px;
    width: 100%;
    padding: 2%;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
  }

  #Title{
    font-size: 1.5em;
    margin-left: 5%;
    font-weight: bold;
  }

  #Transfer{
    display: flex;
    justify-content: space-evenly;
  }

  #TransferInput{
    font-size: 1.5em;
    border-radius: 20px;
    border-color: var(--color-border);
  }

  #TransferButton{
    border: 0;
    border-radius: 20px;
    padding: 3% 5% 3% 5%;
    font-size: 1.5em;
    background-color: var(--color-confirm-button);
    color: var(--color-buttonText);
  }


  #TransferButton:hover{
    transform: scale(1.05);
  }
</style>