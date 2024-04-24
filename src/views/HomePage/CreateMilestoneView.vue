<script setup lang="ts">

import BaseInput from '@/components/create-challenge/BaseInput.vue'
import BaseTextArea from '@/components/create-challenge/BaseTextArea.vue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue'

const title = ref('')

const description = ref('')

const end_date = ref();

const current_sum = ref(0)

const goal_sum = ref(0)

const start_date = ref()
</script>

<template>
  <div>
    <h2>Lag ditt eget sparesti!</h2>

    <div id="createContainer">
      <div class="input-container">
      <div class="input">
        <BaseInput
          label="Tittel på sparesti"
          place-holder="Navnet på sparestien"
          type="email"
        ></BaseInput>
        <label class="error"></label>
      </div>
      <div class="input">
        <BaseTextArea  label="Beskrivelse"
                       place-holder="Vennligst beskriv sparestien"></BaseTextArea>
        <label class="error"></label>
      </div>
      <div class="smaller-inputs">
        <div class="input">
          <base-input label="Hvor mye vil du spare?" id="test">

          </base-input>
        </div>
        <div class="input">
        <base-input label="Hvor mye har du nå?">

        </base-input>
        </div>

      </div>
        <div class="smaller-inputs">
          <div class="input">
            <label>Sett start dato</label>
            <VueDatePicker
              :enable-time-picker="false"
              v-model="start_date"
              :max-date="end_date"
            ></VueDatePicker>
            </div>
          <div class="input">
            <label>Sett slutt dato</label>
            <VueDatePicker
              :enable-time-picker="false"
              v-model="end_date"
              :min-date="start_date"
            ></VueDatePicker>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.input-container{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  width:50%;
  height: 100%;
}
.smaller-inputs{
  display: flex;
  flex-direction: row;
  gap:2%;
  height: 100%;
  width: 100%;
}
.input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  width:100%;
  height: 100%;
}

#createContainer {
  display: flex;
  flex-direction: row;
  row-gap: 3%;
  margin-left: 1%;
}

label{
  font-size: 1.5em;
}


/* Style the calendar */
.calendar {
  border-radius: 20px;
}
</style>
