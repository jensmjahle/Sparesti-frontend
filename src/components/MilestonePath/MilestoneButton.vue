<script setup lang="ts">
import { defineEmits } from 'vue'

/**
 * Defines the props necessary for this component
 */
const props = defineProps({
  label: String,
  buttonColor: String
})

/**
 * Defines emits for this component
 */
const emits = defineEmits(['delete'])

/**
 * emits a delete event to the parent
 */
function deleteMilestone() {
  if (props.label === 'Slett') {
    emits('delete')
  }
}
</script>

<template>
  <div class="button-box">
    <button
      class="save-button"
      :style="{ backgroundColor: buttonColor }"
      @click="deleteMilestone()"
    >
      {{ label }}
    </button>
  </div>
</template>

<style scoped>
.button-box {
  width: 100%;
  padding: 2%;
  overflow: auto;
  scrollbar-width: none;
}

.save-button {
  border-radius: 20px;
  width: 100%;
  padding-right: 5%;
  padding-left: 5%;
  color: var(--color-headerText);
  background-color: var(--color-save-button);
  border: none;
  height: 20%;
  min-height: 35px;
  font-size: 1.5em;
  font-weight: bold;
}

.save-button:hover {
  transform: scale(1.02);
}

.save-button:active {
  background-color: var(--color-save-button-click);
}

.save-button-title {
  font-weight: bold;
}
</style>
