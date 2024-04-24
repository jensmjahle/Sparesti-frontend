import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMilestoneStore = defineStore('milestoneId', () => {
  const milestoneId = ref<number>();

  function setMilestoneId(id: number){
    milestoneId.value = id
  }

  return { milestoneId, setMilestoneId}
})