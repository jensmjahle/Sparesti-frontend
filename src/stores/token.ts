import { defineStore } from "pinia";
import {
    getJwtToken,
    getUserInfo
} from "@/utils/frontPageUtils";

export const useTokenStore = defineStore('token', {
    state: () => ({
        timer: null,
        jwtToken: "",
        username: null,
        isConnectedToBank: false

    }),

    persist: {
        storage: sessionStorage
    },

    actions: {
        async getTokenAndSaveInStore(username: string, password: string) {
            try {
                const response = await getJwtToken(username, password);
                if (response !== undefined) {
                    console.log(response)
                    const data = response.data;
                    if (data !== "" && data !== undefined) {
                        this.jwtToken = data;
                        await getUserInfo(username, this.jwtToken).then(response => {
                            if (response !== undefined) {
                                this.username = response.data.username
                                this.isConnectedToBank = response.data.isConnectedToBank
                                console.log(this.isConnectedToBank)

                            }

                        })
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
    },

    getters: {
        getJwtToken: (state) => {
            return state.jwtToken;
        },

        getUserRole: (state) => {
            return state.isConnectedToBank;
        },

        getUsername: (state) => {
            return state.username;
        }
    }
});
