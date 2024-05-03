/**
 * This file contains functions related to retrieving total savings and completed achievements for the user.
 */
import axios from 'axios'
import { BASE_URL } from '@/config/config'
import { useTokenStore } from '@/stores/token'

/**
 * Retrieves the total savings of the user.
 * @returns Promise with the total savings data.
 */
export const getTotalSavings = async (): Promise<any> => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const response = await axios.get(`${BASE_URL}/users/get/totalSavings`, config)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

/**
 * Retrieves new achievements unlocked by the user.
 * @returns Promise with the new achievements data.
 */
export async function getUserNewAchievements() {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: 'Bearer ' + useTokenStore().getJwtToken
    }
  }
  try {
    const response = await axios.get(`${BASE_URL}/achievement/newUnlocked`, config)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
