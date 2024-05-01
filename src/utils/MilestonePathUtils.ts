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

export async function updateMilestoneDetails(data:any){
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      'Authorization': 'Bearer ' + useTokenStore().getJwtToken
    }
  }
  return await axios.put("http://localhost:8080/milestone/edit", data, config)
}

export async function directTransfer(amount : number, id : number){
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      'Authorization': 'Bearer ' + useTokenStore().getJwtToken
    }
  }

  return await  axios.post("http://localhost:8080/milestone/inject", {milestoneId: id, amount : amount}, config)
}

export async function deleteMilestone(milestoneId:number){
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      'Authorization': 'Bearer ' + useTokenStore().getJwtToken
    }
  }

  return await  axios.delete(`http://localhost:8080/milestone/delete/${milestoneId}`, config)
}
