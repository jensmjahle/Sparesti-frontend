<script setup lang="ts">
import { onMounted } from 'vue'
import { useTokenStore } from '@/stores/token'

/**
 * Calls function logout from useTokenStore to log out any active user whenever they manually route to frontPage.
 * @param {useTokenStore}
 * @returns {void}
 */
onMounted(()=>{
  useTokenStore().cleanStore();
})
</script>

<template>
   <router-view></router-view>
</template>
<style scoped>
</style>