<script setup lang="ts">
import { defineProps } from 'vue'

/**
 * Defines the props for this component
 */
const props = defineProps({
  Max: {
    type: Number,
    required: true
  },
  Current: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div>
    <progress :max="Max" :value="Current + 1" id="QuestionProgress"></progress>
  </div>
</template>

<style scoped>
#QuestionProgress {
  width: 100%;
  height: 100%;
}

@media only screen and (max-width: 1000px) {
  #QuestionProgress {
    width: 100%;
  }
}
</style>
