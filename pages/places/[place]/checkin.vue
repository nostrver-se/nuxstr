<script setup>
  import { useNdkStore } from '~/stores/Ndk'
  import { useUserStore } from "~/stores/User";
  import {NDKEvent, NDKRelaySet, NDKRelay, NDKNip07Signer, PublishError } from "@nostr-dev-kit/ndk";

  const route = useRoute()
  const NdkStore = useNdkStore()
  const UserStore = useUserStore()
  const place = ref()
  const nip07signer = new NDKNip07Signer()

  /**
   * Create and publish a location checkin event.
   * @returns {Promise<void>}
   */
  const doCheckin = async () => {
    try {
      // @TODO - Fetch place event with info from wss://yondar.nostr1.com relay.

      const checkinEvent = new NDKEvent(NdkStore.ndk)
      checkinEvent.created_at = Math.floor(Date.now() / 1000)
      checkinEvent.pubkey = UserStore.pubkey
      checkinEvent.content = ''
      checkinEvent.kind = 13811
      // checkinEvent.tags = [
      //    ['a', '37515:' + UserStore.pubkey + ':Sebastix', 'wss://khatru.nostrver.se', Math.floor(Date.now() / 1000).toString()]
      // ]
      /** @var {NostrEvent} nEvent */
      const nEvent = await checkinEvent.toNostrEvent(UserStore.npub)
      console.log(nEvent)
      const relays = new NDKRelaySet(
          new Set([
            new NDKRelay('wss://khatru.nostrver.se')
          ]),
          NdkStore.ndk
      )
      const res = await checkinEvent.publish(relays, 15000)
      console.log(res)
    } catch (e) {
      console.log(e)
      if (e instanceof PublishError) {
        for (const [relay, err] of e.errors) {
          console.error(`error publishing to relay ${relay.url}`, err);
        }
      }
    }
  }

  /**
   * Init function when this Vue component is mounted.
   */
  onMounted(async () => {
    try {
      place.value = route.params.place
      if (!UserStore.signedIn) {
        await NdkStore.initNdk()
        NdkStore.ndk.signer = nip07signer
        await NdkStore.ndk.connect()
        const user = await nip07signer.user()
        UserStore.login(user, NdkStore.ndk)
      }
    } catch (e) {
      console.log(e)
    }
  })

</script>

<template>
  <div>
    <h1>{{ place }}</h1>
    <button id="btnCheckin" @click="doCheckin" class="p-2 bg-purple-100 text-purple-500" v-if="UserStore.signedIn">Click here</button>
    <NuxtLink to="/login" v-else>Connect first</NuxtLink>
    to check-in at <NuxtLink :to="`/places/${place}`">{{ place }}</NuxtLink>
    <div>
      <h3>Current check-ins</h3>
      @todo ...
    </div>
    <div>
      <h3>Check-in history</h3>
      @todo ...
    </div>
  </div>
</template>

<style lang="scss">

</style>