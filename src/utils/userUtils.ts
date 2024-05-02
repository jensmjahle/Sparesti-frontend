import axios from "axios";
import {BASE_URL} from "@/config/config";
import {useTokenStore} from "@/stores/token";


export const getTotalSavings = async():Promise<any> => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    try {
        const response = await axios.get(`${BASE_URL}/users/get/totalSavings`, config)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function getUserNewAchievements(){

    const config = {
        headers: {
            'Content-Type': 'Application/json',
            'Authorization': 'Bearer ' + useTokenStore().getJwtToken
        }
    }
    try {
        const response = await axios.get(`${BASE_URL}/achievement/newUnlocked`, config)
        return response.data
    } catch (error) {
        console.log(error)
    }
}