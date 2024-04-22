<script setup lang="ts">

import { ref } from 'vue'

const monthlyIncome = ref<number | string>(9400);
const monthlySpending = ref<number | string>(5000);
const monthlySaving = ref<number | string>(0)

const monthlyIncomeError = ref<string|null>(null);
const monthlySpendingError = ref<string|null>(null);
const monthlySavingError = ref<string|null>(null);

const checkInput = () => {
  if (monthlyIncome.value === '' || isNaN(Number(monthlyIncome.value)) || Number(monthlyIncome.value) < 0) {
    monthlyIncomeError.value = 'Vennligst oppgi en gyldig månedlig inntekt!';
  } else {
    monthlyIncomeError.value = null;
  }

  if (monthlySpending.value === '' || isNaN(Number(monthlySpending.value)) || Number(monthlySpending.value) < 0) {
    monthlySpendingError.value = 'Vennligst oppgi gyldige faste utgifter!';
  } else {
    monthlySpendingError.value = null;
  }

  if (monthlySaving.value === '' || isNaN(Number(monthlySaving.value)) || Number(monthlySaving.value) < 0) {
    monthlySavingError.value = 'Vennligst oppgi et gyldig ønsket sparebeløp!';
  } else {
    monthlySavingError.value = null;
  }
};
const saveInput = async () => {
  checkInput()
  if(monthlyIncomeError.value == null
    && monthlySpendingError.value == null
    && monthlySavingError.value == null){
    alert('Ok!')
  }

}
</script>

<template>
  <div class="income-info">
    <div class="header">
      <h3 class="title">Økonomiske opplysninger</h3>
      <button class="save-button" @click="saveInput">Lagre</button>
    </div>
    <div class="input-fields">

      <div class="description-collection">
        <div class="description-box">
          <h3 class="description">Månedlig inntekt (nok): </h3>
        </div>
        <div class="description-box">
          <h3 class="description">Faste utgifter (nok):   </h3>
        </div>
        <div class="description-box">
          <h3 class="description">Ønsket sparebeløp (nok): </h3>
        </div>
      </div>

      <div class="input-collection">
        <div class="input">
          <input class="input-field" :class="{'error': monthlyIncomeError}" v-model="monthlyIncome">
          <div class="alert-box">
            <h3 v-if="monthlyIncomeError" class="error-message">{{monthlyIncomeError}}</h3>
          </div>
        </div>

        <div class="input">
          <input class="input-field" :class="{'error': monthlySpendingError}" v-model="monthlySpending">
          <div class="alert-box">
            <h3 v-if="monthlySpendingError" class="error-message">{{monthlySpendingError}}</h3>
          </div>
        </div>

        <div class="input">
          <input class="input-field" :class="{'error': monthlySavingError}" v-model="monthlySaving">
          <div class="alert-box">
            <h3 v-if="monthlySavingError" class="error-message">{{monthlySavingError}}</h3>
          </div>
        </div>

      </div>

    </div>

  </div>

</template>

<style scoped>
.income-info{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.header{
  display: flex;
  flex-direction: row;
  width: 100%;
  place-content: space-between;
}

.title{
  font-weight: bold;
}

.save-button{
  border-radius: 20px;
  padding-right: 5.0%;
  padding-left: 5.0%;
}

.input-fields{
  display: flex;
  flex-direction: row;

  height: 100%;
  width: 100%;
  padding-top: 2.0%;

  gap: 1.0%;

}

.description-collection{
  display: flex;
  flex-direction: column;
  place-content: space-between;
}

.description-box{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100%/3);
}

.input-collection{
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  place-content: space-between;
}

.input{
  display: flex;
  flex-direction: column;

  width: 100%;
  height: calc(100%/3);
}

.input-field{
  width: 100%;
  height: 50%;
  border-radius: 20px;
  min-height: 30px;
  padding-left: 2.0%;
}

.alert-box{
  display: flex;
  flex-direction: column;
  place-items: center;

  width: 100%;
  height: 50%;
  min-height: 1rem;
}

.error{
  border-color: var(--color-border-error);
}

.error-message{
  color: var(--color-text-error);
}

@media only screen and (max-width: 1000px){
  .input-fields{
    padding-top: 1.0%;
  }
}

</style>