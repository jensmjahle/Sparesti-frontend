import axios from 'axios'
import {BASE_URL} from "@/config/config";
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
  }
}
