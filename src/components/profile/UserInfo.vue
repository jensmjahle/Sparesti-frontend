<script setup lang="ts">

import { ref } from 'vue'

const usernameError = ref<null|string>(null);
const emailError = ref<null|string>(null);

const username = ref<string>('brukernavn');
const email = ref<string>('brukernavne@epost.com');

const checkInput = () => {
  if(username.value.trim() == ''){
    usernameError.value = 'Ikke gyldig brukernavn!'
  } else {
    usernameError.value = null;
  }

  if(email.value.trim() == '' || !isValidEmail(email.value)){
    emailError.value = 'Ikke gyldig e-post adresse!'
  } else {
    emailError.value = null;
  }

}
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email.trim() !== '' && emailRegex.test(email);
};

const saveUserInfo = async ()=>{
  checkInput()
  if(usernameError.value == null && emailError.value == null){
    alert('Ok!')
  }
}

</script>

<template>
  <div class="user-info">
    <div class="header">
      <h3 class="title">Bruker opplysninger</h3>
      <button class="save-button" @click="saveUserInfo">
        <h3 class="save-button-title">Lagre</h3>
      </button>
    </div>
    <div class="input-fields">
      <div class="img-input">
        <button class="profile-picture-button">
          <img src=/src/components/icons/navigation/user.svg alt="profile-picture" class="profile-picture">
        </button>
      </div>
      <div class="text-input">
        <div class="input-collection">
          <H4>Brukernavn: </H4>
          <input class="input" :class="{'error': usernameError}" v-model="username">
          <div class="alert-box">
            <h4 v-if="usernameError" class="error-message">{{usernameError}}</h4>
          </div>
        </div>
        <div class="input-collection">
          <H4>E-post: </H4>
          <input class="input" :class="{'error': emailError}" v-model="email">
          <div class="alert-box">
            <h4 v-if="emailError" class="error-message">{{emailError}}</h4>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

.user-info{
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

  align-items: center;
  justify-items: center;

  height: 100%;
  width: 100%;

  gap: 2.0%;
}

.text-input{
  flex: 1;
  display: flex;
  flex-direction: column;
  place-content: start;

  height: 100%;
}

.input{
  border-radius: 20px;
  min-height: 30px;
  padding-left: 2.0%;
}

.img-input{
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 20%;
  justify-content: center;
}

.input-collection{
  flex: 1;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 50%;
}

.save-button{
  border-radius: 20px;
  padding-right: 5.0%;
  padding-left: 5.0%;
  color: var(--color-headerText);
  font-weight: bold;
  background-color: var(--color-save-button);
  border: none;
}

.save-button:hover{
  transform: scale(1.02);
}

.save-button:active{
  background-color: var(--color-save-button-click);
}

.profile-picture-button{
  display: flex;
  flex-direction: column;
  place-content: center;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: var(--color-headerText);
  border: 2px solid var(--color-border);
}

.profile-picture-button:hover{
  transform: scale(1.05);
}

.profile-picture{
  width: 100%;
  aspect-ratio: 1/1 ;
  border-radius: 50%;
}

.alert-box{
  display: flex;
  flex-direction: column;

  place-items: center;
  width: 100%;
  min-height: 20px;
}

.error{
  border-color: var(--color-border-error);
}

.error-message{
  color: var(--color-text-error);
}

@media only screen and (max-width: 1000px) {
  .img-input{
    max-width: 15%;
  }
}

</style>