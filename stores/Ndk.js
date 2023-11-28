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
      ndk: null,
      signer: null
    }
  },
  actions: {
    async initNdk() {
      if (this.ndk === null) {
        this.ndk = new NDK({
          explicitRelayUrls: this.explicitRelayUrls,
          outboxRelayUrls: this.outboxRelayUrls,
          enableOutboxModel: this.enableOutboxModel
        })
        this.initialized = true
      }
    },
    async initNdkWithSigner(signer) {
      if (this.ndk !== null && !this.ndk.signer) {
        this.ndk = new NDK({
          signer: signer,
          explicitRelayUrls: this.explicitRelayUrls,
          outboxRelayUrls: this.outboxRelayUrls,
          enableOutboxModel: this.enableOutboxModel
        })
        this.initialized = true
      }
    }
    // @ todo
    // - add explicit relay
    // - remove explicit relay
    // - add outbox relay
    // - remove outbox relay
    // - connect
    // - disconnect
    // - reconnect (disconnect and connect)
  }
})