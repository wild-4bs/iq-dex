import { defineStore } from 'pinia'

export const useMyHomeStore = defineStore({
  id: 'HomeStore',
  state: () => ({
    baseUrl: "https://iqdex-api.vercel.app",
    user: {},
    expired: false
  }),
  actions: {}
})
