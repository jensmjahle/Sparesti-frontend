<script setup lang="ts">
import PathNode from '@/components/MilestonePath/PathNode.vue'
import { onMounted, ref } from 'vue'
import { defineProps } from 'vue';

/**
 * Defines the props necessary for this component
 */
const props = defineProps({
  totalToSave: Number,
  totalSaved: Number
});

/**
 * Holds the total amount of nodes to be displayed on the path
 */
const totalNodes = ref(30)

/**
 * Holds the remaining amount of nodes
 */
const remainingNodes = ref(
  totalNodes.value && props.totalSaved && props.totalToSave
    ? Math.ceil(totalNodes.value - (totalNodes.value * (props.totalSaved / props.totalToSave)))
    : 0
);

/**
 * if nothing has been saved set the remaining nodes to equal the total nodes
 */
if(props.totalSaved === 0){
  remainingNodes.value = totalNodes.value;
}

/**
 * Randomizes the offset of each node from the vertical center
 */
const nodes = Array.from({ length: totalNodes.value }, (_, index) => ({
  offset: `${Math.random() > 0.5 ? Math.random() * 2 * 100 + 'px' : '-' + (Math.random() * 2 * 100 + 'px')}`,
  colorIndex: index < remainingNodes.value - 1 ? 0 : (index === remainingNodes.value - 1 ? 1 : 2)
}));


/**
 * Defines the colors for each node based on node state
 */
const nodeForegroundColors = ref(['#CCCCCF', '#A4ED45', '#FCBD47'])
const nodeBackgroundColors = ref(['#A4A4A6', '#6AB40A', '#FFA600'])

/**
 * Scrolls the user vertically to the given percentage
 * @param percentage percentage to scroll to
 */
const scrollToPercentage = (percentage:number) => {
  const learningPath = document.querySelector('.learning-path');
  if (learningPath) {
    const scrollTo = (percentage) * learningPath.scrollHeight;
    learningPath.scrollTo({
      top: scrollTo,
      behavior: 'smooth',
    });
  }
}

/**
 * Logic to execute on component mount
 */
onMounted(() => {
  console.log(remainingNodes.value / totalNodes.value)
  scrollToPercentage((remainingNodes.value / totalNodes.value) - 0.10);
});

</script>

<template>
  <div class="learning-path" v-if="totalToSave">
    <PathNode v-for="(node, index) in nodes" :key="index" :style="{ marginLeft: node.offset }"
              :node-background-color="nodeBackgroundColors[node.colorIndex]"
              :top-background-color="nodeForegroundColors[node.colorIndex]"
              :bottom-background-color="nodeBackgroundColors[node.colorIndex]"
              :node-nr="totalNodes - (index)"
              :sum="Math.ceil((totalToSave / (totalNodes)) * (totalNodes - index-1))"
    />
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
