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
  error: Boolean
  }
)
</script>

<template>
  <h3>{{ label }}</h3>
  <textarea
    :placeholder=placeHolder
    class="field"
    :class="{'error':error}"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement)?.value)"
  />
</template>

<style scoped>
textarea {
  height: 100%;
  width: 100%;
  border-radius: 20px;
  padding: 1.0%;
  resize: none;
  margin: 8px 0;
  border: 2px solid var(--color-border);
  box-sizing: border-box;
}

.error{
  border-color: var(--color-border-error);
}

@media screen and (max-width: 1200px){
  label{
    font-size: 1.2em;
  }
}
</style>
