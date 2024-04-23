<script setup lang="ts">
import {ref} from 'vue'
const props = defineProps({
  title: String,
  date: String,
  amount: Number,
  category: String
})

const isExpanded = ref(false)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
  console.log(isExpanded.value)
}

</script>

<template>
  <div class="component" :class="{ expanded: isExpanded }" @click="toggleExpand">
    <div class="component-left">
      <div class="component-title">
        {{title}}
      </div>
    </div>
    <div class="component-right">
      <div class="component-right-field">
        <span> Dato: {{date}}</span>
      </div>
      <div class="component-right-field">
        <span>
          {{amount}}kr
        </span>
      </div>
      <div class="component-right-field">
        <span>
          {{category}}
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
  width: 80%;
  height: 10%;
  margin-bottom: 2.5%;
  display:flex;
  overflow: hidden;
  transition: height 0.3s ease;
  background-color: var(--vt-c-kellyGreen-Light)
}

.component.expanded {
  height: auto; /* Allow the component to expand */
}
.component-left{
  width:50%;
  height:100%;
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
  font-size:1.4em;
  word-break: break-word;
  color: black;

}

.component-right-field {
  display: flex;
  height: 100%;
  width: 95%;
  justify-content: right;
  font-size: 1em;
}


@media screen and (max-width: 600px) {
  .component {
    width: 90% ;
    height: 10%;
  }

  .component-title {
    font-size: 2.3em; /* Adjust font size for smaller screens */
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 20px;
  }


  .component-right-field {
    display: flex;
    height: 95%;
    width: 95%;
    justify-content: right;
    font-size: 1.9em; /* Adjust font size for smaller screens */
  }


}

</style>
