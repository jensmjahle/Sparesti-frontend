<script setup lang="ts">
import { defineProps } from 'vue';


const props = defineProps({
  nodeBackgroundColor: String,
  topBackgroundColor: String,
  bottomBackgroundColor: String,
  nodeNr:Number
});
</script>

<template>
  <div class="Node" :style="{ backgroundColor : nodeBackgroundColor}">
    <div id = top :style="{backgroundColor : topBackgroundColor}">
      <h3 id = number>{{props.nodeNr}}</h3>
    </div>
    <div id = bottom :style="{backgroundColor: bottomBackgroundColor}"></div>
  </div>
</template>

<style scoped>

  .Node{
    border-radius: 50%;
    margin: 3%;
  }

  #top, #bottom{
    min-width: 100px;
    min-height: 30px;
    border-radius: 50%;
  }

  #top{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #number{
    perspective: 3000px; /* Adjust perspective value as needed */
    transform: rotateX(50deg);
  }

  #bottom{
  }


</style>