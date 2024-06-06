<script setup>
  import { useNdkStore } from '~/stores/Ndk'
  import { useUserStore } from "~/stores/User";
  import { NDKEvent, NDKRelaySet, NDKRelay, NDKNip07Signer, PublishError } from "@nostr-dev-kit/ndk";

  const route = useRoute()
  const NdkStore = useNdkStore()
  const UserStore = useUserStore()
  const place = ref()
  const nip07signer = new NDKNip07Signer()

  /**
   *
   * @param name
   * @returns {Promise<NDKEvent>}
   */
  const fetchPlaceByName = async(name) => {
    const filter = {
      kind: [37515],
      limit: 1,
      authors: [UserStore.pubkey],
      tags: [
          ['d', name]
      ]
    }
    return await NdkStore.ndk.fetchEvent(filter)
  }

  /**
   * Create and publish a location checkin event.
   *
   * @param {NDKEvent} place
   * @returns {Promise<void>}
   */
  const doCheckin = async (place) => {
    try {
      console.log(place)
      //const placeEvent = await fetchPlaceByName(place)
      //console.log(placeEvent)
      const checkinEvent = new NDKEvent(NdkStore.ndk)
      checkinEvent.created_at = Math.floor(Date.now() / 1000)
      checkinEvent.pubkey = UserStore.pubkey
      checkinEvent.content = ''
      checkinEvent.kind = 13811
      checkinEvent.tags = [
         ['a', '37515:' + UserStore.pubkey + ':' + place + '', 'wss://khatru.nostrver.se', Math.floor(Date.now() / 1000).toString()]
      ]
      /** @var {NostrEvent} nEvent */
      //await checkinEvent.sign()
      const nEvent = await checkinEvent.toNostrEvent(UserStore.npub)
      console.log(JSON.stringify(nEvent))
      const relays = new NDKRelaySet(
          new Set([
            new NDKRelay('wss://khatru.nostrver.se')
          ]),
          NdkStore.ndk
      )
      const res = await checkinEvent.publish()
      //const res = await checkinEvent.publish(relays, 15000)
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
      NdkStore.setExplicitRelays([
        'wss://khatru.nostrver.se',
        'wss://nos.lol'
      ])
      await NdkStore.initNdk()
      NdkStore.setOutboxModel(false)
      if (!UserStore.signedIn) {
        NdkStore.ndk.signer = nip07signer
        await NdkStore.ndk.connect()
        const user = await nip07signer.user()
        UserStore.login(user, NdkStore.ndk)
      } else {
        await NdkStore.ndk.connect()
      }
      NdkStore.ndk.pool?.on("relay:connecting", (relay) => {
        console.log("🪄 MAIN POOL Connecting to relay", relay.url);
      });
      NdkStore.ndk.pool?.on("relay:connect", (relay) => {
        console.log("✅ MAIN POOL Connected to relay", relay.url);
      });
    } catch (e) {
      console.log(e)
    }
  })

</script>

<template>
  <div>
    <h1>{{ place }}</h1>
    <button id="btnCheckin" @click="doCheckin(place)" class="p-2 bg-purple-100 text-purple-500" v-if="UserStore.signedIn">Click here</button>
    <NuxtLink to="/login" v-else>Connect first</NuxtLink>
    to check-in at <NuxtLink :to="`/places/${place}`">{{ place }}</NuxtLink>
    <br />
    This will publish the following replaceable event:
    <pre class="bg-gray-800 text-white text-xs overflow-x-scroll"><code>
    {
      {
        id: "af74809235bcb39920fab8...",
        pubkey: "{{ UserStore.pubkey }}",
        content: "",
        kind: 13811,
        created_at: {{ Math.floor(Date.now() / 1000).toString() }},
        tags: [
          ["a", "37515:{{ UserStore.pubkey }}:{{ place }}", "wss://khatru.nostrver.se", "{{ Math.floor(Date.now() / 1000).toString() }}"]
        ]
      }
    </code>
    </pre>
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