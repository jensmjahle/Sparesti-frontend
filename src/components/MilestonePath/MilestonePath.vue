<script setup lang="ts">
import PathNode from '@/components/MilestonePath/PathNode.vue'
import { ref } from 'vue'
import { defineProps } from 'vue';


const props = defineProps({
  totalToSave: Number,
  totalSaved: Number
});

const totalNodes = ref(props.totalToSave ? Math.ceil(props.totalToSave / 250) : 0);
console.log("TotalNodes: " + totalNodes.value)
const remainingNodes = ref(
  totalNodes.value && props.totalSaved && props.totalToSave
    ? Math.ceil(totalNodes.value - (totalNodes.value * (props.totalSaved / props.totalToSave)))
    : 0
);
console.log(("RemainingNodes: " + remainingNodes.value))

if(props.totalSaved === 0){
  remainingNodes.value = totalNodes.value;
}

const nodes = Array.from({ length: totalNodes.value }, (_, index) => ({
  offset: `${Math.random() > 0.5 ? Math.random() * 2 * 100 + 'px' : '-' + (Math.random() * 2 * 100 + 'px')}`,
  colorIndex: index < remainingNodes.value - 1 ? 0 : (index === remainingNodes.value - 1 ? 1 : 2)
}));



const nodeForegroundColors = ref(['#CCCCCF', '#A4ED45', '#FCBD47'])
const nodeBackgroundColors = ref(['#A4A4A6', '#6AB40A', '#FFA600'])

</script>

<template>
  <div class="learning-path">
    <PathNode v-for="(node, index) in nodes" :key="index" :style="{ marginLeft: node.offset }"
              :node-background-color="nodeBackgroundColors[node.colorIndex]"
              :top-background-color="nodeForegroundColors[node.colorIndex]"
              :bottom-background-color="nodeBackgroundColors[node.colorIndex]"/>
  </div>
</template>

<style scoped>
.learning-path {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.learning-path::-webkit-scrollbar {
  display: none;
}
</style>
