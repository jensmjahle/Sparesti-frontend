import axios from 'axios'
import {useTokenStore} from '@/stores/token'

export async function getUserTotalSavings(){

  const config = {
    headers: {
      'Content-Type': 'Application/json',
      'Authorization': 'Bearer ' + useTokenStore().getJwtToken
    }
  }

  const response = await axios.get("http://Localhost:8080/users/get/savings", config);
  const result = response.data

  return result
}