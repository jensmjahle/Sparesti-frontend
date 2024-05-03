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
        async reHydrate() {
            // Restart timers when the store is rehydrated
            await this.refreshToken();
        },
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

        async refreshToken () {
            try {
                const response = await refreshToken(this.jwtToken);
                if (response !== undefined) {
                    this.jwtToken = response.data;
                    this.displayPopUp = false;
                    this.startTimer();
                }
            } catch (error) {
                console.error(error);
                await this.logout();
            }
        },

        setActive(boolean: boolean) {
            this.isActive = boolean;
        },

        async logout() {
            this.cleanStore();
            await router.push("/login");
        },

        cleanStore()  {
            this.$reset();
        },

        timerClear() {
            if (this.timer) clearTimeout(this.timer)
            if (this.tokenTimer) clearTimeout(this.tokenTimer)

        },

        startTimer: function () {
            this.timerClear()

            this.timer = setTimeout(async () => {
                console.log(this.isActive)
                if (this.isActive) {
                    await this.refreshToken();

                } else this.displayPopUp = true;
            }, 300000);

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
    },
});
