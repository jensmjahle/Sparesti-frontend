<script setup lang="ts">
import ProgressBar from "@/components/ProgressBar.vue";
import {useMilestoneStore} from "@/stores/currentMilestone";
import router from "@/router";

const props = defineProps({
  id: Number,
  title: String,
  description: String,
  goalSum: Number,
  currentSum: Number,
  deadline: Date,
  startDate: Date,
  image: String
});
const imageUrl = "src/assets/pig.png"

const openMilestone = () => {
  if (props.id !== undefined) {
    useMilestoneStore().setMilestoneId(props.id)
    router.push("/path")
  }
  console.log("Milestone id is not defined")
}


</script>

<template>
<div class="active-milestone-display"
     @click="openMilestone"
     :style="{
            backgroundImage: image ? 'url(' + image + ')' : 'url(' + imageUrl + ')'
        }">
  <h2 class="title">{{props.title}}</h2>
  <div class="progress">
    <h4 class="description">{{props.description}}</h4>
  <h4 class="description" v-if="goalSum&&currentSum">{{props.currentSum}}kr av {{props.goalSum}}kr</h4>
   <ProgressBar class="progress-bar" :Max="goalSum || 0" :Current="currentSum || 0"/>
  </div>
</div>
</template>

<style scoped>
.active-milestone-display{
  display:flex;
  flex-direction: column;
  place-content: space-between;
  padding: 1.5%;
}
.title{
  text-align: left;
}
.description{
  text-align: left;

}
.progress{
  display: flex;
  flex-direction: column;
  place-content: space-between;
  gap: 2.5%;
  transition: 0.3s;
}
</style>