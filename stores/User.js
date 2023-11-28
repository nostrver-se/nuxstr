import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user-store',
  state: () => {
    return {
      npub: '',
      name: 'Sebastian',
      customRelays: [],
      signedIn: false,
      loggedOut: true,
    }
  },
  action: {
    setNpub(npub) {
      this.npub = npub
    },
    setName(name) {
      this.name = name
    }
  },
  getters: {

  }
})