import axios from 'axios'
export const createMilestone = async (milestoneData: any, token: string) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
  try{
    return await axios.post('http://localhost:8080/milestone/create', milestoneData, config)
  } catch (e) {
    console.log(e)
  }
}
