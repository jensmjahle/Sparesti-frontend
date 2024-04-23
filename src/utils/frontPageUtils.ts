import axios from "axios";
import {useTokenStore} from "../stores/token.ts"
import router from "@/router";

export const getJwtToken = async (username, password) => {
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
        console.log("potetmos")
    }
}

export const signUpUser = async (username, email, password) => {
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
        throw error;
    }
};

export const getUserInfo = async(username, token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    };
    try {
        console.log(token)
        return await axios.get("http://localhost:8080/users/get", config)
    } catch (error) {
        console.log(error)
    }
}