/**
 * This file contains functions related to user authentication, such as login, signup, token refresh, and logout via API calls..
 */
import axios from 'axios'
import { useTokenStore } from '../stores/token'
import router from '@/router'
import { BASE_URL } from '@/config/config'
import { useToast } from 'vue-toast-notification'

const toast = useToast()
/**
 * Retrieves a JWT token for the user.
 * @param username User's username.
 * @param password User's password.
 * @returns Promise with the response that contains JWT token.
 */
export const getJwtToken = async (username: string, password: string) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    return axios.post(`${BASE_URL}/auth/login`, { username, password }, config)
  } catch (error) {
    console.log('Error getting JWT token: ', error)
    toast.error('En feil oppstod under innloggingen. Vennligst prøv igjen.')
  }
}
/**
 * Signs up a new user.
 * @param username User's username.
 * @param email User's email.
 * @param password User's password.
 */
export const signUpUser = async (username: string, email: string, password: string) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    await axios.post(
      `${BASE_URL}/userCredentials/create`,
      { username, email, password }, // Pass object directly, no need for JSON.stringify()
      config
    )
    await useTokenStore().getTokenAndSaveInStore(username, password)
  } catch (error) {
    console.error('An error occurred during sign up:', error)
    toast.error('En feil oppstod under registreringen. Vennligst prøv igjen.')
    throw error
  }
}
/**
 * Retrieves user information.
 * @param username User's username.
 * @param token User's token for authentication.
 * @returns Promise with the data of user info.
 */
export const getUserInfo = async (username: string, token: string) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  }
  try {
    return await axios.get(`${BASE_URL}/users/get`, config)
  } catch (error) {
    console.log(error)
    toast.error('En feil oppstod under henting av brukerinformasjon. Vennligst prøv igjen.')
  }
}
/**
 * Refreshes the user's token.
 * @param token User's current token.
 * @returns Promise with the response data of the response token
 */
export const refreshToken = async (token: string) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  }
  try {
    return await axios.get(`${BASE_URL}/auth/refresh`, config)
  } catch (error) {
    console.log(error)
    toast.error('En uventet feil oppstod. Vennligst logg inn på nytt.')
  }
}

export const logout = async () => {
  useTokenStore().logout()
  router.push('/login').then((r) => r)
  toast.info('Du er nå logget ut.')
}
