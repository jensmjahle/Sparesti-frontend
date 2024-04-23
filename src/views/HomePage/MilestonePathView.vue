<script setup lang="ts">

import MilestoneProgress from '@/components/MilestoneProgress.vue'
import { ref } from 'vue'
import DirectTransfer from '@/components/DirectTransfer.vue'
import MilestoneDescription from '@/components/MilestoneDescription.vue'

const pathName = ref("PathNameHere")
</script>

<template>
  <h1 id = title>{{pathName}}</h1>
  <div id = MilestonePath>
    <div id = Path>

    </div>
    <div id = Info>
      <div id = Progress>
        <MilestoneProgress/>
      </div>
      <div id = Transfer>
        <DirectTransfer/>
      </div>
      <div id = Description>
        <MilestoneDescription/>
      </div>
    </div>
  </div>


</template>

<style scoped>
  #title{
    margin-left: 9%;
  }

  #MilestonePath{
    width: 100%;
    height: 80%;
    display: flex;
  }

  #Path{
    width: 60%;
    height: 100%;
  }

  #Info{
    width: 40%;
    height: 100%;
    display: block;
  }

  #Progress{
    width: 100%;
  }

  #Progress, #Transfer, #Description{
    margin-bottom: 5%;
  }
</style>