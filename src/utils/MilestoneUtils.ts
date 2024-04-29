import axios from 'axios';

export const getAllMilestones = async(token: string, page:number, size:number) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    params: {
      'page': page,
      'size': size
    }
  };
  try {
    const response = await axios.get("http://localhost:8080/milestone/user", config)
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export const getAllMilestoneLogs = async(token: string, page:number, size:number) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    params: {
      'page': page,
      'size': size
    }
  };
  try {
    const response = await axios.get("http://localhost:8080/milestoneLog/user", config)
    return response.data
  } catch (error) {
    console.log(error)
  }
}