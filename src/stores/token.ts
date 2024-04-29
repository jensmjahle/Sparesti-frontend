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
        isConnectedToBank: null as boolean | null,
        isActive: true
    }),

    persist: {
        storage: sessionStorage
    },

    actions: {
        async getTokenAndSaveInStore(username: string, password: string) {
            let response;
            try {
                response = await getJwtToken(username, password);
                if (response !== undefined && response.data.username !== "") {
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
                const response = await refreshToken(this.jwtToken);
                if (response !== undefined) {
                    this.jwtToken = response.data;
                    this.displayPopUp = false;
                    this.startTimer();
                }
            } catch (error) {
                console.error(error);
            }
        },

        setActive(boolean: boolean) {
            this.isActive = boolean;
        },

        logout() {
            this.jwtToken = "";
            this.username = null;
            this.isConnectedToBank = null;
            this.displayPopUp = false;
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
                console.log(this.isActive)
                if (this.isActive) this.refreshToken()
                else this.displayPopUp = true;
            }, 300000);

            // Set a new timer for logout after 15 seconds (15000 ms)
            this.tokenTimer = setTimeout(() => {
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