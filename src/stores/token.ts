import { defineStore } from "pinia";
import {
    getJwtToken,
    getUserInfo
} from "@/utils/frontPageUtils";

export const useTokenStore = defineStore('token', {
    state: () => ({
        timer: null,
        jwtToken: null,
        userRole: null,
        loggedInUser: {
            "username": null,
            "email": null,
            "firstName": null,
            "lastName": null,
            "birthDate": null,
            "profilePictureBase64": null,
            "monthlyIncome": null,
            "monthlySavings": null,
            "monthlyFixedExpenses": null,
            "currentAccount": null,
            "savingsAccount": null,
            "isConnectedToBank": null
        }

    }),

    actions: {
        async getTokenAndSaveInStore(username, password) {
            try {
                const response = await getJwtToken(username, password);
                console.log(response)
                const data = response.data;
                if (data !== "" && data !== undefined) {
                    this.jwtToken = data;
                    await getUserInfo(username, this.jwtToken).then(response => {
                        this.loggedInUser = response.data
                        console.log(this.loggedInUser)

                    })
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

        getLoggedInUser: (state) => {
            return state.loggedInUser;
        },

        getUsername: (state) => {
            return state.loggedInUser ? state.loggedInUser.username : null;
        },

        getFirstName: (state) => {
            return state.loggedInUser ? state.loggedInUser.firstName : null;
        },

        getLastName: (state) => {
            return state.loggedInUser ? state.loggedInUser.lastName : null;
        },

        getEmail: (state) => {
            return state.loggedInUser ? state.loggedInUser.email : null;
        },

        getBirthDate: (state) => {
            return state.loggedInUser ? state.loggedInUser.birthDate : null;
        },

        getProfilePictureBase64: (state) => {
            return state.loggedInUser ? state.loggedInUser.profilePictureBase64 : null;
        },

        getMonthlyIncome: (state) => {
            return state.loggedInUser ? state.loggedInUser.monthlyIncome : null;
        },

        getMonthlySavings: (state) => {
            return state.loggedInUser ? state.loggedInUser.monthlySavings : null;
        },

        getMonthlyFixedExpenses: (state) => {
            return state.loggedInUser ? state.loggedInUser.monthlyFixedExpenses : null;
        },

        getCurrentAccount: (state) => {
            return state.loggedInUser ? state.loggedInUser.currentAccount : null;
        },

        getSavingsAccount: (state) => {
            return state.loggedInUser ? state.loggedInUser.savingsAccount : null;
        },

        getIsConnectedToBank: (state) => {
            return state.loggedInUser ? state.loggedInUser.isConnectedToBank : null;
        }
    }
});
