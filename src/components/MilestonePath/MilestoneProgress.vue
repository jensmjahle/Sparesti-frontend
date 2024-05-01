<script setup lang="ts">

import ProgressBar from '@/components/ProgressBar.vue'

import { defineProps } from 'vue';

const props = defineProps({
  totalToSave: Number,
  totalSaved: Number
});


</script>

<template>
  <div id = MilestoneProgress>
    <div>
      <h3 id = TotalSavings>Totalt oppspart:</h3>
      <h3 id = Savings>{{props.totalSaved + " / " + props.totalToSave + " NOK"}}</h3>
    </div>
    <ProgressBar :Max="props.totalToSave || 0" :Current="props.totalSaved || 0" id = progress />
  </div>
</template>

<style scoped>

  #TotalSavings, #Savings{
    font-size: 1.5em;
  }

  #TotalSavings{
    font-weight: bold;
  }

  #MilestoneProgress{
    border: 3px solid var(--color-border);
    border-radius: 20px;
    height: 100%;
    padding: 2%;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
  }

  #progress{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
    width: 100%;
    padding-bottom: 2%;
  }

</style>