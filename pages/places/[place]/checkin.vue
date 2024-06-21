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
      // NDK does not support to add tags to a filter
      // tags: [
      //     ['d', name]
      // ]
    }
    console.log(filter)
    // TODO / bug: does not resolve or return a result
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
      //const placeEvent = await fetchPlaceByName(place)
      //console.log(placeEvent)
      const checkinEvent = new NDKEvent(NdkStore.ndk)
      checkinEvent.created_at = Math.floor(Date.now() / 1000)
      checkinEvent.pubkey = UserStore.pubkey
      checkinEvent.content = 'This is a replaceable checkin event for place ' + place
      checkinEvent.kind = 13811
      checkinEvent.tags = [
        ['a', '37515:' + UserStore.pubkey + ':' + place + '', 'wss://khatru.nostrver.se', Math.floor(Date.now() / 1000).toString()],
        ['client', 'nuxstr', 'wss://khatru.nostrver.se']
      ]
      /** @var {NostrEvent} nEvent */
      const nEvent = await checkinEvent.toNostrEvent(UserStore.npub)
      const relays = new NDKRelaySet(
          new Set([
            new NDKRelay('wss://khatru.nostrver.se')
          ]),
          NdkStore.ndk
      )
      const res = await checkinEvent.publish()
      // TODO / bug: publish to a specific set of relays does not work with NDK...
      // Error: Timeout
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
      // NdkStore.ndk.pool?.on("relay:connecting", (relay) => {
      //   console.log("🪄 MAIN POOL Connecting to relay", relay.url);
      // });
      // NdkStore.ndk.pool?.on("relay:connect", (relay) => {
      //   console.log("✅ MAIN POOL Connected to relay", relay.url);
      // });
    } catch (e) {
      console.log(e)
    }
  })

</script>

<template>
  <div>
    <h1>Check-in at {{ place }}</h1>
    <button id="btnCheckin" @click="doCheckin(place)" class="inline-block my-4 px-6 py-4 text-xl text-bold bg-purple-500 text-purple-100" v-if="UserStore.signedIn">Click here</button>
    <NuxtLink to="/login" v-else>Connect first</NuxtLink>
    to check-in at <NuxtLink :to="`/places/${place}`" class="disabled">{{ place }}</NuxtLink>
    <br />
    This will publish the following replaceable event (kind <code>13811</code>) to relay <code>khatru.nostrver.se</code>:
    <pre>
      <code>
      {
        id: "af74809235bcb39920fab8...",
        pubkey: "{{ UserStore.pubkey }}",
        content: "This is a replaceable checkin event for place {{ place }}",
        kind: 13811,
        created_at: {{ Math.floor(Date.now() / 1000).toString() }},
        tags: [
          ["a", "37515:{{ UserStore.pubkey }}:{{ place }}", "wss://khatru.nostrver.se", "{{ Math.floor(Date.now() / 1000).toString() }}"],
          ["client", "nuxstr", "wss://khatru.nostrver.se"]
        ]
      }
      </code>
    </pre>
    <div>
      <h3>Current check-ins</h3>
      @todo - show current checkins for this place
    </div>
    <div>
      <h3>Check-in history</h3>
      @todo - show checkins for this place within a datetime delta in the past
    </div>
    <br class="my-4" />
    <div>WIP NUD could look like this (the original specs are worked out by <a href="https://njump.me/nprofile1qythwumn8ghj7un9d3shjtnwdaehgu3wvfskuep0qys8wumn8ghj7cnfw33k76twd4shs6tdv9kxjum5wvhx7mnvd9hx2tcqyr5w6duccml7hlaqs5q6cw0zw9nzhlgkpa5gl9xyt45jmpm8m5695evkvmk">@arkinox</a>)</div>
    This is a replaceable event determined by the <code>pubkey</code> and <code>kind</code>. This mean this event could represent your current checkin status to a specific location.
    When this event no history of checkins for your npub should be created.
    <pre>
      <code>
        {
          id: "af74809235bcb39920fab8...",
          pubkey: "0f8ba12dc905...",
          content: "",
          kind: 13811,
          created_at: 1706720386,
          tags: [
            ["a", "37515:&lt;pubkey&gt;:&lt;d tag of place&gt;", "wss://relayable.org", "1703721153"] // referencing a place; 4th arg is the time visited
          ]
        }
      </code>
    </pre>
    If we would like to create a history of checkins for a place, we should use the following almost similar event structure (the event kind is <code>33811</code>).
    This is a parameterized replaceable event determined by <code>pubkey</code>, <code>kind</code> and <code>d</code> tag's first value. Please note that older versions may be discarded by relays.
    <pre>
      <code>
        {
          id: "af74809235bcb39920fab8...",
          pubkey: "0f8ba12dc905...",
          content: "",
          kind: 33811,
          created_at: 1706720386,
          tags: [
            ["d", "&lt;d tag of place&gt;"]
            ["a", "37515:&lt;pubkey&gt;:&lt;d tag of place&gt;", "wss://relayable.org", "1703721153"] // referencing a place; 4th arg is the time visited
          ]
        }
      </code>
    </pre>
  </div>
</template>

<style lang="scss">

</style>