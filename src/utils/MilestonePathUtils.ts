import axios from 'axios'
import {useTokenStore} from '@/stores/token'
import {BASE_URL} from "@/config/config";

export async function getMilestoneDetails(id: number){

  console.log("Method is called")

  const config = {
    headers: {
      'Content-Type': 'Application/json',
      'Authorization': 'Bearer ' + useTokenStore().getJwtToken
    }
  }

  return await axios.get(`${BASE_URL}/milestone/` + id, config);
}

export async function updateMilestoneDetails(data:any){
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      'Authorization': 'Bearer ' + useTokenStore().getJwtToken
    }
  }
  return await axios.put(`${BASE_URL}/milestone/edit`, data, config)
}
