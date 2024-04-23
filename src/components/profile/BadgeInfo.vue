<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps <{
  title: string
}>();

const testData = [
  {
    id:1,
    title: 'Mynt A',
    img:'/src/assets/png/gold-coin.png'
  },
  {
    id:2,
    title: 'Mynt B',
    img:'/src/assets/png/gold-coin.png'
  },
  {
    id:3,
    title: 'Mynt C',
    img:'/src/assets/png/gold-coin.png'
  },
  {
    id:4,
    title: 'Mynt D',
    img:'/src/assets/png/gold-coin.png'
  },
  {
    id:5,
    title: 'Mynt E',
    img:'/src/assets/png/gold-coin.png'
  },
  {
    id:6,
    title: 'Mynt F',
    img:'/src/assets/png/gold-coin.png'
  },
  {
    id:7,
    title: 'Mynt G',
    img:'/src/assets/png/gold-coin.png'
  },
  {
    id:8,
    title: 'Mynt H',
    img:'/src/assets/png/gold-coin.png'
  },
  {
    id:9,
    title: 'Mynt I',
    img:'/src/assets/png/gold-coin.png'
  },
  {
    id:10,
    title: 'Mynt J',
    img:'/src/assets/png/gold-coin.png'
  },

]

const title = ref<string>(props.title)
const achievements = ref<Achievement[]>(testData)

interface Achievement{
  id: number,
  title: string,
  img: string
};

</script>

<template>
  <div class="badge-container">
    <h3 class="title">{{title}}</h3>
    <div class="badges">
      <div class="badge" v-for="(achievement) in achievements" :key="achievement.id">
        <img class="badge-img" :src="achievement.img" :alt="achievement.title">
        <h3 class="badge-title"> {{achievement.title}}</h3>
      </div>
    </div>
    
  </div>

</template>

<style scoped>
.badge-container{
  display: flex;
  flex-direction: column;
  width: 100%;
}
.title{
  font-weight: bold;
}

.badges{
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  width: 100%;
  gap: 2.0%;
}

.badge{
  display: flex;
  flex-direction: column;

  min-width: 10%;
  aspect-ratio: 1/1;
}

.badge-img{
  width: 100%;
}

.badge-title{
  text-align: center;
}

@media only screen and (max-width: 1000px) {
 .badge{
   min-width: 16.5%;
 }
}
</style>