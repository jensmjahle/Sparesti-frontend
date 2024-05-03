<script setup lang="ts">
import TopBanner from '@/components/TopBanner.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useTokenStore } from '@/stores/token'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const router = useRouter()
const username = ref('')
const password = ref('')
const toast = useToast()

/**
 * Navigates the user to the sign-up page using Vue Router.
 * @returns This function does not return a value.
 */
function navigateToNewUser() {
  router.push('/signup')
}

/**
 * Checks if the user is an existing user based on token state and conditions.
 * @returns True if the user is considered an existing user, false otherwise.
 */
const existingUser = () => {
  return (
    useTokenStore().jwtToken !== '' &&
    !useTokenStore().jwtToken.includes('Request') &&
    !useTokenStore().jwtToken.includes('Error')
  )
}

/**
 * Attempts to log in a user by retrieving a token and performing navigation based on login status.
 * Shows appropriate toast messages based on different login outcomes.
 * @returns A promise that resolves after login attempt and navigation are completed.
 */
async function login() {
  await useTokenStore().getTokenAndSaveInStore(username.value, password.value)

  if (existingUser() && useTokenStore().isConnectedToBank) {
    await router.push('/homepage')
  } else if (existingUser() && !useTokenStore().isConnectedToBank) {
    await router.push('/register')
  } else if (useTokenStore().jwtToken === 'Request failed with status code 401') {
    toast.error('Feil brukernavn eller passord')
  } else if (useTokenStore().jwtToken === 'Request failed with status code 403') {
    toast.error('Du kommer fra et utrygt nettverk, vennligst prøv igjen senere')
  } else if (useTokenStore().jwtToken === 'Request failed with status code 500') {
    toast.error('Det oppsto en feil i serveren, vennligst prøv igjen senere')
  } else {
    toast.error('Serveren er nede, vennligst prøv igjen senere')
  }
}
</script>

<template>
  <div id="LoginView">
    <TopBanner />
    <h1 id="Title">Login</h1>
    <div id="LoginFields">
      <div id="UserDiv">
        <h2 id="Username">Brukernavn</h2>
        <input
          id="NameField"
          placeholder="Skriv inn ditt brukernavn"
          v-model="username"
          data-testid="NameInput"
          @keyup.enter="login"
        />
      </div>
      <div id="PasswordDiv">
        <h2 id="Password">Passord</h2>
        <input
          id="PasswordField"
          type="password"
          placeholder="Skriv inn ditt passord"
          v-model="password"
          data-testid="PasswordInput"
          @keyup.enter="login"
        />
      </div>
    </div>

    <button
      id="LogInButton"
      @click="login"
      :disabled="!username || password.length < 8"
      :class="{ 'disabled-button': !username || password.length < 8 }"
      data-testid="LogInButton"
    >
      Login
    </button>

    <h2
      tabindex="0"
      @keyup.enter="navigateToNewUser()"
      @click="navigateToNewUser()"
      id="NewUser"
      data-testid="NewUserLink"
    >
      Ny til Sparesti? Trykk her for å lage en profil!
    </h2>
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

#NameField,
#PasswordField {
  padding: 1.5%;
}

#Username,
#Password {
  color: var(--color-text);
}

#NameField,
#PasswordField {
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

  #UserDiv,
  #PasswordDiv {
    margin-bottom: 10%;
  }

  #NameField,
  #PasswordField {
    min-height: 80%;
  }

  #LogInButton {
    min-width: 80%;
    min-height: 10%;
  }
}
</style>
