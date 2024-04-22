<script setup lang="ts">

import MilestoneProgress from '@/components/MilestoneProgress.vue'
</script>

<template>
  <h1 id = title>Path name here</h1>
  <div id = MilestonePath>
    <div id = Path>

    </div>
    <div id = Info>
      <div id = Progress>
        <MilestoneProgress/>
      </div>
      <div id = Transfer>

      </div>
      <div id = Description>

      </div>
    </div>
  </div>


</template>

<style scoped>
  #title{
    margin-left: 10%;
  }

  #MilestonePath{
    width: 100%;
    height: 100%;
    display: flex;
  }

  #Path{
    width: 60%;
    height: 100%;
  }

  #Info{
    width: 40%;
    height: 100%;
  }

  #Progress{
    width: 100%;
    height: 100%;
  }
</style>