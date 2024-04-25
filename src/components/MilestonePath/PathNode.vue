<script setup lang="ts">
import { defineProps } from 'vue';


const props = defineProps({
  nodeBackgroundColor: String,
  topBackgroundColor: String,
  bottomBackgroundColor: String
});
</script>

<template>
  <div class="Node" :style="{ backgroundColor : nodeBackgroundColor}">
    <div id = top :style="{backgroundColor : topBackgroundColor}"></div>
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
  }

  #bottom{
  }


</style>