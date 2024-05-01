import axios from 'axios'
import {useTokenStore} from '@/stores/token'
import {BASE_URL} from "@/config/config";
import {useToast} from "vue-toast-notification";

const toast = useToast();
export async function getMilestoneDetails(id: number){

  console.log("Method is called")

  const config = {
    headers: {
      'Content-Type': 'Application/json',
      'Authorization': 'Bearer ' + useTokenStore().getJwtToken
    }
  }
try {
  return await axios.get(`${BASE_URL}/milestone/` + id, config);
} catch (error) {
  console.log(error)
  toast.error('Kunne ikke hente sparesti. Prøv igjen senere.')
  return null;
}
}

export async function updateMilestoneDetails(data:any){
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      'Authorization': 'Bearer ' + useTokenStore().getJwtToken
    }
  }
  try {
    return await axios.put(`${BASE_URL}/milestone/edit`, data, config)
  } catch (error) {
    console.log(error)
    toast.error('Kunne ikke oppdatere sparesti. Prøv igjen senere.')
    return null;
  }
}
