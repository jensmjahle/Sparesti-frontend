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

export const updateUserAccount = async (user: Record<string, any>, token: string) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    };
    try {
        const data = {}

        console.log(JSON.stringify(user))
        const response = await axios.put("http://localhost:8080/users/update", data, config)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}