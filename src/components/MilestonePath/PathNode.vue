<script setup lang="ts">
import { defineProps, ref } from 'vue'

/**
 * Defines the necessary props for this component
 */
const props = defineProps({
  nodeBackgroundColor: String,
  topBackgroundColor: String,
  bottomBackgroundColor: String,
  nodeNr: Number,
  sum: Number
})

console.log(props.bottomBackgroundColor)
</script>

<template>
  <div class="node-container" v-tooltip :title="'Sparesum: ' + sum?.toString() + 'kr,-'">
    <div class="Node" :style="{ backgroundColor: nodeBackgroundColor }">
      <div id="top" :style="{ backgroundColor: topBackgroundColor }">
        <h3 id="number">{{ props.nodeNr }}</h3>
      </div>
      <div id="bottom" :style="{ backgroundColor: bottomBackgroundColor }"></div>
    </div>
    <div class="image-box">
      <img
        v-if="bottomBackgroundColor === '#6AB40A'"
        src="/src/assets/path-pig.png"
        alt="path-pig"
        class="img"
        width="120px"
      />
    </div>
  </div>
</template>

<style scoped>
.node-container {
  display: flex;
  flex-direction: row;
  margin: 3%;
  gap: 5%;
}

.Node {
  border-radius: 50%;
}

.Node:hover {
  transform: scale(1.05);
}

.image-box {
  display: flex;
  flex-direction: column-reverse;
  max-width: 60px;
  max-height: 60px;
  overflow: visible;
}

#top,
#bottom {
  min-width: 100px;
  min-height: 30px;
  border-radius: 50%;
}

#top {
  display: flex;
  justify-content: center;
  align-items: center;
}

#number {
  perspective: 3000px; /* Adjust perspective value as needed */
  transform: rotateX(50deg);
}

#bottom {
}
</style>
