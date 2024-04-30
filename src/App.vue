<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <RouterView />
  </div>
</template>
<style>
.app{
  height: 100vh;
  width: 100vw;
}

button:hover{
  cursor: pointer;
  h1:hover, h3:hover, h2:hover, h4:hover{
    cursor: pointer;
  }
}

h1:hover, h3:hover, h2:hover, h4:hover{
  cursor: default;
}

</style>
