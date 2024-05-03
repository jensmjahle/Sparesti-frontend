/**
 * This file contains a function to retrieve the total savings of a user via API calls.
 */

import axios from 'axios';
import { useTokenStore } from '@/stores/token';
import { BASE_URL } from "@/config/config";

/**
 * Retrieves the total savings of a user.
 * @returns Promise with the response data of the total saving of the user.
 */
export async function getUserTotalSavings() {

  const config = {
    headers: {
      'Content-Type': 'Application/json',
      'Authorization': 'Bearer ' + useTokenStore().getJwtToken
    }
  };

  try {
    const response = await axios.get(`${BASE_URL}/users/get/savings`, config)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
