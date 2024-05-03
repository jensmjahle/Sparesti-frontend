<script setup lang="ts">
import {ref} from 'vue'
const chartVisible = ref(false)
const emit = defineEmits(['toggle-chart'])
const isChecked = ref(false)

/**
 * Toggles the visibility of the pie chart of all expenses
 * emits a toggle-char event to the parent
 */
const toggleChart = () => {
  chartVisible.value = !isChecked.value
  emit('toggle-chart', isChecked.value)
}

</script>

<template>
  <label class="toggle-switch">
    <input type="checkbox" v-model="isChecked" @change="toggleChart" />
    <span class="slider"></span>
  </label></template>
<style scoped>
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}
</style>
