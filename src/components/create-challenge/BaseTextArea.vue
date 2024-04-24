<script setup>
const props = defineProps({
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    placeHolder: {
      type: String,
      default: ''
    }
  }
)
</script>

<template>
  <label>{{ label }}</label>
  <textarea
    :placeholder=placeHolder
    class="field"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<style scoped>
textarea {
  height: 18vh;
  width: 100%;
  border-radius: 20px;
  resize: none;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}

label{
  font-size: 1.5em;
}
</style>
