/**
 * This file contains functions related to milestone management, such as retrieving details, updating, direct transfer
 * and deletion via API calls.
 */
import axios from 'axios'
import { useTokenStore } from '@/stores/token'
import { BASE_URL } from '@/config/config'
import { useToast } from 'vue-toast-notification'

const toast = useToast()
/**
 * Retrieves details of a milestone.
 * @param id ID of the milestone.
 * @returns Promise with the response data of the milestone.
 */
export async function getMilestoneDetails(id: number) {
  console.log('Method is called')

  const config = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: 'Bearer ' + useTokenStore().getJwtToken
    }
  }
  try {
    return await axios.get(`${BASE_URL}/milestone/` + id, config)
  } catch (error) {
    console.log(error)
    toast.error('Kunne ikke hente sparesti. Prøv igjen senere.')
    return null
  }
}
/**
 * Updates details of a milestone.
 * @param data Data to be updated.
 * @returns Promise with the response data.
 */
export async function updateMilestoneDetails(data: any) {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: 'Bearer ' + useTokenStore().getJwtToken
    }
  }
  try {
    return await axios.put(`${BASE_URL}/milestone/edit`, data, config)
  } catch (error) {
    console.log(error)
    toast.error('Kunne ikke oppdatere sparesti. Prøv igjen senere.')
    return null
  }
}
/**
 * Performs a direct transfer for a milestone.
 * @param amount Amount to transfer.
 * @param id ID of the milestone.
 * @returns Promise with the response data.
 */
export async function directTransfer(amount: number, id: number) {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: 'Bearer ' + useTokenStore().getJwtToken
    }
  }

  return await axios.post(
    'http://localhost:8080/milestone/inject',
    { milestoneId: id, amount: amount },
    config
  )
}
/**
 * Deletes a milestone.
 * @param milestoneId ID of the milestone to delete.
 * @returns Promise with the response data.
 */
export async function deleteMilestone(milestoneId: number) {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: 'Bearer ' + useTokenStore().getJwtToken
    }
  }

  return await axios.delete(`http://localhost:8080/milestone/delete/${milestoneId}`, config)
}
