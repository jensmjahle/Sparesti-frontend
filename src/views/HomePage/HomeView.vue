<script setup lang="ts">

import { getAllMilestones } from '@/utils/MilestoneUtils'
import { useTokenStore } from '@/stores/token'
import { getActiveChallenges } from '@/utils/challengeutils'
import ActiveMilestonesList from '@/components/milestone/ActiveMilestonesList.vue'
import TotalSavings from '@/components/HomeComponents/TotalSavings.vue'
import { ref } from 'vue'

console.log(getAllMilestones(useTokenStore().getJwtToken));
console.log(getActiveChallenges(useTokenStore().getJwtToken, 0, 5))

const showMilestones = ref(true)
const showChallenges = ref(false)

function checkScreenWidth() {
  if(window.innerWidth >= 1000){
    showMilestones.value = true;
    showChallenges.value = true;
  }
}

function showMilestonesView(){
  showMilestones.value = true
  showChallenges.value = false
}

function showChallengesView(){
  showChallenges.value = true
  showMilestones.value = false
}

checkScreenWidth()
</script>

<template>
  <div id = TopInfo>
    <h2 id ="Welcome">Velkommen!</h2>
    <TotalSavings id = TotalSavings />
  </div>
  <div id = MobileButtons>
    <button class = mobileButton @click="showMilestonesView()">Sparemål</button>
    <button class = mobileButton @click="showChallengesView()">Utfordringer</button>
  </div>
  <div id = HomeViewComponents>
    <div class = ActiveMilestones v-show="showMilestones">
      <ActiveMilestonesList/>
    </div>
    <div class = ActiveChallenges v-show="showChallenges">
      <h3>Placeholder</h3>
    </div>
  </div>
</template>

<style scoped>

  #TopInfo{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }


  #HomeViewComponents{
    display: flex;
  }

  #MobileButtons{
    width: 100%;
    display: none;
    justify-content: space-evenly;
    height: 10%;
  }

  .mobileButton{
    width: 45%;
    background-color: var(--color-confirm-button);
    color: var(--color-buttonText);
    border: 0;
    font-size: 2em;
    border-radius: 20px;
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

  @media only screen and (max-width: 1000px) {
    #TopInfo{
      flex-direction: column;
    }

    #TotalSavings{
      width: 100%;
    }

    #TotalSavings{
      margin: 3%;
    }

    .ActiveMilestones{
      width: 100%;
    }

    .ActiveChallenges{
      width: 100%;
    }

    #MobileButtons{
      display: flex;
    }
  }

</style>