<script setup lang="ts">
import TopBanner from '@/components/TopBanner.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useTokenStore } from "@/stores/token";

const router = useRouter();
const username = ref('');
const password = ref('');

function navigateToNewUser() {
  router.push('/signup')
}

async function login() {
  await useTokenStore().getTokenAndSaveInStore(username.value, password.value);
  if (useTokenStore().$state.jwtToken !== '' && !useTokenStore().$state.jwtToken.includes('Request')) {
    await router.push('/homepage')
  }
  else if (useTokenStore().$state.jwtToken === 'Request failed with status code 401'){
    alert('Feil brukernavn eller passord')
  }
  else if (useTokenStore().$state.jwtToken === 'Request failed with status code 403') {
    alert('Du kommer fra et utrygt nettverk, vennligst prøv igjen senere')
  }
  else if (useTokenStore().$state.jwtToken === 'Request failed with status code 500') {
    alert('Serveren er nede, vennligst prøv igjen senere')
  }
}
</script>

<template>
  <div id="LoginView">
    <TopBanner />
    <h1 id="Title">LogIn</h1>
    <div id="LoginFields">
      <div id="UserDiv">
        <h2 id="Username">Brukernavn</h2>
        <input id="NameField" placeholder="Skriv inn dit brukernavn" v-model="username">
      </div>
      <div id="PasswordDiv">
        <h2 id="Password">Passord</h2>
        <input id="PasswordField" type="password" placeholder="Skriv inn dit passord" v-model="password">
      </div>
    </div>
    <button id="LogInButton" @click="login" :disabled="!username || password.length < 8" :class="{ 'disabled-button': !username || password.length < 8 }">LogIn</button>
    <h2 @click="navigateToNewUser()" id="NewUser">Ny til Sparesti? Trykk her for å lage en profil!</h2>
  </div>
</template>

<style scoped>

#LoginView {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-heading);
  width: 100vw;
  height: 100vh;
}

#Title {
  margin: 1%;
}

#LoginFields {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#NameField, #PasswordField {
  padding: 1.5%;
}

#Username, #Password {
  color: var(--color-text);
}

#NameField, #PasswordField {
  min-height: 50%;
  min-width: 40%;
  border-radius: 20px;
  border-color: var(--color-border);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
  font-size: 250%;
}

#LogInButton {
  background-color: var(--color-confirm-button);
  color: var(--color-buttonText);
  border: 0;
  border-radius: 20px;
  margin: 4%;
  padding: 1%;
  min-width: 30%;
  font-size: 250%;
}

#LogInButton:disabled {
  background-color: grey;
  color: black;
  cursor: not-allowed;
}

#LogInButton:disabled:hover {
  transform: none;
  cursor: not-allowed;
}

#LogInButton:hover {
  transform: scale(1.05);
  cursor: pointer;
}

#NewUser {
  text-align: center;
  margin: 1%;
}

#NewUser:hover {
  cursor: pointer;
}

@media only screen and (max-width: 1000px) {
  #LoginView {
    justify-content: space-between;
  }

  #NewUser {
    margin-bottom: 15%;
  }

  #UserDiv, #PasswordDiv {
    margin-bottom: 10%;
  }

  #NameField, #PasswordField {
    min-height: 80%;
  }

  #LogInButton {
    min-width: 80%;
    min-height: 10%;
  }
}
</style>