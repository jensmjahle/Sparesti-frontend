import axios from 'axios'

export async function getMilestoneDetails(id: number){

  console.log("Method is called")

  const config = {
    headers: {
      'Content-Type': 'Application/json',
      'Authorization': 'Bearer ' + TokenStore().getToken()
    }
  }

  return await axios.post("http://Localhost:8080/milestone/id", id, config);
}