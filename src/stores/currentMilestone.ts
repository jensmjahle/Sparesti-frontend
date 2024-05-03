import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 * Store for managing milestone-related data.
 * @type {Object} MilestoneStore
 * @type {import('vue').Ref<number>} milestoneId - Ref for storing the current milestone ID.
 * @type {(id: number) => void} setMilestoneId - Function to set the milestone ID.
 */

/**
 * Creates and returns a MilestoneStore instance.
 */
export const useMilestoneStore = defineStore('milestoneId', () => {
  const milestoneId = ref(0); // Initializing milestoneId with 0

  /**
   * Sets the milestone ID.
   * @param id - The ID of the milestone to set.
   * @returns void
   */
  function setMilestoneId(id: number) {
    milestoneId.value = id; // Updating the milestoneId with the provided id
    console.log(id); // Logging the id to console
  }


  return { milestoneId, setMilestoneId}
}, {
  persist: {
    storage: sessionStorage,
  },
})
