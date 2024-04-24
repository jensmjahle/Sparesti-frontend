<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getUserInfo } from '@/utils/profileutils'
interface Achievement{
  id: number,
  title: string,
  img: string
}

const props = defineProps <{
  title: string
}>();

const title = ref<string>(props.title)
const achievements = ref<Achievement[]>([])

onMounted(async () => {
  try {
    await fetchBadgeInfo()
  } catch (error) {
    console.error('Error fetching achievements:', error);
  }
})

const fetchBadgeInfo = async ()=>{
  try {
    const response = await getUserInfo()
    console.log(response)
    achievements.value = response.achievements;
  } catch (error){
    console.error('Error fetching achievements:')
  }
}

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