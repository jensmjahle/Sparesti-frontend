<script setup lang="ts">
import { ref } from 'vue'

/**
 * Defines the required props for the component
 */
const props = defineProps({
  title: String,
  date: String,
  amount: Number,
  category: String
})

/**
 * Keeps track of expansion
 */
const isExpanded = ref(false)

/**
 * Toggles expansion on or off
 */
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

/**
 * Calculates the date
 */
const calculateDate = () => {
  if (props.date) {
    return new Date(props.date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }
}
</script>

<template>
  <div class="component" :class="{ expanded: isExpanded }" @click="toggleExpand">
    <div class="component-left">
      <div class="component-title">
        {{ title }}
      </div>
    </div>
    <div class="component-right">
      <div class="component-right-field">
        <span> Dato: {{ calculateDate() }}</span>
      </div>
      <div class="component-right-field">
        <span> {{ amount }}kr </span>
      </div>
      <div class="component-right-field">
        <span>
          {{ category }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.component {
  border-radius: 20px;
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 4px 0 var(--color-shadow);
  width: 100%;
  height: 100%;
  margin-bottom: 2.5%;
  display: flex;
  overflow: hidden;
  transition: height 0.3s ease;
  background-color: var(--vt-c-Orange);
}

.component-left {
  width: 50%;
  height: 100%;
}
.component-right {
  display: flex;
  flex-direction: column;
  width: 55%;
  height: 100%;
}

.component-title {
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 20px;
  font-size: 1.4em;
  word-break: break-word;
  color: white;
}

.component-right-field {
  display: flex;
  height: 100%;
  width: 95%;
  justify-content: right;
  font-size: 1em;
  color: white;
}
</style>
