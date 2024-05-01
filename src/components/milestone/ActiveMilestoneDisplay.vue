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

const openMilestone = () => {
  if (props.id !== undefined) {
    useMilestoneStore().setMilestoneId(props.id)
    router.push("/homepage/path")
  }
  console.log("Milestone id is not defined")
}

const daysLeft = () => {
  if(props.deadline){
    const today = new Date();
    const deadlineDate = new Date(props.deadline);
    // Calculate the difference in milliseconds
    const differenceMs = deadlineDate.getTime() - today.getTime();
    // Check if deadline is in the future
    if (differenceMs > 0) {
      // Convert milliseconds to days
      return Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    } else {
      return 0; // Deadline has passed
    }
  }
  return 0; // No deadline specified
}

const isToExpire = () => {
  return (daysLeft() <= 7)
}

</script>

<template>
<div class="active-milestone-display" @click="openMilestone">
  <h2 class="title" :class="{'expire': isToExpire()}">{{props.title}}</h2>
  <div class="img">
    <img class="milestone-img" v-if="props.image" :src="`data:image/png;base64,${props.image}` " id="literal-image" alt="milestone-img">
    <img class="milestone-img" v-else src="/src/assets/background/img.png" alt="Add Image">
  </div>

  <div class="progress-description">
    <h4 class="description" v-if="goalSum&&currentSum">{{props.currentSum}}kr av {{props.goalSum}}kr</h4>
    <h4 class="description" :class="{'expire': isToExpire()}">Dager igjen: {{daysLeft()}}</h4>
  </div>

  <ProgressBar class="progress-bar" :Max="goalSum || 0" :Current="currentSum || 0"/>

</div>
</template>

<style scoped>
.active-milestone-display{
  display:flex;
  flex-direction: column;
  place-content: space-between;
  height: 100%;
  width: 100%;
  padding: 1.5%;
}

h1:hover, h3:hover, h2:hover, h4:hover{
  cursor: pointer;
}

.title{
  text-align: left;
}

.img{
  display: flex;
  height: 100%;
  width: 100%;
  border-radius: 20px;
  place-content: center;
  place-items: center;
  background-color: lightgrey;
  overflow: hidden;
}

.milestone-img{
  display: flex;
  width: 100%;
}

.description{
  text-align: left;
}
.progress-description{
  display: flex;
  flex-direction: row;
  place-content: space-between;
}

.expire{
  color: var(--color-text-error);
}

.progress-bar{
  width: 100%;
}
</style>