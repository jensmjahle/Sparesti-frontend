import axios from 'axios'
import {BASE_URL} from "@/config/config";
import {useToast} from "vue-toast-notification";
const toast = useToast();

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
