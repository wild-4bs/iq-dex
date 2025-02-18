import { defineStore } from 'pinia'

type usersResponse = {
  ok: boolean;
  message: string;
  users: any
}

export const useMyDashboardStore = defineStore({
  id: 'myDashboardStore',
  state: () => ({
    users: []
  }),
  actions: {
    async getUsers() {
      const homeStore = useMyHomeStore()
      const { runErrorToast } = useShadcnHelpers()
      try {
        const response = await $fetch<usersResponse>(`${homeStore.baseUrl}/api/user`, {
          method: "GET"
        })
        if (response.ok) {
          this.users = response.users
        }
      } catch (error: any) {
        runErrorToast({
          title: "Error while fetching users.",
          message: error.statusMessage
        })
      }
    }
  }
})
