<script setup lang="ts">

import { ref } from 'vue'
const currentPassword = ref<string>('');
const newPassword = ref<string>('')

const newPasswordError = ref<string|null>(null)
const currentPasswordError = ref<string | null>(null)

const checkInput = () => {

  if(currentPassword.value.trim() == ''){
    currentPasswordError.value = 'Mangler nåværende passord!';
  } else{
    currentPasswordError.value = null;
  }

  if(newPassword.value.trim() == ''){
    newPasswordError.value = 'Mangler nytt passord!';
  } else {
    newPasswordError.value = null;
  }

  if(currentPassword.value == newPassword.value && newPassword.value.trim() && currentPassword.value.trim()){
    newPasswordError.value = 'Nytt passordet er likt nåværende passord!'
  }
}

const clearInput = () => {
  currentPassword.value = '';
  newPassword.value = '';
}

const saveInfo = async () => {
  checkInput();
  if(newPasswordError.value == null && currentPasswordError.value == null){
    alert('Ok!')
    clearInput()
  }
}

</script>

<template>
  <div class="password-info">
    <div class="header">
      <h3 class="title">Passord</h3>
      <button class="save-button" @click="saveInfo"> Lagre</button>
    </div>
    <div class="input-fields">

      <div class="input-collection">
        <h3>Nåværende passord: </h3>
        <input class="input"
               :class="{'error': currentPasswordError}"
               type="password"
               v-model="currentPassword">
        <div class="alert-box">
          <h3 v-if="currentPasswordError" class="error-message">{{currentPasswordError}}</h3>
        </div>
      </div>

      <div class="input-collection">
        <h3>Nytt passord: </h3>
        <input class="input"
               :class="{'error': newPasswordError}"
               type="password"
               v-model="newPassword">
        <div class="alert-box">
          <h3 v-if="newPasswordError" class="error-message">{{newPasswordError}}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.password-info{
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

}

.header{
  display: flex;
  flex-direction: row;
  place-content: space-between;
  width: 100%;
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
  height: 100%;
  width: 100%;

  place-content: start;
}

.input-collection{
  display: flex;
  flex-direction: column;
  height: 50%;
}

.input{
  border-radius: 20px;
  min-height: 30px;
  padding-left: 2.0%;
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