import axios from "axios";

export const getTotalSavings = async():Promise<any> => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    try {
        const response = await axios.get("http://localhost:8080/users/get/totalSavings", config)
        return response.data
    } catch (error) {
        console.log(error)
    }
}