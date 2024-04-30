import axios from "axios";
import { useTokenStore } from '../stores/token';
import router from "@/router";

export const getJwtToken = async (username: string, password: string) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    try {
        return axios.post(
            "http://localhost:8080/auth/login",
            { username, password },
            config
        );
    } catch (error) {
        console.log("Error getting JWT token: ", error);
    }
}

export const signUpUser = async (username: string, email: string, password: string ) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    try {
        await axios
            .post(
                "http://localhost:8080/userCredentials/create",
                {username, email, password}, // Pass object directly, no need for JSON.stringify()
                config
            );
        await useTokenStore().getTokenAndSaveInStore(username, password)

    } catch(error) {
        console.error("An error occurred during sign up:", error);
        alert("An error occurred during sign up. Please try again.")
        throw error;
    }
};

export const getUserInfo = async(username: string, token: string) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    };
    try {
        return await axios.get("http://localhost:8080/users/get", config)
    } catch (error) {
        console.log(error)
    }
}

export const refreshToken = async (token: string) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    };
    try {
        return await axios.get("http://localhost:8080/auth/refresh", config)
    } catch (error) {
        console.log(error)
    }
}

export const logout = async () => {
    useTokenStore().logout();
    router.push("/login").then(r => r);
}