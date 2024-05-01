import axios from 'axios';
import {BASE_URL} from "@/config/config";
import {useToast} from "vue-toast-notification";

const toast = useToast();
export const getAllMilestonesPaginated = async(token: string, page:number, size:number) => {
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
    const response = await axios.get(`${BASE_URL}/milestone/user/paginated`, config)
    return response.data;
  } catch (error) {
    console.log(error)
    toast.error('En uventet feil oppsto. Kunne ikke hente sparestier. Prøv igjen senere.')
  }
}

export const getAllMilestones = async(token: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
  };
  try {
    const response = await axios.get(`${BASE_URL}/milestone/user`, config)
    return response.data;
  } catch (error) {
    console.log(error)
    toast.error('En uventet feil oppsto. Kunne ikke hente sparestier. Prøv igjen senere.')
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
    const response = await axios.get(`${BASE_URL}/milestoneLog/user`, config)
    return response.data
  } catch (error) {
    console.log(error)
    toast.error('En uventet feil oppsto. Kunne ikke hente fullførte sparestier. Prøv igjen senere.')
  }
}