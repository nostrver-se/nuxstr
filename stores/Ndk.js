import { defineStore } from "pinia"
import NDK from "@nostr-dev-kit/ndk"

export const useNdkStore = defineStore({
  id: 'ndk-store',
  state: () => {
    return {
      initialized: false,
      explicitRelayUrls: ["wss://nostr.sebastix.dev"],
      outboxRelayUrls: ["wss://purplepag.es"],
      enableOutboxModel: true,
      ndk: null
    }
  },
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
    // @ todo
    // - add an explicit relay
    // - remove an explicit relay
    // - set explicit relays (override current list)
    setExplicitRelays(relays = []) {
      this.explicitRelayUrls = relays
    },
    // - add outbox relay
    // - remove outbox relay
    // - set outbox relays (override current list)
    setOutBoxRelays(relays = []) {
      this.outboxRelayUrls = relays
    },
    // - connect
    // - disconnect
    // - reconnect (disconnect and connect)
    // - set outboxModal with a boolean
    setOutboxModel(bool) {
      this.enableOutboxModel = bool
    }
  }
})