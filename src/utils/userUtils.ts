import axios from "axios";
import {BASE_URL} from "@/config/config";


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