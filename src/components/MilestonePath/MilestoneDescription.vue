<script setup lang="ts">

import { defineProps } from 'vue'

/**
 * Defines the props necessary for this component
 */
const props = defineProps({
  pathDescription: String
});

</script>

<template>
  <div id = MilestoneDescription>
    <h2 id = Title>Sparemåls beskrivelse:</h2>
    <h3 id = Description>{{props.pathDescription}}</h3>
  </div>
</template>

<style scoped>

  #MilestoneDescription{
    border: 3px solid var(--color-border);
    border-radius: 20px;
    width: 100%;
    min-height: 25vh;
    max-height: 25vh;
    padding: 2%;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  #MilestoneDescription::-webkit-scrollbar {
    display: none;
  }

  #Title, #Description{
    font-size: 1.5em;
  }

  #Title{
    font-weight: bold;
  }

</style>