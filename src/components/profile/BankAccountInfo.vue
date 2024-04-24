<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { getUserAccountInfo, getUserInfo, updateBankAccountInfo } from '@/utils/profileutils'

const savingAccount = ref<number>(0);
const checkingAccount= ref<number>(0);

const savingAccountError = ref<string | null>(null);
const accountError = ref<string | null>(null);

const accounts = ref<number[]>([])

onMounted(async () => {
  try {
    await fetchUserInfo();
    await fetchAccountInfo();
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
})
const fetchUserInfo = async () =>{
  try{
    const response = await getUserInfo();

    checkingAccount.value = response.currentAccount;
    savingAccount.value = response.savingsAccount;

  } catch (error){
    console.error('Error fetching user info:', error);
  }
}

const fetchAccountInfo = async () => {
  const response = await getUserAccountInfo();
  console.log(response)
  for(let i = 0; i < response.length; i++){
    console.log(response[i].accountNumber)
    accounts.value.push(response[i].accountNumber)
  }
}

const checkInput = () => {
  if(savingAccount.value == checkingAccount.value){
    savingAccountError.value = 'Sparekonto er lik brukskonto!'
  } else{
    savingAccountError.value = null;
  }
  accountError.value = null;
}

const saveAccountInfo = async ()=> {
  checkInput()
  if(savingAccountError.value == null){
    try{
      await updateBankAccountInfo(checkingAccount.value, savingAccount.value)
      await fetchAccountInfo();
      await fetchUserInfo();
    } catch (error){
      accountError.value = 'Noe gikk galt! Venligst prøv på nytt.'
    }
  }
}

</script>

<template>
  <div class="account-info">
    <div class="header">
      <h3 class="title">Konto opplysninger</h3>
      <button class="save-button" @click="saveAccountInfo">
        <h3 class="save-button-title">Lagre</h3>
      </button>
    </div>

    <div class="input-fields">

      <div class="input-collection">
        <h4>Forbrukskonto: </h4>
        <select class="accounts" v-model="checkingAccount">
          <option v-for="(account, index) in accounts" :key="'check' + index" :value="account">{{ account }}</option>
        </select>
      </div>

      <div class="input-collection">
        <h4>Sparekonto: </h4>
        <select class="accounts" :class="{'error': savingAccountError}" v-model="savingAccount">
          <option v-for="(account, index) in accounts"  :key="'saving' + index" :value="account">{{ account }}</option>
        </select>
      </div>

      <div class="alert-box">
        <h4 v-if="savingAccountError" class="error-message">{{savingAccountError}}</h4>
        <h4 v-if="accountError" class="error-message">{{accountError}}</h4>
      </div>

    </div>

  </div>

</template>

<style scoped>
.account-info{
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;
}

.header{
  display: flex;
  flex-direction: row;
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
  flex-direction: column;
  place-content: space-evenly;

  flex: 1;
  width: 100%;

}

.input-collection{
  display: flex;
  flex-direction: column;
  width: 100%;
}

.accounts{
  width: 100%;
  min-height: 30px;
  border-radius: 20px;
  border: 2px solid var(--color-border);
}

.accounts:hover{
  transform: scale(1.01);
}

.alert-box{
  display: flex;
  flex-direction: column;
  place-items: center;
  min-height: 25px;
}

.error{
  border-color: var(--color-border-error);
}

.error-message{
  color: var(--color-text-error);
}

</style>