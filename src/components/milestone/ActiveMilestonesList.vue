<script setup lang="ts">

import ActiveMilestoneDisplay from '@/components/milestone/ActiveMilestoneDisplay.vue'
import { onMounted, ref } from 'vue'
import { useTokenStore } from '@/stores/token'
import { getAllMilestones } from '@/utils/MilestoneUtils'
import router from '@/router'

interface Milestone{
  milestoneId: number;
  milestoneTitle: string;
  milestoneDescription: string
  milestoneGoalSum: number;
  milestoneCurrentSum: number;
  deadlineDate: Date;
  startDate: Date;
  milestoneImage: string;
  username: string;
}

const activeMilestones = ref(<Milestone[]>[])

onMounted(async () => {
  const token = useTokenStore().$state.jwtToken
  activeMilestones.value = await getAllMilestones(token);
})

</script>

<template>
  <div class="active-milestones">
    <template v-if="activeMilestones.length === 0">
      <h4>Opps, her var det tomt.<br>Lag ditt første sparemål for å komme i gang!</h4>
    </template>
    <template v-else>
      <ActiveMilestoneDisplay
        class="active-milestone"
        v-for="(activeMilestone, index) in activeMilestones"
        :key="index"
        :id="activeMilestone.milestoneId"
        :title="activeMilestone.milestoneTitle"
        :description="activeMilestone.milestoneDescription"
        :goalSum="activeMilestone.milestoneGoalSum"
        :currentSum="activeMilestone.milestoneCurrentSum"
        :deadline="activeMilestone.deadlineDate"
        :startDate="activeMilestone.startDate"
        :image="activeMilestone.milestoneImage"
      ></ActiveMilestoneDisplay>
    </template>
  </div>
</template>

<style scoped>
.active-milestones{
  display: flex;
  flex-direction: column;
  text-align: center;

  height: 100%;
  width: 100%;
  gap: 2.5%;
}

.active-milestone{
  border-radius: 20px;
  border: 2px solid var(--color-border);
  box-shadow: 0 4px 4px var(--color-shadow);

  min-height: 30%;
  width: 100%;
}

.active-milestone:hover{
  transform: scale(1.02);
  transition: 0.3s;
}

</style>