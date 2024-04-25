import axios from 'axios'
import {useTokenStore} from '@/stores/token'

export async function getMilestoneDetails(id: number){

  console.log("Method is called")

  const config = {
    headers: {
      'Content-Type': 'Application/json',
      'Authorization': 'Bearer ' + useTokenStore().getJwtToken
    }
  }

  return await axios.get("http://Localhost:8080/milestone/" + id, config);
}