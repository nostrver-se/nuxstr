import { defineStore } from "pinia"
import NDK from "@nostr-dev-kit/ndk"

export const useNdkStore = defineStore({
  id: 'ndk-store',
  state: () => ({
    initialized: false,
    explicitRelayUrls: ["wss://nostr.sebastix.dev"],
    outboxRelayUrls: ["wss://purplepag.es"],
    enableOutboxModel: true,
    ndk: null
  }),
  actions: {
    async initNdk() {
      if (this.ndk === null) {
        let options = {
          explicitRelayUrls: this.explicitRelayUrls,
          outboxRelayUrls: this.outboxRelayUrls,
          enableOutboxModel: this.enableOutboxModel
        }
        this.ndk = new NDK(options)
        this.initialized = true
      }
    },
    // @todo
    // - add an explicit relay
    // @todo
    // - remove an explicit relay
    // - set explicit relays (override current list)
    setExplicitRelays(relays = []) {
      this.explicitRelayUrls = relays
    },
    // @todo
    // - reset explicit relays (set to defaults)
    // @todo
    // - add outbox relay
    // @todo
    // - remove outbox relay
    // - set outbox relays (override current list)
    setOutBoxRelays(relays = []) {
      this.outboxRelayUrls = relays
    },
    // @todo
    // - connect
    // @todo
    // - disconnect
    // @todo
    // - reconnect (disconnect and connect)
    // - set outboxModal with a boolean
    setOutboxModel(bool) {
      this.enableOutboxModel = bool
    }
  },
  getters: {

  }
})