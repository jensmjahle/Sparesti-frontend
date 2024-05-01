import axios from "axios";
import {BASE_URL} from "@/config/config";
import {useToast} from "vue-toast-notification";

const toast = useToast();
export const getUserBankAccounts = async(token: string):Promise<any> => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    };
    try {
        const response = await axios.get(`${BASE_URL}/user/account`, config)
        return response.data
    } catch (error) {
        console.log(error)
        toast.error('Kunne ikke hente brukerkontoer. Prøv igjen senere.')
    }
}

export const updateUserAccount = async(user: Record<string, any>, token: string):Promise<any> => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    };
    try {
        const response = await axios.post(`${BASE_URL}/users/update`,
            JSON.stringify(user),
            config)
        return response.data
    } catch (error) {
        console.log(error)
        toast.error('Kunne ikke oppdatere brukerkonto. Prøv igjen senere.')
    }
}