<script setup lang="ts">

import MilestoneProgress from '@/components/MilestonePath/MilestoneProgress.vue'
import { onMounted, ref } from 'vue'
import DirectTransfer from '@/components/MilestonePath/DirectTransfer.vue'
import MilestoneDescription from '@/components/MilestonePath/MilestoneDescription.vue'
import MilestonePath from '@/components/MilestonePath/MilestonePath.vue'
import { getMilestoneDetails } from '@/utils/MilestonePathUtils'
import { useMilestoneStore } from '@/stores/currentMilestone'

const pathName = ref("PathNameHere")
const pathDescription = ref("PathDescriptionHere")

const totalToSave = ref(3000)
const totalSaved = ref(0)

const showPath = ref(true);
const showInfo = ref(false);

const milestonePathKey = ref(0);

function checkScreenWidth() {
  if(window.innerWidth >= 1000){
    showInfo.value = true;
    showPath.value = true;
  }
}

function showInfoFields(){
  showInfo.value = true;
  showPath.value = false;
}

function showPathField(){
  showInfo.value = false
  showPath.value = true
}

checkScreenWidth()

onMounted( async () =>{
  const milestoneId = useMilestoneStore().milestoneId;
  console.log(milestoneId)
  const response = await getMilestoneDetails(milestoneId)
  pathName.value = response.data.milestoneTitle
  pathDescription.value = response.data.milestoneDescription
  totalToSave.value = response.data.milestoneGoalSum
  totalSaved.value = response.data.milestoneCurrentSum
  milestonePathKey.value++;
})


function updateTotalSaved(value: number) {
  totalSaved.value += value;
  milestonePathKey.value++;
}
</script>

<template>
  <div id = milestonePathView>
    <h1 id = title>{{pathName}}</h1>
    <div id = mobileButtons>
      <button class = mobileButton @click="showPathField()">Sti</button>
      <button class = mobileButton @click="showInfoFields()">Oversikt</button>
    </div>
    <div id = MilestonePath>
      <div id = Path v-show="showPath">
        <MilestonePath :total-to-save="totalToSave" :total-saved="totalSaved" :key="milestonePathKey"/>
      </div>
      <div id = Info v-show="showInfo">
        <div id = Progress>
          <MilestoneProgress :total-to-save="totalToSave" :total-saved="totalSaved"/>
        </div>
        <div id = Transfer>
          <DirectTransfer @transfer-value="updateTotalSaved"/>
        </div>
        <div id = Description>
          <MilestoneDescription :path-description="pathDescription"/>
        </div>
      </div>
    </div>
  </div>



</template>

<style scoped>

  #milestonePathView{
    height: 100%;
    width: 100%;
  }

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
    height: 70vh;
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

  @media only screen and (max-width: 1000px) {
    #Path{
      height: 60vh;
    }

    #title{
      margin: 0;
      text-align: center;
    }

    #Path{
      width: 100%;
    }

    #Info{
      width: 100%;
    }

    #mobileButtons{
      width: 100%;
      height: 8%;
      margin-bottom: 5%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }

    .mobileButton{
      width: 40%;
      height: 100%;
      background-color: var(--color-confirm-button);
      color: var(--color-buttonText);
      border: 0;
      border-radius: 20px;
      padding: 1%;
      min-width: 30%;
      font-size: 250%;
    }

  }

  @media only screen and (min-width: 900px){
    #mobileButtons{
      display: none;
    }
  }
</style>