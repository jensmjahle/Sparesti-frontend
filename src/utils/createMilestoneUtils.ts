/**
 * This file contains functions for creating milestones via API calls.
 */

import axios from 'axios'
import {BASE_URL} from "@/config/config";
import {useToast} from "vue-toast-notification";
const toast = useToast();
/**
 * Creates a new milestone.
 * @param milestoneData Data of the milestone to be created.
 * @param token User token for authentication.
 * @returns Promise with the response data.
 */
export const createMilestone = async (milestoneData: any, token: string) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
  try{
    return await axios.post(`${BASE_URL}/milestone/create`, milestoneData, config)
  } catch (e) {
    console.log(e)
    toast.error('Kunne ikke opprette sparesti. Prøv igjen senere.')
  }
}
