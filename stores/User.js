import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user-store',
  state: () => {
    return {
      npub: '',
      name: '',
      customRelays: [],
      signedIn: false,
      loggedOut: true,
    }
  },
  actions: {
    setNpub(npub) {
      this.npub = npub
    },
    setName(name) {
      this.name = name
    },
    login(user) {
      this.npub = user.npub
      this.signedIn = true
      this.loggedOut = false
    },
    logout() {
      // @todo how dow we logout / disconnect from the signer with NDK?
      this.loggedOut = true
      this.signedIn = false
    }
  },
  getters: {

  }
})