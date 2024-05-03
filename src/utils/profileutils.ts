/**
 * This file contains functions related to user management, such as retrieving user information,
 * updating user profile, and deleting user account via API calls.
 */
import axios from 'axios'
import { BASE_URL } from '@/config/config'
import { useToast } from 'vue-toast-notification'
/**
 * Test data for user accounts
 */
const testDataUserAccounts: {}[] = [
  {
    accountNumber: 123456789,
    username: 'brukernavn',
    balance: 12000,
    name: 'A',
    type: 'Forbrukskonto',
    currency: 'NOK'
  },
  {
    accountNumber: 987654321,
    username: 'brukernavn',
    balance: 13000,
    name: 'B',
    type: 'Sparekonto',
    currency: 'NOK'
  },
  {
    accountNumber: 111222333,
    username: 'brukernavn',
    balance: 14000,
    name: 'C',
    type: 'Forbrukskonto',
    currency: 'NOK'
  },
  {
    accountNumber: 444555666,
    username: 'brukernavn',
    balance: 1500,
    name: 'D',
    type: 'Sparekonto',
    currency: 'NOK'
  }
]
/**
 * Test data for user
 */
const testDataUser = {
  username: 'brukernavn',
  email: 'brukernavn@email.com',
  firstName: 'Fornavn',
  lastName: 'Etternavn',
  profilePictureBase64: '',
  monthlyIncome: 12000,
  monthlySavings: 3500,
  monthlyFixedExpenses: 7000,
  currentAccount: 123456789,
  savingsAccount: 987654321,
  achievements: [
    {
      id: 1,
      title: 'Mynt A',
      img: '/src/assets/png/gold-coin.png'
    },
    {
      id: 2,
      title: 'Mynt B',
      img: '/src/assets/png/gold-coin.png'
    },
    {
      id: 3,
      title: 'Mynt C',
      img: '/src/assets/png/gold-coin.png'
    },
    {
      id: 4,
      title: 'Mynt D',
      img: '/src/assets/png/gold-coin.png'
    },
    {
      id: 5,
      title: 'Mynt E',
      img: '/src/assets/png/gold-coin.png'
    },
    {
      id: 6,
      title: 'Mynt F',
      img: '/src/assets/png/gold-coin.png'
    },
    {
      id: 7,
      title: 'Mynt G',
      img: '/src/assets/png/gold-coin.png'
    },
    {
      id: 8,
      title: 'Mynt H',
      img: '/src/assets/png/gold-coin.png'
    },
    {
      id: 9,
      title: 'Mynt I',
      img: '/src/assets/png/gold-coin.png'
    },
    {
      id: 10,
      title: 'Mynt J',
      img: '/src/assets/png/gold-coin.png'
    }
  ]
}

const toast = useToast()
/**
 * Deletes the user account.
 * @param token User token for authentication.
 * @returns Promise with the response data.
 */
export const deleteUser = async (token: string): Promise<any> => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    return await axios.delete(`${BASE_URL}/users/delete`, config)
  } catch (error) {
    console.error(error)
    toast.error('Kunne ikke slette brukeren. Prøv igjen senere.')
    throw error
  }
}
/**
 * Retrieves user's account information.
 * @param token User token for authentication.
 * @returns Promise with the response data of the user's bank accounts.
 */
export const getUserAccountInfo = async (token: string): Promise<any> => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const result = await axios.get(`${BASE_URL}/user/account`, config)
    return result.data
  } catch (error) {
    console.log(error)
    toast.error('Kunne ikke hente brukerkontoer. Prøv igjen senere.')
  }
}
/**
 * Retrieves user information.
 * @param token User token for authentication.
 * @returns Promise with the response data of the user's info.
 */
export const getUserInfo = async (token: string): Promise<any> => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const result = await axios.get(`${BASE_URL}/users/get`, config)
    return result.data
  } catch (error) {
    console.log(error)
    toast.error('Kunne ikke hente brukerinfo. Prøv igjen senere.')
    throw error
  }
}
/**
 * Updates user information.
 * @param token User token for authentication.
 * @param email User's email to update.
 * @param profilePictureBase64 User's profile picture to update.
 * @returns Promise with the response data.
 */
export const updateUserInfo = async (
  token: string,
  email: string,
  profilePictureBase64: string
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const data = {
      email: email,
      profilePictureBase64: profilePictureBase64
    }
    return await axios.put(`${BASE_URL}/users/update`, data, config)
  } catch (error) {
    console.error(error)
    toast.error('Kunne ikke oppdatere brukerinfo. Prøv igjen senere.')
    throw error
  }
}
/**
 * Updates user's password information.
 * @param token User token for authentication.
 * @param currentPassword Current password of the user.
 * @param newPassword New password to update.
 * @returns Promise with the response data if it went well or not.
 */
export const updatePasswordInfo = async (
  token: string,
  currentPassword: string,
  newPassword: string
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const data = {
      password: currentPassword,
      newPassword: newPassword
    }
    return await axios.put(`${BASE_URL}/userCredentials/updatePassword`, data, config)
  } catch (error) {
    console.error(error)
    throw error
  }
}
/**
 * Updates user's bank account information.
 * @param token User token for authentication.
 * @param checkingAccount Checking account number to update.
 * @param savingAccount Saving account number to update.
 * @returns Promise with the response data.
 */
export const updateBankAccountInfo = async (
  token: string,
  checkingAccount: number,
  savingAccount: number
): Promise<any> => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const data = {
      currentAccount: checkingAccount,
      savingsAccount: savingAccount
    }
    return await axios.put(`${BASE_URL}/users/update`, data, config)
  } catch (error) {
    console.error(error)
    throw error
  }
}
/**
 * Updates user's income information.
 * @param token User token for authentication.
 * @param monthlyIncome Monthly income to update.
 * @param monthlyFixedExpenses Monthly fixed expenses to update.
 * @param monthlySavings Monthly savings to update.
 * @returns Promise with the response data.
 */
export const updateIncomeInfo = async (
  token: string,
  monthlyIncome: number,
  monthlyFixedExpenses: number,
  monthlySavings: number
): Promise<any> => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const data = {
      monthlyIncome: monthlyIncome,
      monthlyFixedExpenses: monthlyFixedExpenses,
      monthlySavings: monthlySavings
    }
    return await axios.put(`${BASE_URL}/users/update`, data, config)
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Retrieves achievements that hasn't been completed by the user.
 * @param token User token for authentication.
 * @returns Promise with the response data of the uncompleted achievements
 */
export const getLockedAchievements = async (token: string): Promise<any> => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const result = await axios.get(`${BASE_URL}/achievement/locked`, config)
    return result.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
