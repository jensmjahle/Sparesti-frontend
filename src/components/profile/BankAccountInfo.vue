<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getUserAccountInfo, getUserInfo, updateBankAccountInfo } from '@/utils/profileutils'
import { useTokenStore } from '@/stores/token'
import { useToast } from 'vue-toast-notification'

interface Account {
  accountNumber: number
  username: string
  balance: number
  name: string
  type: string
  currency: string
}

/**
 * Initiates toast for error messages
 */
const toast = useToast()

/**
 * Holds the index of the selected savings account
 */
const savingAccount = ref<number>(0)

/**
 * Hold the index of the selected checking account
 */
const checkingAccount = ref<number>(0)

/**
 * Holds a list accounts
 */
const accounts = ref<Account[]>([])

/**
 * Holds the saving account error
 */
const savingAccountError = ref<string | null>(null)

/**
 * Holds the accountError
 */
const accountError = ref<string | null>(null)

onMounted(async () => {
  try {
    await fetchAccounts()
    await fetchUserInfo()
  } catch (error) {
    console.error('Error fetching user info:', error)
  }
})

/**
 * Fetches the users info an updates the checking account and savings
 * account values to what is saved for the user
 */
const fetchUserInfo = async () => {
  try {
    // Retrieve chosen accounts
    const response = await getUserInfo(useTokenStore().jwtToken)

    // Update current selection indices based on a match between account numbers
    for (let i = 0; i < accounts.value.length; i++) {
      if (accounts.value[i].accountNumber == response.savingsAccount) savingAccount.value = i

      if (accounts.value[i].accountNumber == response.currentAccount) checkingAccount.value = i
    }
  } catch (error) {
    console.error('Error fetching user info:', error)
  }
}

/**
 * Fetches account info and updates the accounts array with
 * the users available accounts
 */
const fetchAccounts = async () => {
  accounts.value = await getUserAccountInfo(useTokenStore().jwtToken)
}

/**
 * Checks if the two accounts are the same and presents the user
 * with an error if they are
 */
const checkInput = () => {
  if (savingAccount.value == checkingAccount.value)
    savingAccountError.value = 'Sparekonto er lik brukskonto!'
  else savingAccountError.value = null

  accountError.value = null
}

/**
 * Updates the users account info with the new selected accounts.
 * Shows an error if something goes wrong
 */
const saveAccountInfo = async () => {
  checkInput()
  if (savingAccountError.value == null) {
    try {
      await updateBankAccountInfo(
        useTokenStore().jwtToken,
        accounts.value[checkingAccount.value].accountNumber,
        accounts.value[savingAccount.value].accountNumber
      )

      await fetchAccounts()
      await fetchUserInfo()
      toast.success('Konto-opplysninger ble oppdatert!')
    } catch (error) {
      toast.error('Noe gikk galt! Venligst prøv på nytt.')
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

    <div class="input-fields" @keyup.enter="saveAccountInfo">
      <div class="input-collection">
        <h4>Forbrukskonto:</h4>
        <select class="accounts" v-model="checkingAccount">
          <option v-for="(option, index) in accounts" :key="'check' + index" :value="index">
            {{ option.type + ': ' + option.accountNumber }}
          </option>
        </select>
      </div>

      <div class="input-collection">
        <h4>Sparekonto:</h4>
        <select class="accounts" :class="{ error: savingAccountError }" v-model="savingAccount">
          <option v-for="(option, index) in accounts" :key="'saving' + index" :value="index">
            {{ option.type + ': ' + option.accountNumber }}
          </option>
        </select>
      </div>

      <div class="alert-box">
        <h4 v-if="savingAccountError" class="error-message">{{ savingAccountError }}</h4>
        <h4 v-if="accountError" class="error-message">{{ accountError }}</h4>
      </div>
    </div>
  </div>
</template>

<style scoped>
.account-info {
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;
}

.header {
  display: flex;
  flex-direction: row;
  place-content: space-between;
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
  place-content: space-evenly;

  flex: 1;
  width: 100%;
}

.input-collection {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.accounts {
  width: 100%;
  min-height: 30px;
  border-radius: 20px;
  border: 2px solid var(--color-border);
}

.accounts:hover {
  transform: scale(1.01);
}

.alert-box {
  display: flex;
  flex-direction: column;
  place-items: center;
  min-height: 25px;
}

.error {
  border-color: var(--color-border-error);
}

.error-message {
  color: var(--color-text-error);
}
</style>
