<script setup lang="ts">

import { computed, ref } from 'vue'

const savingAccount = ref('account 1');
const checkingAccount= ref('account 2');

const accountError = ref<string | null>(null);

const accounts = ref<[]>([savingAccount.value, checkingAccount.value])

const savingAccountOptions = computed(() =>
  accounts.value.filter(account => account !== savingAccount.value))

const checkingAccountOptions = computed(() =>
  accounts.value.filter(account => account !== checkingAccount.value))

const checkInput = () => {
  if(savingAccount.value == checkingAccount.value){
    accountError.value = 'Sparekonto er lik brukskonto!'
  } else{
    accountError.value = null;
  }
}

const saveAccountInfo = async ()=> {
  checkInput()
  if(accountError.value == null){
    alert('Ok!')
  }
}

</script>

<template>
  <div class="account-info">
    <div class="header">
      <h3 class="title">Konto opplysninger</h3>
      <button class="save-button" @click="saveAccountInfo">Lagre</button>
    </div>

    <div class="input-fields">

      <div class="input-collection">
        <h3>Forbrukskonto: </h3>
        <select class="accounts" v-model="checkingAccount">
          <option key="check-default" :value="checkingAccount">{{checkingAccount}}</option>
          <option v-for="(account, index) in checkingAccountOptions" :key="check + index" :value="account">{{ account }}</option>
        </select>
      </div>

      <div class="input-collection">
        <h3>Sparekonto: </h3>
        <select class="accounts" :class="{'error': accountError}" v-model="savingAccount">
          <option key="saving-default" :value="savingAccount">{{savingAccount}}</option>
          <option v-for="(account, index) in savingAccountOptions" :key="saving + index" :value="account">{{ account }}</option>
        </select>
      </div>

      <div class="alert-box">
        <h3 v-if="accountError" class="error-message">{{accountError}}</h3>
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
}

.error{
  border-color: var(--color-border-error);
}

.error-message{
  color: var(--color-text-error);
}

</style>