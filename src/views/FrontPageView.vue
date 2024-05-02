<script setup lang="ts">
import { onMounted } from 'vue'
import { useTokenStore } from '@/stores/token'
onMounted(()=>{
  useTokenStore().logout();
})


</script>

<template>
   <router-view></router-view>
</template>
<style scoped>
</style>