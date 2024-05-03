<script setup lang="ts">

import BaseInput from '@/components/create-form/BaseInput.vue'
import BaseTextArea from '@/components/create-form/BaseTextArea.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref, computed } from 'vue'
import { createMilestone } from '@/utils/createMilestoneUtils'
import { useTokenStore } from '@/stores/token'
import { useRouter } from 'vue-router'
import { createChallenge } from '@/utils/challengeutils'
import {useToast} from "vue-toast-notification";
const toast = useToast();

const title = ref('')
const description = ref('')
const start_date = ref(new Date())
const end_date = ref()
const goal_sum = ref<number|string>('')
const titleError = ref('')
const descriptionError = ref('')
const dateError = ref('')
const amountError = ref('')
const tokenStore = useTokenStore()
const router = useRouter()

const tomorrow = new Date(start_date.value)
tomorrow.setDate(tomorrow.getDate() + 1)

/**
 * Validates the input values for a challenge form.
 * Updates error messages for title, description, dates, and amount based on input validation.
 * @returns {boolean} Indicates whether the input values are valid (`true`) or not (`false`).
 */
const validate = () => {
  let isValid = true
  titleError.value = ''
  descriptionError.value = ''
  dateError.value = ''
  amountError.value = ''

  if (!title.value.trim()) {
    titleError.value = 'Mangler tittel på utfordringen!'
    isValid = false
  }
  if (!description.value.trim()) {
    descriptionError.value = 'Mangler beskrivelse på utfordringen!'
    isValid = false
  }
  if (!end_date.value) {
    dateError.value = 'Oppgi sluttdato!'
    isValid = false
  }
  if (isNaN(<number>goal_sum.value) || goal_sum.value == '') {
    amountError.value = 'Fyll inn et gyldig sparebeløp!'
    isValid = false
  }

  return isValid
}

/**
 * Computed property that generates an object containing challenge data from reactive values.
 * Retrieves and encapsulates challenge title, description, goal sum, and expiration date.
 * @returns {Object} An object containing challenge data extracted from reactive values.
 */
const challengeData = computed(() => ({
  challengeTitle: title.value,
  challengeDescription: description.value,
  goalSum: goal_sum.value,
  expirationDate: end_date.value ? end_date.value : null,
}))

/**
 * Asynchronously saves challenge input data to the backend.
 * Validates the input data using the `validate` function.
 * If the input data is valid, creates a new challenge with the provided data and navigates to the challenge page upon successful creation.
 * Displays success or error toast messages based on the operation outcome.
 * @returns {Promise<void>} A promise that resolves after attempting to save and create the challenge.
 */
const saveInput = async() => {
  if (validate()) {
    await createChallenge(tokenStore.jwtToken, challengeData.value)
    await router.push('/homepage/challenge')
    toast.success('Utfordringen ble lagret!')
  } else {
    console.log('fail')
    toast.error('Vi klarte ikke lagre! Venligst prøv på nytt.')
  }
}
</script>

<template>
  <div class="create-challenge-view">
    <div class="header">
      <h2 class="title">Ny utfordring!</h2>

      <button class="save-button" id="top-button" @click="saveInput">
        <h3 class="save-button-title">Opprett</h3>
      </button>
    </div>

    <div class="input-container">
      <div class="input" id="title-input" @keyup.enter="saveInput">
        <BaseInput
          v-model="title"
          label="Tittel"
          place-holder="Navn på utfordringen"
          type="email"
          :error="titleError !== ''"
        ></BaseInput>
        <label class="error"
               v-if="titleError">{{ titleError }}</label>
      </div>

      <div class="input-large" @keyup.enter="saveInput">
        <BaseTextArea
          v-model="description"
          label="Beskrivelse"
          place-holder="Beskriv utfordringen"
          :error="descriptionError !== ''"
        ></BaseTextArea>
        <label class="error" v-if="descriptionError">{{ descriptionError }}</label>
      </div>

      <div class="input" @keyup.enter="saveInput">
        <base-input
          v-model="goal_sum"
          place-holder="Hvor mye sparer du av utfordringen?"
          label="Sparesum (nok)"
          :error="amountError !== ''"
        ></base-input>
        <label class="error" v-if="amountError">{{ amountError }}</label>
      </div>

      <div class="smaller-inputs">
        <div class="input" id="nested">
          <h3>Startdato</h3>
          <VueDatePicker
            :enable-time-picker="false"
            placeholder="Velg startdato"
            v-model="start_date"
            :min-date="start_date"
            :disabled="true"
          ></VueDatePicker>
        </div>
        <div class="input" id="nested">
          <h3>Sluttdato</h3>
          <VueDatePicker
            :enable-time-picker="false"
            placeholder="Velg sluttdato"
            v-model="end_date"
            :min-date="tomorrow"
          ></VueDatePicker>
          <label class="error" v-if="dateError">{{ dateError }}</label>
        </div>
      </div>
    </div>
    <div class="submit-button">
      <button class="save-button" @click="saveInput">
        <h3 class="save-button-title">Opprett</h3>
      </button>
    </div>
  </div>
</template>

<style scoped>

.create-challenge-view{
  display: flex;
  flex-direction: column;
  min-height: fit-content;
  place-content: space-between;
  height: 110%;
  width: 100%;
  gap: 2.5%;
}

.header{
  display: flex;
  flex-direction: row;
  place-content: space-between;
  height: 6.0%;
}

.title{
  color: var(--color-header)
}

#top-button{
  height: 100%;
  width: 30%;
}

.input-container {
  display: flex;
  flex-direction: column;
  place-content: space-between;
  text-align: left;
  width: 100%;
  height: 85%;
  gap: 1.0%;
}

.smaller-inputs {
  display: flex;
  flex-direction: row;
  height: 20%;
  width: 100%;
  gap: 2%;
}

.input-large{
  display: flex;
  flex-direction: column;
  height: 60%;
}

.input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  width: 100%;
  height: 20%;
}

label {
  font-size: 1.5em;
}
.submit-button{
  width: 100%;
  height: 10%;
}

.save-button {
  border-radius: 20px;
  color: var(--color-headerText);
  background-color: var(--color-save-button);
  border: none;
  width: 100%;
  height: 100%;
}

.save-button:hover {
  transform: scale(1.02);
}

.save-button:active {
  background-color: var(--color-save-button-click);
}

.save-button-title {
  font-weight: bold;
}

.error {
  color: var(--color-text-error);
  font-size: 15px;
}

@media screen and (max-width: 1000px) {
  .input-container{
    gap: 1.0%;
  }
  .smaller-inputs{
    display: flex;
    flex-direction: column;
    place-content: space-evenly;
    height: 40%;
  }
  .input{
    height: 20%
  }

  #nested{
    height: 50%;
  }


  #title-input{
    height: 20%
  }
}
</style>

