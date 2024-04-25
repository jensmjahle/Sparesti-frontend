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
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getAllMilestoneLogs = async(token: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  };
  try {
    const response = await axios.get("http://localhost:8080/milestoneLog/user", config)
    return response.data
  } catch (error) {
    console.log(error)
  }
}