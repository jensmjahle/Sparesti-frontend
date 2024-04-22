<script setup lang="ts">

import ProgressBar from '@/components/ProgressBar.vue'
import TopBanner from '@/components/TopBanner.vue'
import { ref } from 'vue'
import { FirstTimeAnswersStore } from '@/stores/FirstTimeAnswers'
import router from '@/router'

const questions = ["Hva er fødselsdatoen din?",
  "Hva er ditt fornavn?",
  "Hva er ditt etternavn?",
  "Hvor stor intekt har du hver måned?",
  "Hvor mye har du i faste utgifter hver måned?",
  "Velg din brukskonto",
  "Velg din sparekonto",
]

const accounts = ["Account 1", "Account 2", "Account 3"]

let index = 0;
let currentQuestion = ref(questions[index])

const questionType = ["date", "text", "text", "number", "number", "selection", "selection"]
let currentQuestionType = ref(questionType[index])

const answer = ref(FirstTimeAnswersStore().userResponses[index]);

const showInput = ref(true);
const showSelect= ref(false);

const selectedOption = ref(accounts.indexOf(FirstTimeAnswersStore().userResponses[index]))

async function nextQuestion(){
  if(index !== questions.length - 1){
    nextButtonText.value = "Neste"
    if(currentQuestionType.value !== "selection"){
      FirstTimeAnswersStore().setUserAnswer(index, answer.value)
    }
    index++
    currentQuestion.value = questions[index]
    currentQuestionType.value = questionType[index]
    await new Promise(resolve => setTimeout(resolve, 50));
    answer.value= FirstTimeAnswersStore().userResponses[index]
    if(currentQuestionType.value === "selection"){
      selectedOption.value = accounts.indexOf((FirstTimeAnswersStore().userResponses[index]))
      showInput.value = false;
      showSelect.value = true;
    } else {
      showInput.value = true;
      showSelect.value = false;
    }
  } else {
    router.push("/homepage/home")
  }
  if(index === questions.length -1){
    nextButtonText.value = "Fullfør"
  }
}

async function prevQuestion(){
  if(index !== 0){
    if(currentQuestionType.value !== "selection"){
      FirstTimeAnswersStore().setUserAnswer(index, answer.value)
    }
    index--
    currentQuestion.value = questions[index]
    currentQuestionType.value = questionType[index]
    await new Promise(resolve => setTimeout(resolve, 50));
    answer.value= FirstTimeAnswersStore().userResponses[index]
    if(currentQuestionType.value === "selection"){
      selectedOption.value = accounts.indexOf((FirstTimeAnswersStore().userResponses[index]))
      showInput.value = false;
      showSelect.value = true;
    } else {
      showInput.value = true;
      showSelect.value = false;
    }
  }
  nextButtonText.value = "Neste"
}

const nextButtonText = ref("Neste")


function updateSelectedOption() {
  FirstTimeAnswersStore().setUserAnswer(index, accounts[selectedOption.value])
}


</script>

<template>
  <div id = RegisterPage>
    <TopBanner/>
    <ProgressBar :Max="questions.length" :Current="index"/>
    <div id = QuestionArea>
      <h2>{{currentQuestion}}</h2>
      <input id = answerField :type=currentQuestionType v-model="answer" v-show="showInput">
      <select id = selectField v-show="showSelect" @change="updateSelectedOption" v-model="selectedOption">
        <option value="" disabled selected>Velg konto</option>
        <option v-for="(option, index) in accounts" :key="index" :value="index">{{ option }}</option>
      </select>
    </div>
    <div id = buttons>
      <button id = backButton @click ="prevQuestion()" :disabled="index === 0" :class="{ 'active': index !==0, 'disabled': index === 0 }">Tilbake</button>
      <button id = nextButton @click="nextQuestion()">{{ nextButtonText }}</button>
    </div>
  </div>
</template>

<style scoped>

  #RegisterPage{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  #answerField, #selectField{
    margin: 5%;
    border-radius: 20px;
    width: 90%;
    height: 20%;
    border: 2px solid var(--color-border);
    font-size: 2em;
  }

  #QuestionArea{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 50%;
    height: 50%;
    border-radius: 20px;
    border: 2px solid var(--color-border);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
    margin-top: 1%;
  }

  #buttons{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 20%;
    margin-top: 1%;
  }

  .active, #nextButton{
    width: 15%;
    height: 50%;
    color: var(--color-buttonText);
    border: 0;
    border-radius: 20px;
    font-size: 2em;
  }

  .active:hover, #nextButton:hover{
    transform: scale(1.05);
  }

  .active{
    background-color: var(--color-cancel-button);
  }

  .disabled{
    width: 15%;
    height: 50%;
    background-color: var(--color-inactive-button);
    color: var(--color-inactive-button-text);
    border: 0;
    border-radius: 20px;
    font-size: 2em;
  }

  #nextButton{
    background-color: var(--color-confirm-button);
  }

  @media only screen and (max-width: 1000px) {

    #QuestionArea{
      width: 90%;
    }

    #backButton, #nextButton{
      width: 40%;
    }
  }

</style>