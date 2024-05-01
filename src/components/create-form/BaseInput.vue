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
    },
  error: Boolean
  }
)

</script>

<template>
  <h3>{{ props.label }}</h3>
  <input
    :placeholder="props.placeHolder"
    class="field"
    :class="{'error': error}"
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
  border: 2px solid var(--color-border);
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
