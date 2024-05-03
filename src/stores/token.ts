import { defineStore } from "pinia";
import {
    getJwtToken,
    getUserInfo,
    refreshToken
} from "@/utils/frontPageUtils";
import router from "@/router";
/**
 * Store for managing authentication token and user information.
 * @type {Object} TokenStore
 * @type {boolean} displayPopUp - Flag indicating whether to display a popup.
 * @type {ReturnType<typeof setTimeout> | null} timer - Timer used for token refresh.
 * @type {ReturnType<typeof setTimeout> | null} tokenTimer - Timer used for token expiration.
 * @type {string} jwtToken - JWT token for authentication.
 * @type {string | null} username - Username of the authenticated user.
 * @type {boolean | null} isConnectedToBank - Flag indicating whether the user is connected to a bank.
 * @type {boolean} isActive - Flag indicating whether the user's session is active.
 */
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
        /**
         * When page is refreshed, the store will execute refreshToken()
         */
        async reHydrate() {
            // Restart timers when the store is rehydrated
            await this.refreshToken();
        },
                /**
         * Retrieves the JWT token and saves it in the store.
         * @param username - The username for authentication.
         * @param password - The password for authentication.
         */
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
        /**
         * Refreshes the JWT token.
         */
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
        /**
         * Sets the active state of the token.
         * @param {boolean} boolean - The boolean value to set as active.
         */
        setActive(boolean: boolean) {
            this.isActive = boolean;
        },
        /**
         * Logs out the user and resets the state of the store.
         */
        async logout() {
            this.cleanStore();
            await router.push("/login");
        },
        
        /**
         * Clears the store
         */
        cleanStore()  {
            this.$reset();
        },

        /**
         * Clears the timers.
         */
        timerClear() {
            if (this.timer) clearTimeout(this.timer)
            if (this.tokenTimer) clearTimeout(this.tokenTimer)

        },
        /**
         * Starts the timers for token refresh and expiration.
         */
        startTimer: function () {
            this.timerClear()

            this.timer = setTimeout(async () => {
                console.log(this.isActive)
                if (this.isActive) {
                    await this.refreshToken();

                } else this.displayPopUp = true;
            }, 1000);

            this.tokenTimer = setTimeout(() => {
                this.logout();
            }, 120000);
        },
    },

    getters: {
        /**
         * Getter for the JWT token.
         * @param state - The JWT store.
         * @returns The JWT token.
         */
        getJwtToken: (state) => {
            return state.jwtToken;
        },
        /**
         * Getter for the user role.
         * @param  state - The JWT store.
         * @returns Whether the user is connected to a bank.
         */
        getUserRole: (state) => {
            return state.isConnectedToBank;
        },
        /**
         * Getter for the user role.
         * @param  state - The JWT store.
         * @returns The username of the user from token.
         */
        getUsername: (state) => {
            return state.username;
        }
    },
});
