/**
 * This file contains functions for retrieving milestones and milestone logs via API calls.
 */

import axios from 'axios'
import { BASE_URL } from '@/config/config'
import { useToast } from 'vue-toast-notification'

const toast = useToast()
/**
 * Retrieves all milestones paginated.
 * @param token User token for authentication.
 * @param page Page number.
 * @param size Number of items per page.
 * @returns Promise with response data, returns a page if it is ok.
 */
export const getAllMilestonesPaginated = async (token: string, page: number, size: number) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    params: {
      page: page,
      size: size
    }
  }
  try {
    const response = await axios.get(`${BASE_URL}/milestone/user/paginated`, config)
    return response.data
  } catch (error) {
    console.log(error)
    toast.error('En uventet feil oppsto. Kunne ikke hente sparestier. Prøv igjen senere.')
  }
}
/**
 * Retrieves all milestones for a user.
 * @param token User token for authentication.
 * @returns Promise with the response data that contains all the milestones of a user.
 */
export const getAllMilestones = async (token: string) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  }
  try {
    const response = await axios.get(`${BASE_URL}/milestone/user`, config)
    return response.data
  } catch (error) {
    console.log(error)
    toast.error('En uventet feil oppsto. Kunne ikke hente sparestier. Prøv igjen senere.')
  }
}

/**
 * Retrieves all milestone logs of a user paginated.
 * @param token User token for authentication.
 * @param page Page number.
 * @param size Number of items per page.
 * @returns Promise with response data, returns a page if it is ok. */
export const getAllMilestoneLogs = async (token: string, page: number, size: number) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    params: {
      page: page,
      size: size
    }
  }
  try {
    const response = await axios.get(`${BASE_URL}/milestoneLog/user`, config)
    return response.data
  } catch (error) {
    console.log(error)
    toast.error('En uventet feil oppsto. Kunne ikke hente fullførte sparestier. Prøv igjen senere.')
  }
}
