import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 * Store for managing first-time user answers.
 * @type {Object} FirstTimeAnswersStore
 * @type {import('vue').Ref<any[]>} userResponses - Ref for storing user responses.
 * @type {(index: number, answer: any) => void} setUserAnswer - Function to set user answer at a specific index.
 */

/**
 * Creates and returns a FirstTimeAnswersStore instance.
 */
export const FirstTimeAnswersStore = defineStore('Answers', () => {
  const userResponses = ref<any[]>([])

  /**
   * Sets the user answer at a specific index.
   * @param index - The index where the answer is to be set.
   * @param answer - The answer to set.
   * @returns void
   */
  function setUserAnswer(index: number, answer: any) {
    userResponses.value[index] = answer // Setting user answer at the specified index
    console.log(userResponses.value) // Logging user responses to console
  }

  // Returning the state and actions
  return { userResponses, setUserAnswer }
})
