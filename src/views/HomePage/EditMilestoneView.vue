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
import eventBus from '@/components/service/eventBus.js'
const title = ref('')
const description = ref('')
const end_date = ref()
const current_sum = ref<string | number>('')
const goal_sum = ref<string | number>('')
const start_date = ref(new Date())
const titleError = ref('')
const descriptionError = ref('')
const dateError = ref('')
const amountErrorGoal = ref('')
const amountErrorStart = ref('')
const image = ref()

const milestoneStore = useMilestoneStore()
const router = useRouter()

const tomorrow = new Date(start_date.value)
tomorrow.setDate(tomorrow.getDate() + 1)

/**
 * Lifecycle hook that runs when the component is mounted.
 * Retrieves milestone details based on the current milestone ID and populates reactive values with the fetched data.
 * Redirects to '/homepage/milestone' if milestone details are not found.
 * @returns {Promise<void>} A promise that resolves when milestone details are fetched and reactive values are updated.
 */
onMounted(async () => {
  const milestoneId = useMilestoneStore().milestoneId
  console.log(milestoneId)
  const response = await getMilestoneDetails(milestoneStore.milestoneId)
  if (response === null) {
    await router.push('/homepage/milestone')
  } else {
    const data = response.data
    title.value = data.milestoneTitle
    description.value = data.milestoneDescription
    goal_sum.value = data.milestoneGoalSum
    current_sum.value = data.milestoneCurrentSum
    start_date.value = data.startDate
    end_date.value = data.deadlineDate
    image.value = data.milestoneImage ? `data:image/png;base64,${data.milestoneImage}` : null
    console.log(image.value)
    console.log(data.milestoneImage)
  }
})

/**
 * Validates the input fields for the milestone form.
 * Updates error messages for invalid fields and checks various conditions for validity.
 * @returns {boolean} A boolean indicating whether the input fields are valid (true) or not (false).
 */
const validate = () => {
  let isValid = true
  titleError.value = ''
  descriptionError.value = ''
  dateError.value = ''
  amountErrorGoal.value = ''
  amountErrorStart.value = ''

  if (!title.value.trim()) {
    titleError.value = 'Mangler tittel på sparemålet!'
    isValid = false
  }
  if (!description.value.trim()) {
    descriptionError.value = 'Mangler beskrivelse på sparemålet!'
    isValid = false
  }
  if (!start_date.value || !end_date.value) {
    dateError.value = 'Oppgi sluttdato!'
    isValid = false
  }
  if (isNaN(<number>current_sum.value) || current_sum.value == '') {
    amountErrorStart.value = 'Fyll inn et gyldig beløp!'
    isValid = false
  }

  if (isNaN(<number>goal_sum.value) || goal_sum.value == '') {
    amountErrorGoal.value = 'Fyll inn et gyldig beløp!'
    isValid = false
  }

  if (
    parseInt(<string>goal_sum.value) <= parseInt(<string>current_sum.value) &&
    amountErrorStart.value == ''
  ) {
    amountErrorStart.value = 'Nåværende beløp kan ikke være lik eller større enn sparebeløpet!'
    isValid = false
  }
  return isValid
}

/**
 * Computed property that represents milestone data derived from reactive values.
 * @returns {Object} An object containing milestone data based on current reactive values.
 * @property {number} milestoneId - The ID of the milestone.
 * @property {string} milestoneTitle - The title of the milestone.
 * @property {string} milestoneDescription - The description of the milestone.
 * @property {number} milestoneGoalSum - The goal sum of the milestone.
 * @property {number} milestoneCurrentSum - The current sum achieved for the milestone.
 * @property {string} milestoneImage - The image URL of the milestone (or an empty string if not set).
 * @property {Date|null} deadlineDate - The deadline date of the milestone (or null if not set).
 * @property {Date|null} startDate - The start date of the milestone (or null if not set).
 */
const milestoneData = computed(() => ({
  milestoneId: milestoneStore.milestoneId,
  milestoneTitle: title.value,
  milestoneDescription: description.value,
  milestoneGoalSum: goal_sum.value,
  milestoneCurrentSum: current_sum.value,
  milestoneImage: image.value ? image.value : '',
  deadlineDate: end_date.value ? end_date.value : null,
  startDate: start_date.value ? start_date.value : null
}))

/**
 * Saves input by updating milestone details and navigating to the milestone page if input is valid.
 * Logs 'fail' to console if input validation fails.
 * @returns {Promise<void>} A promise that resolves after milestone details are updated and navigation is complete.
 */
const saveInput = async () => {
  if (validate()) {
    await updateMilestoneDetails(milestoneData.value)
    await router.push('/homepage/milestone')
  } else {
    console.log('fail')
  }
}

/**
 * Handles the change event when a file input's value changes.
 * Reads the selected file using `FileReader` and sets the `image.value` to the data URL of the loaded file.
 * @param {Event} event - The change event object triggered by the file input.
 * @returns {void} This function does not return a value.
 */
const handleFileChange = (event: any) => {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    image.value = e.target?.result
  }
  reader.readAsDataURL(file)
}

/**
 * Removes the image data by setting `image.value` to `null`.
 * @returns {void} This function does not return a value.
 */
const removeImage = () => {
  image.value = null
}

const fileInput = ref<HTMLInputElement | null>(null)
</script>

<template>
  <div class="create-milestone-view">
    <div class="header">
      <h2 class="title">Rediger sparemål!</h2>

      <button class="save-button" id="top-button" @click="saveInput">
        <h3 class="save-button-title">Lagre</h3>
      </button>
    </div>

    <div class="input-container">
      <div class="image-container">
        <div class="add-image-box">
          <label>
            <input
              type="file"
              style="display: none"
              ref="fileInput"
              accept="image/png, image/jpeg"
              @change="handleFileChange"
            />
            <img v-if="image" :src="image" id="image" alt="Selected Image" />
            <button v-if="image" class="remove-image-button" @click="removeImage">
              Fjern bilde
            </button>
            <img
              v-else
              src="../../components/icons/image/AddImage.png"
              alt="add image"
              id="placeholder-img"
              width="50px"
              height="50px"
            />
          </label>
        </div>
      </div>

      <div class="input" id="title-input">
        <BaseInput
          v-model="title"
          label="Tittel"
          place-holder="Navn på sparemålet"
          type="email"
          :error="titleError !== ''"
        ></BaseInput>
        <label class="error" v-if="titleError">{{ titleError }}</label>
      </div>

      <div class="input-large">
        <BaseTextArea
          v-model="description"
          label="Beskrivelse"
          place-holder="Beskriv sparemålet"
          :error="descriptionError !== ''"
        ></BaseTextArea>
        <label class="error" v-if="descriptionError">{{ descriptionError }}</label>
      </div>

      <div class="smaller-inputs">
        <div class="input">
          <base-input
            v-model="goal_sum"
            label="Hvor mye vil du spare (nok)?"
            place-holder="Sett inn hvor mye du vil spare"
            id="test"
            :error="amountErrorGoal !== ''"
          ></base-input>
          <label class="error" v-if="amountErrorGoal">{{ amountErrorGoal }}</label>
        </div>
        <div class="input">
          <base-input
            v-model="current_sum"
            place-holder="Sett inn hvor mye du har nå"
            label="Hvor mye har du nå (nok)?"
            :error="amountErrorStart !== ''"
          ></base-input>
          <label class="error" v-if="amountErrorStart">{{ amountErrorStart }}</label>
        </div>
      </div>

      <div class="smaller-inputs">
        <div class="input">
          <h3>Start dato</h3>
          <VueDatePicker
            :enable-time-picker="false"
            placeholder="Velg start dato"
            v-model="start_date"
            :min-date="start_date"
            :disabled="true"
          ></VueDatePicker>
        </div>
        <div class="input">
          <h3>Slutt dato</h3>
          <VueDatePicker
            :enable-time-picker="false"
            tabindex="0"
            placeholder="Velg slutt dato"
            v-model="end_date"
            :min-date="tomorrow"
          ></VueDatePicker>
          <label class="error" v-if="dateError">{{ dateError }}</label>
        </div>
      </div>
    </div>
    <div class="submit-button">
      <button class="save-button" @click="saveInput">
        <h3 class="save-button-title">Lagre</h3>
      </button>
    </div>
  </div>
</template>

<style scoped>
.create-milestone-view {
  display: flex;
  flex-direction: column;
  min-height: fit-content;
  place-content: space-between;
  height: 130%;
  width: 100%;
  gap: 2.5%;
}

.header {
  display: flex;
  flex-direction: row;
  place-content: space-between;
  height: 5%;
}

.title {
  color: var(--color-header);
}

#top-button {
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
  gap: 1%;
}

.smaller-inputs {
  display: flex;
  flex-direction: row;
  height: 20%;
  width: 100%;
  gap: 2%;
}

.input-large {
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

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.add-image-box {
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */

  width: 100%;
  height: 100%;

  border-radius: 20px;
  border: 2px solid darkgray;
  overflow: hidden;
}

#image {
  width: 100%;
  cursor: pointer;
}

.image-button {
  background: none;
  border: none;
}

#placeholder-img:hover {
  cursor: pointer;
  transform: scale(1.05);
}

.remove-image-button {
  position: absolute;
  top: 0;
  right: 0;

  font-weight: bold;
  color: var(--color-headerText);
  background-color: var(--color-logout-button);

  padding: 0.5%;
  margin: 0.5%;

  border: none;
  border-radius: 20px;
}

.remove-image-button:hover {
  transform: scale(1.05);
}

.submit-button {
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
  .create-milestone-view {
    height: 150%;
  }

  .input-container {
    gap: 1%;
  }
  .smaller-inputs {
    display: flex;
    flex-direction: column;
    height: 40%;
  }

  .input {
    height: 100%;
  }

  #title-input {
    height: 20%;
  }

  .image-container {
    height: 45%;
  }
}
</style>
