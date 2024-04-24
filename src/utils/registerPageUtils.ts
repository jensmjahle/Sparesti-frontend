import axios from "axios";

export const getUserBankAccounts = async(token: string):Promise<any> => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    };
    try {
        const response = await axios.get("http://localhost:8080/user/account", config)
        return response.data
    } catch (error) {
        console.log(error)
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
        const response = await axios.post("http://localhost:8080/users/update",
            JSON.stringify(user),
            config)
        return response.data
    } catch (error) {
        console.log(error)
    }
}