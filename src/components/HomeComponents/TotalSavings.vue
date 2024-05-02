<script setup lang="ts">

import { defineProps } from 'vue'

const props = defineProps({
  totalSaved: Number
});


</script>

<template>
  <div id = TotalSavings>
    <img src="../../assets/png/pig_394778.png" alt = "logo" id = "logo"/>
    <div id = SavingsText>
      <h3 id = SavedInfo>Du har spart totalt: </h3>
      <h3 id = Saved>{{ props.totalSaved }} NOK</h3>
    </div>
  </div>
</template>

<style scoped>
#TotalSavings{
  width: 100%;
  margin-right: 5%;
  align-items: center;

  box-shadow: 0 4px 4px var(--color-shadow);
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
  flex-direction: row;
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