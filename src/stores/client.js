import { defineStore } from 'pinia'

export const useClientStore = defineStore({
    id: 'client',
    state: () => ({
        islogged: false,
        firstName: null,
        lastName: null,
        solde: null,
        token: null
    }),
    actions: {
        setUser(data) {
            this.islogged = true
            this.firstName = data.firstName
            this.lastName = data.lastName
            this.solde = data.solde
            this.token = data.token
        },
        unsetUser() {
            this.islogged = false
            this.firstName = null
            this.lastName = null
            this.solde = null
            this.token = null
        },
        updateSolde(newValue) {
            this.solde = newValue
        }
    },
    getters: {
        isUserLogged: (state) => {
            return state.islogged
        },
        fullName: (state) => {
            return ((state.firstName && state.lastName) ? state.firstName + " " + state.lastName : "anonyme")
        },
        currentSolde: (state) => {
            return state.solde
        },
        userToken: (state) => {
            return state.token
        }
    }

})