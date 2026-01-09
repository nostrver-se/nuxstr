import { defineStore } from 'pinia'

export const useUserStore = defineStore('user-store', {
  state: () => ({
    npub: '',
    pubkey: '',
    name: '',
    customRelays: [],
    signedIn: false,
    loggedOut: true,
  }),
  actions: {
    setNpub(npub) {
      this.npub = npub
    },
    setName(name) {
      this.name = name
    },
    async login(user, ndk) {
      this.pubkey = user.pubkey
      await this.fetchProfile(user, ndk)
      this.signedIn = true
      this.loggedOut = false
    },
    logout() {
      // @todo how dow we logout / disconnect from the signer with NDK?
      this.loggedOut = true
      this.signedIn = false
    },
    // Fetch profile of user with
    // https://ndk.fyi/docs/classes/NDKUser.html#fetchProfile
    async fetchProfile(user, ndk) {
      user = ndk.getUser({
        npub: user.npub
      })
      if (user.profile === undefined) {
        await user.fetchProfile()
        this.npub = user.npub
        this.name = user.profile.name
      }
    },
    // Fetch profile with an event request.
    async fetchProfileKind0 (user, ndk) {
      // @todo
      // Fetch the newest event kind 0 from user with an event.
      try {
        const filter = {
          kinds: [0],
          authors: [user.hexpubkey]
        }
        return await ndk.fetchEvent(filter)
      } catch (e) {
        console.log(e)
        alert(e)
      }
    }
  },
  getters: {

  }
})