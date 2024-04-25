<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { getUserInfo, updateIncomeInfo } from '@/utils/profileutils'
import { useTokenStore } from '@/stores/token'

const token:string = useTokenStore().jwtToken;

const monthlyIncome = ref<number>(0);
const monthlyFixedExpenses = ref<number>(0);
const monthlySavings = ref<number>(0);

const monthlyIncomeError = ref<string|null>(null);
const monthlySpendingError = ref<string|null>(null);
const monthlySavingError = ref<string|null>(null);
const incomeError = ref<string|null>(null);

onMounted(async () => {
  try {
    await fetchIncomeInfo();
  } catch (error) {
    console.error('Error fetching achievements:', error);
  }
})

const fetchIncomeInfo = async () =>{
  try{
    const response = await getUserInfo(token);
    console.log(response);
    monthlyIncome.value = response.monthlyIncome;
    monthlyFixedExpenses.value = response.monthlyFixedExpenses;
    monthlySavings.value = response.monthlySavings;
  } catch (error){
    console.error('Error fetching income info:', error);
  }
}

const saveInput = async () => {
  if(validInput()){
    try {
      await updateIncomeInfo(
        token,
        monthlyIncome.value,
        monthlyFixedExpenses.value,
        monthlySavings.value)
        await fetchIncomeInfo();
    } catch (error){
      console.error('Error updating income info: ', error);
      incomeError.value = 'Noe gikk galt! Venligst prøv på nytt.'
    }
  }
}

const validInput = () => {
  checkInput();
  return (
    monthlyIncomeError.value === null &&
    monthlySpendingError.value === null &&
    monthlySavingError.value === null
  );
};
const checkInput = () => {
  const stringIncome = monthlyIncome.value.toString();
  const stringFixedExpenses = monthlyFixedExpenses.value.toString();
  const stringSavings = monthlySavings.value.toString();

  if (isNaN(monthlyIncome.value) || monthlyIncome.value< 0 || stringIncome == '') {
    monthlyIncomeError.value = 'Vennligst oppgi en gyldig månedlig inntekt!';
  } else {
    monthlyIncomeError.value = null;
  }

  if (isNaN(monthlyFixedExpenses.value) ||monthlyFixedExpenses.value< 0 || stringFixedExpenses == '') {
    monthlySpendingError.value = 'Vennligst oppgi gyldige faste utgifter!';
  } else {
    monthlySpendingError.value = null;
  }

  if (isNaN(monthlySavings.value) ||monthlySavings.value< 0 || stringSavings == '') {
    monthlySavingError.value = 'Vennligst oppgi et gyldig ønsket sparebeløp!';
  } else {
    monthlySavingError.value = null;
  }
  incomeError.value = null;
};

</script>

<template>
  <div class="income-info">
    <div class="header">
      <h3 class="title">Økonomiske opplysninger</h3>
      <button class="save-button" @click="saveInput">
        <h3 class="save-button-title">Lagre</h3>
      </button>
    </div>
    <div class="input-fields">

      <div class="description-collection">
        <div class="description-box">
          <h4 class="description">Månedlig inntekt (nok): </h4>
        </div>
        <div class="description-box">
          <h4 class="description">Faste utgifter (nok):   </h4>
        </div>
        <div class="description-box">
          <h4 class="description">Ønsket sparebeløp (nok): </h4>
        </div>
      </div>

      <div class="input-collection">
        <div class="input">
          <input class="input-field" :class="{'error': monthlyIncomeError}" v-model="monthlyIncome">
          <div class="alert-box">
            <h4 v-if="monthlyIncomeError" class="error-message">{{monthlyIncomeError}}</h4>
          </div>
        </div>

        <div class="input">
          <input class="input-field" :class="{'error': monthlySpendingError}" v-model="monthlyFixedExpenses">
          <div class="alert-box">
            <h4 v-if="monthlySpendingError" class="error-message">{{monthlySpendingError}}</h4>
          </div>
        </div>

        <div class="input">
          <input class="input-field" :class="{'error': monthlySavingError}" v-model="monthlySavings">
          <div class="alert-box">
            <h4 v-if="monthlySavingError" class="error-message">{{monthlySavingError}}</h4>
            <h4 v-if="incomeError" class="error-message">{{incomeError}}</h4>
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
  color: var(--color-headerText);
  background-color: var(--color-save-button);
  border: none;
}

.save-button:hover{
  transform: scale(1.02);
}

.save-button:active{
  background-color: var(--color-save-button-click);
}

.save-button-title{
  font-weight: bold;
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
  border: 2px solid var(--color-border);
  min-height: 30px;
  padding-left: 2.0%;
}

.alert-box{
  display: flex;
  flex-direction: column;
  place-items: center;

  width: 100%;
  min-height: 25px;
}

.error{
  border-color: var(--color-border-error);
}

.error-message{
  color: var(--color-text-error);
}

@media only screen and (max-width: 1000px){
  .input-fields{
    padding-top: 3.0%;
  }
}

</style>