<script setup lang="ts">
import TopBanner from '@/components/TopBanner.vue'
import { signUpUser } from '@/utils/frontPageUtils'
import { useTokenStore } from '@/stores/token'
import { ref } from 'vue'
import router from "@/router";

const name = ref("")

const email = ref("")

const password = ref("")

const confirmePassword = ref("")

const fieldTouched = ref({
  name: false,
  email: false,
  password: false,
  confirmePassword: false
});

function validateName(nameToCheck:string){
  return nameToCheck.trim() !== '';
}

function validateEmail(emailToCheck:string){
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(emailToCheck);
}

function validatePassword(passwordToCheck:string){
  return passwordToCheck.trim().length >= 8;
}

function validateConfirmPassword(passwordToCheck: string, passwordConfirmation: string){
  return passwordToCheck.trim() === passwordConfirmation.trim();
}

function registerUserValid (nameToCheck:string, emailToCheck:string, passwordToCheck:string, passwordConfirmation:string){
  return validateName(nameToCheck) && validateEmail(emailToCheck) && validatePassword(passwordToCheck) && validateConfirmPassword(passwordToCheck, passwordConfirmation);
}

async function submit() {
  await signUpUser(name.value, email.value, password.value)
  await router.push("/register")
}
</script>

<template>
  <TopBanner/>

  <div id = Signup>
    <h1 id = "Title">Lag ny bruker</h1>
    <div id = "EntryFields">
      <div id = userDiv :class="{ 'invalid-input': fieldTouched.name && !validateName(name) }">
        <h2>Brukernavn</h2>
        <input v-model="name"
               @blur="fieldTouched.name = true"
               data-testid="NameInput">
        <span data-testid="UsernameError"
              v-if="fieldTouched.name && !validateName(name)"
              class="error-message">Brukernavn kreves</span>
      </div>
      <div id = emailDiv :class="{ 'invalid-input': fieldTouched.email && !validateEmail(email) }">
        <h2>E-post</h2>
        <input v-model="email"
               @blur="fieldTouched.email = true"
               data-testid="EmailInput">
        <span data-testid="EmailError"
              v-if="fieldTouched.email && !validateEmail(email)"
              class="error-message">E-posten er ikke gyldig</span>
      </div>
      <div id = passwordDiv :class="{ 'invalid-input': fieldTouched.password && !validatePassword(password) }">
        <h2>Passord</h2>
        <input type = "password"
               v-model="password"
               @blur="fieldTouched.password = true"
               data-testid="PasswordInput">
        <span data-testid="PasswordError"
              v-if="fieldTouched.password && !validatePassword(password)"
              class="error-message">Passordet må være minst 8 tegn langt</span>
      </div>
      <div id = confirmPasswordDiv :class="{ 'invalid-input': fieldTouched.confirmePassword && !validateConfirmPassword(password, confirmePassword) }">
        <h2>Bekreft passord</h2>
        <input type = "password"
               v-model="confirmePassword"
               @blur="fieldTouched.confirmePassword = true"
               data-testid = "ConfirmPasswordInput">
        <span data-testid="PasswordConfirmError"
              v-if="fieldTouched.confirmePassword && !validateConfirmPassword(password, confirmePassword)"
              class="error-message">Passordene er ikke like</span>
      </div>
    </div>
    <button id = "CreateButton" @click="submit()"
            :disabled="!registerUserValid(name, email, password, confirmePassword)"
            :class="{ 'Submit': registerUserValid(name, email, password, confirmePassword),
             'InactiveSubmit': !registerUserValid(name, email, password, confirmePassword) }"
            data-testid = "SignupButton">Opprett</button>
  </div>
</template>

<style scoped>

  #userDiv, #emailDiv, #passwordDiv, #confirmPasswordDiv{
    display: flex;
    flex-direction: column;
  }

  #Signup{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    max-width: 100%;
    min-height: 80%;
  }

  #Title{
    text-align: center;
    color: var(--color-heading);
  }

  #EntryFields{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .Submit, .InactiveSubmit{
    margin-top: 1.5%;
    border: 0;
    border-radius: 20px;
    padding: 1%;
    min-width: 30%;
    font-size: 250%;
  }

  .Submit{
    background-color: var(--color-confirm-button);
    color: var(--color-buttonText);

  }

  .Submit:hover{
    transform: scale(1.05);
  }

  .InactiveSubmit{
    background-color: var(--color-inactive-button);
    color: var(--color-inactive-button-text);
  }

  .error-message{
    color: var(--color-cancel-button);
    font-size: 1.5em;
  }

  .invalid-input input {
    border-color: var(--color-cancel-button);
  }

  input{
    min-height: 50%;
    min-width: 40%;
    border-radius: 20px;
    border-color: var(--color-border);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
    font-size: 250%;
  }

  @media only screen and (max-width: 1000px) {
    .Submit, .InactiveSubmit{
      min-width: 80%;
    }
  }
</style>