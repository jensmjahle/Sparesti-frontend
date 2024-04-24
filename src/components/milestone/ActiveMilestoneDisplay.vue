<script setup lang="ts">
const props = defineProps({
  id: Number,
  title: String,
  description: String
});
</script>

<template>
<div class="active-milestone-display">
  <h3 class="title">{{props.title}}</h3>
  <h4 class="description">{{props.description}}</h4>
  <div class="button-container">
    <button class="complete-button">
      <h3 class="complete-button-text">Fullfør</h3>
    </button>
  </div>
</div>
</template>

<style scoped>

</style>