import { defineStore } from "pinia";
import {
    getJwtToken,
    getUserInfo,
    refreshToken
} from "@/utils/frontPageUtils";
import router from "@/router";

export const useTokenStore = defineStore({
    id: 'token',
    state: () => ({
        timer: null as ReturnType<typeof setTimeout> | null,
        jwtToken: "",
        username: null as string | null,
        isConnectedToBank: null as boolean | null
    }),

    persist: {
        storage: sessionStorage
    },

    actions: {
        async getTokenAndSaveInStore(username: string, password: string) {
            try {
                const response = await getJwtToken(username, password);
                if (response !== undefined && response.data.useername !== "") {
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
                this.startTimer();
            } catch (error) {
                console.error(error, "Error getting token");
            }
        },

        async refreshToken() {
            try {
                const response = await refreshToken(this.jwtToken);
                if (response !== undefined) {
                    this.jwtToken = response.data;
                    this.startTimer();
                }
            } catch (error) {
                console.error(error);
            }
        },

        logout() {
            this.jwtToken = "";
            this.username = null;
            this.isConnectedToBank = null;
            router.push("/login").then(r => r);
        },

        startTimer() {
            this.timer = setTimeout(() => {
                if (window.confirm("Your session is about to expire. Do you want to extend it?")) {
                    this.refreshToken().then(r => r);
                } else {
                    this.logout();
                }
            }, 300000);
        },
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