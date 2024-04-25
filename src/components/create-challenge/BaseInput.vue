<script setup lang="ts">
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
    },
    type: {
      type: String,
      default: ''
    }
  }
)

</script>

<template>
  <label>{{ label }}</label>
  <input
    :placeholder="placeHolder"
    class="field"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement)?.value)"
    :type="type"
  >
</template>

<style scoped>
input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border-radius: 20px;
}

label {
  font-size: 1.5em;
}

@media screen and (max-width: 1200px){
  label{
    font-size: 1.2em;
  }
}
</style>
