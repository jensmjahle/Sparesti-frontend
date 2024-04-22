import { ref } from 'vue'
import { defineStore } from 'pinia'

export const FirstTimeAnswersStore = defineStore('Answers', () => {
  const userResponses = ref<any[]>([]);

  function setUserAnswer(index: number, answer: any){
    userResponses.value[index] = answer
    console.log(userResponses.value)
  }

  return { userResponses, setUserAnswer}
})