import axios from 'axios';
import {useTokenStore} from "@/stores/token";

export const getAllMilestones = async(token: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  };
  try {
    const response = await axios.get("http://localhost:8080/milestone/user", config)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}