<script setup lang="ts">
import { ref } from 'vue'
import { updatePasswordInfo } from '@/utils/profileutils'
import { useTokenStore } from '@/stores/token'
import { useToast } from 'vue-toast-notification'

/**
 * Initiates toast for error messages
 */
const toast = useToast()

/**
 * Holds the current password
 */
const currentPassword = ref<string>('')

/**
 * Holds the new password
 */
const newPassword = ref<string>('')

/**
 * Holds the new password error
 */
const newPasswordError = ref<string | null>(null)

/**
 * Holds the current password error
 */
const currentPasswordError = ref<string | null>(null)

/**
 * Holds the password error
 */
const passwordError = ref<string | null>(null)

/**
 * Validates the password inputs
 */
const validInput = () => {
  checkInput()
  return newPasswordError.value == null && currentPasswordError.value == null
}

/**
 * Checks the password inputs and updates error messages to
 * relevant errors
 */
const checkInput = () => {
  if (currentPassword.value.trim() == '') {
    currentPasswordError.value = 'Mangler nåværende passord!'
  } else {
    currentPasswordError.value = null
  }

  if (newPassword.value.trim() == '') {
    newPasswordError.value = 'Mangler nytt passord!'
  } else {
    newPasswordError.value = null
  }

  if (
    currentPassword.value == newPassword.value &&
    newPassword.value.trim() &&
    currentPassword.value.trim()
  ) {
    newPasswordError.value = 'Nytt passordet er likt nåværende passord!'
  }

  if (!validatePassword(newPassword.value.trim()) && newPassword.value.trim() !== '') {
    newPasswordError.value = 'Nytt passord må være minst 8 tegn langt'
  }

  passwordError.value = null
}

/**
 * Checks that a users password is at least 8 characters long
 * @param passwordToCheck the password to check
 */
function validatePassword(passwordToCheck: string) {
  return passwordToCheck.trim().length >= 8
}

/**
 * Saves the users new password and gives the user confirmation on successful job.
 * Shows an error message if task fails
 */
const saveInfo = async () => {
  checkInput()
  if (validInput()) {
    try {
      await updatePasswordInfo(useTokenStore().jwtToken, currentPassword.value, newPassword.value)
      toast.success('Passordet ble oppdatert!')
      clearInput()
    } catch (error) {
      toast.error('Noe gikk galt! Venligst prøv på nytt.')
      passwordError.value = 'Noe gikk galt! Venligst prøv på nytt.'
    }
  }
}

/**
 * Clears the password inputs
 */
const clearInput = () => {
  currentPassword.value = ''
  newPassword.value = ''
}
</script>

<template>
  <div class="password-info">
    <div class="header">
      <h3 class="title">Passord</h3>
      <button class="save-button" @click="saveInfo">
        <h3 class="save-button-title">Lagre</h3>
      </button>
    </div>
    <div class="input-fields" @keyup.enter="saveInfo">
      <div class="input-collection">
        <h4>Nåværende passord:</h4>
        <input
          class="input"
          :class="{ error: currentPasswordError }"
          type="password"
          v-model="currentPassword"
          data-testid="current-password-input"
        />
        <div class="alert-box">
          <h4 v-if="currentPasswordError" class="error-message">{{ currentPasswordError }}</h4>
        </div>
      </div>

      <div class="input-collection">
        <h4>Nytt passord:</h4>
        <input
          class="input"
          :class="{ error: newPasswordError }"
          type="password"
          v-model="newPassword"
          data-testid="new-password-input"
        />
        <div class="alert-box">
          <h4 v-if="newPasswordError" class="error-message">{{ newPasswordError }}</h4>
          <h4 v-if="passwordError" class="error-message">{{ passwordError }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.password-info {
  display: flex;
  flex-direction: column;

  width: 100%;
  min-height: 100%;
}

.header {
  display: flex;
  flex-direction: row;
  place-content: space-between;
  width: 100%;
}

.title {
  font-weight: bold;
}
.save-button {
  border-radius: 20px;
  padding-right: 5%;
  padding-left: 5%;
  color: var(--color-headerText);
  background-color: var(--color-save-button);
  border: none;
}

.save-button:hover {
  transform: scale(1.02);
}

.save-button:active {
  background-color: var(--color-save-button-click);
}

.save-button-title {
  font-weight: bold;
}

.input-fields {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  place-content: start;
}

.input-collection {
  display: flex;
  flex-direction: column;
  height: 50%;
}

.input {
  border-radius: 20px;
  border: 2px solid var(--color-border);
  min-height: 30px;
  padding-left: 2%;
}

.alert-box {
  display: flex;
  flex-direction: column;
  place-items: center;
  min-height: 20px;
}

.error {
  border-color: var(--color-border-error);
}

.error-message {
  color: var(--color-text-error);
}
</style>
