<script setup>
  import { useNdkStore } from '~/stores/Ndk'
  import { useUserStore } from "~/stores/User";
  import {NDKEvent, NDKRelaySet, NDKRelay, NDKNip07Signer} from "@nostr-dev-kit/ndk";

  const NdkStore = useNdkStore()
  const UserStore = useUserStore()
  const nip07signer = new NDKNip07Signer()

  const publishEvent = async () => {
    try {
      // Create event.
      const event = new NDKEvent(NdkStore.ndk)
      event.kind = 13811
      event.content = 'Debugging some NDK components here... This is just a test from Nuxstr publishing a short text note (kind 1)...'
      event.tags = [
          ['client', 'nuxstr.nostrver.se']
      ]
      const result = await event.publish()
      console.log(result)
      // @todo show result here
    } catch (e) {
      console.log(e)
    }
  }

  const publishEventToRelays = async () => {
    try {
      // Create event.
      const event = new NDKEvent(NdkStore.ndk)
      event.kind = 13811
      event.content = 'This is just a test from Nuxstr publishing a short text note (kind 13811) to specific relays...'
      event.tags = [
        ['client', 'nuxstr.nostrver.se']
      ]
      // Publish event to given relaySet
      const relays = new NDKRelaySet(
        new Set([
          new NDKRelay('wss://khatru.nostrver.se'), // this relay is only accepting event kinds 13811 and 37515
          new NDKRelay('wss://nostr.sebastix.dev')
        ]),
        NdkStore.ndk
      )
      const result = await event.publish(relays, 10000)
      console.log(result)
      // @todo show result here
    } catch (e) {
      console.log(e)
      if (e instanceof PublishError) {
        for (const [relay, err] of e.errors) {
          console.error(`error publishing to relay ${relay.url}`, err);
        }
      }
    }
  }

  onMounted(async () => {
    try {
      if (!UserStore.signedIn) {
        await NdkStore.initNdk()
        NdkStore.ndk.signer = nip07signer
        await NdkStore.ndk.connect()
        const user = await nip07signer.user()
        UserStore.login(user, NdkStore.ndk)
        NdkStore.ndk.pool?.on("relay:connecting", (relay) => {
          console.log("🪄 MAIN POOL Connecting to relay", relay.url);
        });
        NdkStore.ndk.pool?.on("relay:connect", (relay) => {
          console.log("✅ MAIN POOL Connected to relay", relay.url);
        });
      }
    } catch (e) {
      console.log(e)
    }
  })

</script>

<template>
  <div>
    <p class="mb-2">Testing out some stuff here...</p>
    <div v-if="UserStore.signedIn">
      <button @click="publishEvent" class="p-2 mb-2 bg-purple-100 text-purple-500">Publish event</button>
      <br />
      <button @click="publishEventToRelays" class="p-2 mb-2 bg-purple-100 text-purple-500">Publish event to some relays in a NDKRelaySet</button>
    </div>
    <div v-else>
      Please connect first
    </div>
  </div>
</template>

<style lang="scss">

</style>