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
    <h3 id = TotalSavings>Totalt oppspart:</h3>
    <h3 id = Savings>{{props.totalSaved + " / " + props.totalToSave + " NOK"}}</h3>
    <ProgressBar :Max="props.totalToSave" :Current="props.totalSaved" id = progress />
  </div>
</template>

<style scoped>

  #TotalSavings, #Savings{
    font-size: 1.5em;
    margin-left: 5%;
  }

  #TotalSavings{
    font-weight: bold;
  }

  #MilestoneProgress{
    border: 3px solid var(--color-border);
    border-radius: 20px;
    width: 100%;
    height: 30%;
    padding-left: 1%;
    padding-right: 1%;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
  }

  #progress{
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>