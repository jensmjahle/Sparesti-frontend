<script setup lang="ts">

import {getUserTotalSavings} from '@/utils/HomePageUtils'
import { ref } from 'vue'

const saved = ref(0)

async function userSavings(){
  saved.value = await getUserTotalSavings()
}

userSavings()

</script>

<template>
  <div id = TotalSavings>
    <img src="../../assets/png/pig_394778.png" alt = "logo" id = "logo"/>
    <div id = SavingsText>
      <h3 id = SavedInfo>Du har spart totalt: </h3>
      <h3 id = Saved>{{ saved }} nok</h3>
    </div>
  </div>
</template>

<style scoped>
#TotalSavings{
  margin-right: 5%;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  padding: 1% 3% 1% 3%;
  display: flex;
}

#logo{
  max-width: 7vh;
  max-height: 7vh;
  margin-right: 5%;
}

#SavingsText{
  display: flex;
  flex-direction: column;
}

#SavedInfo{
  white-space: nowrap;
}

#Saved{
  font-weight: bold;
}

@media only screen and (max-width: 1000px) {
  #TotalSavings{
    margin-right: 0;
  }
}
</style>