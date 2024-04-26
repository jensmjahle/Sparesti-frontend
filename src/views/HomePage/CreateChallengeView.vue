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

const title = ref('')
const description = ref('')
const end_date = ref(new Date(new Date().setDate(new Date().getDate() + 1)))
const goal_sum = ref<number>()
const titleError = ref()
const descriptionError = ref()
const dateError = ref()
const amountError = ref()
const selectError = ref()
const tokenStore = useTokenStore()
const router = useRouter()
const validate = () => {
  let isValid = true
  titleError.value = ''
  descriptionError.value = ''
  dateError.value = ''
  amountError.value = ''
  selectError.value = ''

  if (!title.value.trim()) {
    titleError.value = 'Vennligst sett inn tittel til sparemål'
    isValid = false
  }
  if (!description.value.trim()) {
    descriptionError.value = 'Vennligst skriv hva du ønsker å spare til'
    isValid = false
  }
  if (!end_date.value) {
    dateError.value = 'Vennligst velg både start- og sluttdato'
    isValid = false
  }
  if (isNaN(<number>goal_sum.value)) {
    amountError.value = 'Vennligst bruk bare tall'
    isValid = false
  }

  if (!selectedOption.value) {
    selectError.value = 'Venligst velg tidsramme for utfordring'
    isValid = false
  }

  return isValid
}

const challengeData = computed(() => ({
  challengeTitle: title.value,
  challengeDescription: description.value,
  goalSum: goal_sum.value,
  expirationDate: end_date.value ? end_date.value : null,
  recurring: selectedOption.value
}))

const saveInput = () => {
  if (validate()) {
    createChallenge(tokenStore.jwtToken, challengeData.value)
    router.push('/homepage/challenge')
  } else {
    console.log('fail')
  }
}

const selectedOption = ref<string | null>('')
const dropdownOptions = [
  { label: 'Ingen', value: 0 },
  { label: 'Daglig', value: 86400 }, // 86400 sekunder = 1 dag
  { label: 'Ukentlig', value: 604800 }, // 604800 sekunder = 1 uke
  { label: 'Månedlig', value: 2592000 } // 2592000 sekunder = 1 måned
]

const handleSelectionChange = (value: string | null) => {
  selectedOption.value = value
}

</script>

<template>
  <div id="createContainer">
    <div class="input-container">
      <div class="input">
        <BaseInput
          v-model="title"
          label="Tittel på utfordring"
          place-holder="Navnet på utfordring"
          type="email"
        ></BaseInput>
        <label class="error"
               v-if="titleError">{{ titleError }}</label>
      </div>
      <div class="input">
        <BaseTextArea
          v-model="description"
          label="Beskrivelse"
          place-holder="Vennligst beskriv utfordringen">
        </BaseTextArea>
        <label class="error" v-if="descriptionError">{{ descriptionError }}</label>
      </div>
      <div class="smaller-inputs">
        <div class="input">
          <base-input
            v-model="goal_sum"
            label="Hvor mye vil du spare?"
            place-holder="Sett inn hvor mye som skal for å utføre utfordringen"
            id="test">
          </base-input>
          <label class="error" v-if="amountError">{{ amountError }}</label>
        </div>
      </div>
      <div class="smaller-inputs">
        <div class="input">
          <label>Sett slutt dato</label>
          <VueDatePicker
            :enable-time-picker="false"
            placeholder="Velg slutt dato"
            v-model="end_date"
            auto-apply
            :min-date="end_date"
          ></VueDatePicker>
          <label class="error" v-if="dateError">{{ dateError }}</label>
        </div>
      </div>
      <div class="input">
        <label>Sett inn hvor ofte utfordringen skal forekomme</label>
        <select class="custom-dropdown" v-model="selectedOption" @change="handleSelectionChange(selectedOption)">
          <option disabled value="" selected>Velg tidsramme</option>
          <option v-for="option in dropdownOptions" :key="option.value" :value="option.value">{{ option.label }}
          </option>
        </select>
        <label class="error" v-if="selectError" r>{{ selectError }}</label>
      </div>
      <div class="submit-button">
        <button class="save-button" @click="saveInput">
          <h3 class="save-button-title">Lagre</h3>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  width: 75%;
  height: 100%;
}

.smaller-inputs {
  display: flex;
  flex-direction: row;
  gap: 2%;
  height: 100%;
  width: 100%;
}

.input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  width: 100%;
  height: 100%;
}

#createContainer {
  display: flex;
  align-content: center;
  justify-content: center;
}

label {
  font-size: 1.5em;
}

.custom-dropdown {
  width: 100%;
  height: 7%;
  padding: 8px;
  margin-top: 1%;
  border-radius: 20px;
}

.save-button {
  border-radius: 20px;
  padding-right: 5.0%;
  padding-left: 5.0%;
  margin-top: 5%;
  color: var(--color-headerText);
  background-color: var(--color-save-button);
  border-color: var(--color-border);
  width: 100%;
  height: 20%;
  min-height: 100px;
}

.submit-button-mobile,
.submit-button {
  height: 100%;
  width: 100%;
  display: flex;
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
  color: rgb(189, 0, 0);
  font-size: 15px;
}

@media screen and (max-width: 1200px) {
  .input-container {
    width: 90%;
    margin: 0 auto;
  }

  .smaller-inputs {
    flex-direction: column;
  }

  #createContainer {
    flex-direction: column;
  }


  label {
    font-size: 1.2em;
  }

}
</style>
