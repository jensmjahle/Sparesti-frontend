<script setup lang="ts">
import {ref} from "vue";

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
const displayDescription = ref(false)

</script>

<template>
<div class="completed-milestone-display"
     @mouseover="displayDescription = true"
      @mouseleave="displayDescription = false"
     :style="{
            backgroundImage: image ? 'url(' + image + ')' : 'url(' + imageUrl + ')'
        }">
  <h2 class="title">{{props.title}}</h2>
  <div class="info" v-if="!displayDescription">
    <h4  v-if="currentSum">Du sparte {{props.currentSum}}kr</h4>
    <h4 v-if="props.deadline">{{new Date(deadline).getDate()}}/{{new Date(deadline).getMonth()}}-{{new Date(deadline).getFullYear()}}</h4>
  </div>
  <div class="info" v-if="displayDescription">
    <h4>{{props.description}}</h4>
  </div>


</div>
</template>

<style scoped>
.completed-milestone-display{
  display:flex;
  flex-direction: column;
  place-content: space-between;
  padding: 1.5%;
}
.title{
  text-align: left;
}
.info{
  display: flex;
  flex-direction: row;
  text-align: left;
  justify-content: space-between;

}

</style>