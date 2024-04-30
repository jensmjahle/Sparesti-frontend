<script setup lang="ts">


import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref, computed, onMounted } from 'vue'

import { useTokenStore } from '@/stores/token'
import { useMilestoneStore } from '@/stores/currentMilestone'
import { getMilestoneDetails, updateMilestoneDetails } from '@/utils/MilestonePathUtils'
import { useRouter } from 'vue-router'
import BaseTextArea from '@/components/create-form/BaseTextArea.vue'
import BaseInput from '@/components/create-form/BaseInput.vue'
const title = ref('')
const description = ref('')
const end_date = ref()
const current_sum = ref<number>()
const goal_sum = ref<number>()
const start_date = ref(new Date())
const titleError = ref()
const descriptionError = ref()
const dateError = ref()
const amountError = ref()
const image = ref()
const tokenStore = useTokenStore()
const milestoneStore = useMilestoneStore()
const router = useRouter()


onMounted(async () => {
  const milestoneId = useMilestoneStore().milestoneId;
  console.log(milestoneId)
  const response = await getMilestoneDetails(milestoneStore.milestoneId)
  const data = response.data
  title.value = data.milestoneTitle
  description.value = data.milestoneDescription
  goal_sum.value = data.milestoneGoalSum
  current_sum.value = data.milestoneCurrentSum
  start_date.value = data.startDate
  end_date.value = data.deadlineDate
  image.value = data.milestoneImage ? `data:image/png;base64,${data.milestoneImage}` : null;
  console.log(image.value)
  console.log(data.milestoneImage)
})
const validate = () => {
  let isValid = true
  titleError.value = ''
  descriptionError.value = ''
  dateError.value = ''
  amountError.value = ''

  if (!title.value.trim()) {
    titleError.value = 'Vennligst sett inn tittel til sparemål'
    isValid = false
  }
  if (!description.value.trim()) {
    descriptionError.value = 'Vennligst skriv hva du ønsker å spare til'
    isValid = false
  }
  if (!start_date.value || !end_date.value) {
    dateError.value = 'Vennligst velg både start- og sluttdato'
    isValid = false
  }
  if (isNaN(<number>current_sum.value) || isNaN(<number>goal_sum.value)) {
    amountError.value = 'Vennligst bruk bare tall'
    isValid = false
  }

  if (<number>goal_sum.value < <number>current_sum.value) {
    amountError.value = 'Målet kan ikke være større enn det nåværende beløpet';
    isValid = false;
  }

  return isValid
}

const milestoneData = computed(() => ({
  milestoneId: milestoneStore.milestoneId,
  milestoneTitle: title.value,
  milestoneDescription: description.value,
  milestoneGoalSum: goal_sum.value,
  milestoneCurrentSum: current_sum.value,
  milestoneImage: image.value ? image.value : null,
  deadlineDate: end_date.value ? end_date.value : null,
  startDate: start_date.value ? start_date.value : null
}));

const saveInput = () => {
  if (validate()) {
    console.log(milestoneData.value)
    const response = updateMilestoneDetails(milestoneData.value)
    console.log(response)
    router.push('/homepage/milestone')
  } else {
    console.log('fail')
  }
}

const handleFileChange = (event: any) => {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    image.value = e.target?.result
  }
  reader.readAsDataURL(file)
}

const fileInput = ref<HTMLInputElement | null>(null);

const openFileExplorer = () => {
  if (fileInput.value instanceof HTMLInputElement) {
    fileInput.value.click();
  }
};
</script>

<template>
  <div id="createContainer">
    <div class="input-container">
      <div class="input">
        <BaseInput
          v-model="title"
          label="Tittel på sparesti"
          place-holder="Navnet på sparestien"
          type="email"
        ></BaseInput>
        <label class="error"
               v-if="titleError">{{ titleError }}</label>
      </div>
      <div class="input">
        <BaseTextArea
          v-model="description"
          label="Beskrivelse"
          place-holder="Vennligst beskriv sparestien">
        </BaseTextArea>
        <label class="error" v-if="descriptionError">{{ descriptionError }}</label>
      </div>
      <div class="smaller-inputs">
        <div class="input">
          <base-input
            v-model="goal_sum"
            label="Hvor mye vil du spare?"
            place-holder="Sett inn hvor mye du vil spare"
            id="test">
          </base-input>
          <label class="error" v-if="amountError">{{ amountError }}</label>
        </div>
        <div class="input">
          <base-input
            v-model="current_sum"
            place-holder="Sett inn hvor mye du har"
            label="Hvor mye har du nå?">
          </base-input>
          <label class="error" v-if="amountError">{{ amountError }}</label>
        </div>
      </div>
      <div class="smaller-inputs">
        <div class="input">
          <label>Sett start dato</label>
          <VueDatePicker
            :enable-time-picker="false"
            placeholder="Velg start dato"
            v-model="start_date"
            :min-date="start_date"
          ></VueDatePicker>
          <label class="error" v-if="dateError">{{ dateError }}</label>
        </div>
        <div class="input">
          <label>Sett slutt dato</label>
          <VueDatePicker
            :enable-time-picker="false"
            tabindex="0"
            placeholder="Velg slutt dato"
            v-model="end_date"
            :min-date="start_date"
          ></VueDatePicker>
          <label class="error" v-if="dateError">{{ dateError }}</label>
        </div>
      </div>
      <div class="submit-button">
        <button class="save-button" @click="saveInput">
          <h3 class="save-button-title">Lagre</h3>
        </button>
      </div>
    </div>
    <div class="image-container">
      <label>Legg til et bilde</label>
      <div class="add-image-box">
        <button @click="openFileExplorer" tabindex="0" type="button">
          <input type="file" style="display: none" ref="fileInput" accept="image/png, image/jpeg"
                 @change="handleFileChange">
          <img v-if="image" :src="image" id="literal-image" alt="Selected Image" width="150px" height="150px">
          <img v-else src="../../components/icons/image/AddImage.png" alt="Add Image" width="50px" height="50px">
        </button>
      </div>
      <!--        <div class="existing-pictures">-->
      <!--          <div class="existing-image-box"></div>-->
      <!--          <div class="existing-image-box"></div>-->
      <!--        </div>-->
      <div class="submit-button-mobile">
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
  width: 50%;
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
  flex-direction: row;
  row-gap: 3%;
  margin-left: 1%;
}

label {
  font-size: 1.5em;
}

.add-image-box {
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */

  width: 75%;
  height: 340px;
}

.existing-image-box {
  display: flex;
  width: 50%;
  height: auto;
  min-height: 180px;
}

.add-image-box,
.existing-image-box {
  border: 2px solid darkgray;
  border-radius: 20px;
  box-sizing: border-box;

  font-size: 12px;
  color: darkgray;
  padding: 10px;
  gap: 10px;
  background-color: var(--color-background);
}

.image-container {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.existing-pictures {
  height: 100%;
  width: 100%;
  display: flex;
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

.submit-button-mobile {
  display: none;
}

.error {
  color: rgb(189, 0, 0);
  font-size: 15px;
}
#literal-image{
  height: 100%;
  max-height: 300px;
  width: 100%;
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

  .submit-button {
    display: none;
  }

  .submit-button-mobile {
    display: block;
  }

  .image-container {
    margin-top: 5%;
    width: 100%;
  }

  label {
    font-size: 1.2em;
  }

  .add-image-box {
    height: 170px;
  }

  #literal-image{
    max-height: 155px;
  }
}
</style>
