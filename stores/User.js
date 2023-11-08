import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user-store',
  state: () => {
    return {
      name: 'Sebastian'
    }
  },
  action: {
    setName(name) {
      this.name = name
    }
  }
})