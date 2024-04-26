<script setup lang="ts">
  import { defineProps } from 'vue'

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
    <progress :max="Max" :value ="Current + 1" id = QuestionProgress></progress>
  </div>
</template>

<style scoped>

  #QuestionProgress{
    width: 90%;
    height: 10vh;
  }

  @media only screen and (max-width: 1000px) {

    #QuestionProgress{
      width: 90vw;
    }
  }
</style>