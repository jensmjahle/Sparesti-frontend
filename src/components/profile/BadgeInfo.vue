<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps <{
  title: string
}>();

const title = ref<string>(props.title)

</script>

<template>
  <div class="badge-container">
    <h3 class="title">{{title}}</h3>
  </div>

</template>

<style scoped>
.badge-container{
  display: flex;
  flex-direction: column;
}
.title{
  font-weight: bold;
}

</style>