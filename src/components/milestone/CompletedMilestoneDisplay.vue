<script setup lang="ts">

const props = defineProps({
  id: Number,
  title: String,
  description: String,
  goalSum: Number,
  currentSum: Number,
  deadline: Date,
  startDate: Date,
  image: String,
  expanded: Boolean
});

</script>

<template>
<div class="completed-milestone-display" tabindex="0">
  <h2 class="title">{{props.title}}</h2>
  <div class="center-content">
    <div class="img">
      <img src="/src/assets/background/img.png" alt="milestone-img" class="milestone-img">
    </div>
    <div class="description-info" :class="{'expanded':expanded}">
      <h4 class="description-title">Beskrivelse: </h4>
      <h4 class="description">{{props.description}}</h4>
    </div>
  </div>

  <div class="info">
    <h4  v-if="currentSum">Du sparte {{props.currentSum}}kr av {{props.goalSum}}kr</h4>
    <h4 v-if="deadline">{{new Date(deadline).getDate()}}/{{new Date(deadline).getMonth()}}-{{new Date(deadline).getFullYear()}}</h4>
  </div>

</div>
</template>

<style scoped>
.completed-milestone-display{
  display:flex;
  flex-direction: column;
  place-items: start;
  height: 100%;
  width: 100%;
  padding: 1.5%;
  color: var(--color-text-black);
}

h1:hover, h3:hover, h2:hover, h4:hover{
  cursor: pointer;
}

.title{
  place-content: start;
}

.center-content{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
}

.img{
  display: flex;
  border-radius: 10px;
  background-color: lightgrey;
  place-content: center;
  place-items: center;
  height: 10vh;
  min-height: 50px;
  overflow: hidden;
}

.milestone-img{
  display: flex;
  filter: grayscale(100%);
  width: 100%;
}

.description-info{
  display: none;
}

.expanded{
  display: flex;
  flex-direction: column;
  height: 50%;
  width: 100%;
  align-content: start;
  place-content: start;
  text-align: start;
}

.description-title{
  text-decoration: underline;
}

.description{
  overflow-y: scroll;
}

.info{
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  text-align: left;
  justify-content: space-between;
  align-content: end;
  place-items: end;

}

</style>