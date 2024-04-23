<script setup lang="ts">
const props = defineProps({
  id: Number,
  title: String,
  description: String
});

</script>

<template>
  <div class="potential-challenge-display">
    <h3 class="title">{{props.title}}</h3>
    <h4 class="description">{{props.description}}</h4>
    <div class="button-container">
      <button class="complete-button">
        <h3 class="complete-button-text">Fullfør</h3>
      </button>
    </div>
  </div>

</template>

<style scoped>
.potential-challenge-display{
  display: flex;
  flex-direction: column;
  padding: 1.5%;
  place-content: space-between;
}
.title{
  text-align: center;
  color: var(--color-text-black);
}

.description{
  text-align: center;
  color: var(--color-text-black);
}

.button-container{
  display: flex;
  width: 100%;
  height: 25%;
  place-content: center;
}

.complete-button{
  border-radius: 20px;
  width: 50%;
  height: 100%;
  border: none;
  background-color: var(--color-save-button);
}

.complete-button:hover{
  transform: scale(1.02);
}

.complete-button:active{
  background-color: var(--color-save-button-click);
}

.complete-button-text{
  color: var(--color-headerText);
  font-weight: bold;
}

</style>