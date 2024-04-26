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
        displayPopUp: false,
        timer: null as ReturnType<typeof setTimeout> | null,
        tokenTimer: null as ReturnType<typeof setTimeout> | null,
        jwtToken: "",
        username: null as string | null,
        isConnectedToBank: null as boolean | null
    }),

    persist: {
        storage: sessionStorage
    },

    actions: {
        async getTokenAndSaveInStore(username: string, password: string) {
            let response;
            try {
                response = await getJwtToken(username, password);
                if (response !== undefined && response.data.useername !== "") {
                    const data = response.data;
                    if (data !== "" && data !== undefined) {
                        this.jwtToken = data;
                        this.displayPopUp = false;
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
                if (error instanceof Error) {
                    this.jwtToken = error.message;
                } else {
                    throw error;
                }
            }
        },

        async refreshToken() {
            try {
                console.log("potetmos")
                const response = await refreshToken(this.jwtToken);
                console.log(response)
                if (response !== undefined) {
                    console.log(response)
                    this.jwtToken = response.data;
                    this.displayPopUp = false;
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
            this.timerClear();
            router.push("/login").then(r => r);
        },

        timerClear() {
            if (this.timer) clearTimeout(this.timer)
            if (this.tokenTimer) clearTimeout(this.tokenTimer)

        },

        startTimer() {
            // Clear the existing timer if it's already set
            this.timerClear()

            // Set a new timer for displayPopUp after 10 seconds (10000 ms)
            this.timer = setTimeout(() => {
                this.displayPopUp = true;
            }, 300000);

            // Set a new timer for logout after 15 seconds (15000 ms)
            this.tokenTimer = setTimeout(() => {
                this.displayPopUp = false;
                this.logout();
            }, 360000);
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