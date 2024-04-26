<script setup lang="ts">

import ActiveChallengeDisplay from '@/components/challenge/ActiveChallengeDisplay.vue'
import { getAllMilestones } from '@/utils/MilestoneUtils'
import { useTokenStore } from '@/stores/token'
import { getActiveChallenges } from '@/utils/challengeutils'
import ActiveMilestonesList from '@/components/milestone/ActiveMilestonesList.vue'

console.log(getAllMilestones(useTokenStore().getJwtToken));
console.log(getActiveChallenges(useTokenStore().getJwtToken, 0, 5))

</script>

<template>
  <div id = TopInfo>
    <h2>Velkommen!</h2>
    <div id = TotalSavings>
      <h3>TotalSavingsDiv</h3>
    </div>
  </div>
  <div id = HomeViewComponents>
    <div class = ActiveMilestones>
      <ActiveMilestonesList/>
    </div>
    <div class = ActiveChallenges>
      <ActiveChallengeDisplay challenge="" />
    </div>
  </div>
</template>

<style scoped>

  #TopInfo{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #TotalSavings{
    margin-right: 5%;
  }

  #HomeViewComponents{
    display: flex;
  }

  .ActiveMilestones, .ActiveChallenges{
    margin: 2%;
    border-radius: 20px;
  }

  .ActiveMilestones{
    width: 60%;
  }

  .ActiveChallenges{
    width: 40%;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);

  }

</style>