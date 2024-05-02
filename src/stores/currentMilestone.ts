import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMilestoneStore = defineStore('milestoneId', () => {
  const milestoneId = ref<number>(0);

  function setMilestoneId(id: number){
    milestoneId.value = id
    console.log(id)
  }

  return { milestoneId, setMilestoneId}
}, {
  persist: {
    storage: sessionStorage,
  },
})