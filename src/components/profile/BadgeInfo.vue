<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getLockedAchievements, getUserInfo } from '@/utils/profileutils'
import { useTokenStore } from '@/stores/token'
import { getUserNewAchievements } from "@/utils/userUtils";

interface Achievement{
  achievementId: number,
  achievementTitle: string,
  achievementDescription:string,
  badge: string
}

const props = defineProps <{
  title: string
}>();

const token:string = useTokenStore().jwtToken;

const title = ref<string>(props.title)
const achievements = ref<Achievement[]>([])
const newAchievements = ref<Achievement[]>([])
const achievementsLocked = ref<Achievement[]>([])

onMounted(async () => {
  try {
    await fetchNewAchievements();
    await fetchBadgeInfo();
    await fetchLockedAchievements();
  } catch (error) {
    console.error('Error fetching achievements:', error);
  }
})

const fetchNewAchievements = async () => {
  try {
    newAchievements.value = await getUserNewAchievements()
  } catch (error){
    console.error('Error fetching new achievements:' + error)
  }
}

const fetchBadgeInfo = async () => {
  try {
    const response = await getUserInfo(token);
    achievements.value = response.achievementDTOList.filter(
        (ach: Achievement) => !newAchievements.value.find((newAch) => newAch.achievementId === ach.achievementId)
    );
  } catch (error){
    console.error('Error fetching achievements:' + error)
  }
}

const fetchLockedAchievements = async () => {
  try{
    achievementsLocked.value = await getLockedAchievements(token);
  } catch (error){
    console.log('Error fetching locked achievements:' + error)

  }
}

</script>

<template>
  <div class="badge-container">
    <h3 class="title">{{title}}</h3>
    <div class="badges">
      <div class="badge" v-for="newAchievement in newAchievements" :key="newAchievement.achievementId">
        <h3 class="new-badge-title">New!</h3>
        <img class="badge-img" src="/src/assets/png/gold-coin.png" :alt="newAchievement.achievementTitle">
        <h3 class="badge-title"> {{newAchievement.achievementTitle}}</h3>
      </div>
      <div class="badge" v-for="achievement in achievements" :key="achievement.achievementId">
        <img class="badge-img" src="/src/assets/png/gold-coin.png" :alt="achievement.achievementTitle">
        <h3 class="badge-title"> {{achievement.achievementTitle}}</h3>
      </div>
      <div class="badge" v-for="achievementLocked in achievementsLocked" :key="achievementLocked.achievementId">
        <img class="locked-badge-img" src="/src/assets/png/gold-coin.png" :alt="achievementLocked.achievementTitle">
        <h3 class="badge-title"> {{achievementLocked.achievementTitle}}</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.new-badge-title{
  color: var(--text-color-orange)
}
.badge-container{
  display: flex;
  flex-direction: column;
  min-width: 100%;
  height: 100%;

  overflow-x: scroll;
}
.title{
  font-weight: bold;
}

.badges{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 2.0%;
}

.badge{
  display: flex;
  flex-direction: column;
  width: 15%;
  min-width: 150px;
}
.badge-img{
  width: 100%;
}

.locked-badge-img:hover{
  transform: rotateZ(180deg);
}

.badge-img:hover{
  transform: rotateZ(180deg);
}

.locked-badge-img{
  width: 100%;
  filter: grayscale(100%);
}

.badge-title{
  text-align: center;
}

@media only screen and (max-width: 750px) {
 .badge{
   width: 20%;
 }
}

</style>