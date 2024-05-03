/**
 * This file contains functions related to user bank account management,
 * such as retrieving user bank accounts and updating user bank account information.
 */
import axios from "axios";
import {BASE_URL} from "@/config/config";
import {useToast} from "vue-toast-notification";

const toast = useToast();
/**
 * Retrieves user's bank accounts.
 * @param token User token for authentication.
 * @returns Promise with the response data of the bank accounts of the user.
 */
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
/**
 * Updates user's bank account information.
 * @param user User object containing updated bank account information.
 * @param token User token for authentication.
 * @returns Promise with the response data.
 */
export const updateUserAccount = async(user: Record<string, any>, token: string):Promise<any> => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    };
    try {
        const response = await axios.put(`${BASE_URL}/users/update`,
            JSON.stringify(user),
            config)
        return response.data
    } catch (error) {
        console.log(error)
        toast.error('Kunne ikke oppdatere brukerkonto. Prøv igjen senere.')
    }
}
