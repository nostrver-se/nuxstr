<script setup>
  import { useNdkStore } from '~/stores/Ndk'
  import { useUserStore } from "~/stores/User";
  import {NDKEvent, NDKRelaySet, NDKRelay, NDKNip07Signer} from "@nostr-dev-kit/ndk";

  const route = useRoute()
  const NdkStore = useNdkStore()
  const UserStore = useUserStore()
  const place = ref()
  const nip07signer = new NDKNip07Signer()

  const doCheckin = () => {
    console.log('@todo - create and sign 13811 event here')
    alert('@todo - create and sign 13811 event here')
    const checkinEvent = new NDKEvent(NdkStore.ndk)
    checkinEvent.created_at = Math.floor(Date.now() / 1000)
    checkinEvent.pubkey = UserStore.pubkey
    checkinEvent.content = ''
    checkinEvent.kind = 13811
    checkinEvent.tags = [
        [
            'a',
            '37515:'+UserStore.pubkey+':Sebastix',
            'wss://khatru.nostrver.se',
            Math.floor(Date.now() / 1000).toString()
        ],
    ]
    console.log(checkinEvent)
    const rly = new NDKRelay('wss://khatru.nostrver.se')
    const relaySet = new NDKRelaySet(rly, NdkStore.ndk)
    checkinEvent.publish(relaySet)
  }

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