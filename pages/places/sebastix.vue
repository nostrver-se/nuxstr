<script setup>
import { ref } from "vue"
import { useNdkStore } from '~/stores/Ndk'

const NdkStore = useNdkStore()

const place = ref()
const place_raw = ref()
const checkins = ref()

/**
 *
 * @param id
 * @returns {Promise<void>}
 */
const fetchPlaceById = async (id) => {
  const filter = {
    kinds: [37515],
    limit: 1,
    authors: ['06639a386c9c1014217622ccbcf40908c4f1a0c33e23f8d6d68f4abf655f8f71'],
    ids: [id]
  }
  /** @var {NDKEvent} place_sebastix */
  const place_sebastix = await NdkStore.ndk.fetchEvent(filter)
  place.value = place_sebastix
  place_raw.value = place_sebastix.rawEvent()
  await fetchCheckIns(place_sebastix)
}

/**
 *
 * @param {NDKEvent} place
 * @returns {Promise<void>}
 */
const fetchCheckIns = async (place) => {
  const filter = {
    kinds: [13811]
  }
  /** @var {Set} res */
  const res  = await NdkStore.ndk.fetchEvents(filter)
  checkins.value = res
}

onMounted(async () => {
  NdkStore.setExplicitRelays([
    'wss://khatru.nostrver.se',
    'wss://yondar.nostr1.com',
    'wss://nos.lol'
  ])
  NdkStore.setOutboxModel(false)
  await NdkStore.initNdk()
  await NdkStore.ndk.connect()
  await fetchPlaceById('0784e6d5b42cbb249d5b166e4c3c195444c8a9f99b2967f31165dc791212cdcf')
})
</script>

<template>
  <div>
    <h1>Sebastix</h1>
    <hr />
    <div class="" v-if="place">
      NIP-19 bech32 id: <code class="text-sm">{{ place.encode() }}</code>
      <br />
      <a :href="`https://go.yondar.me/place/${ place.encode() }`" target="_blank">View place with Yondar</a>
      <br />
      <NuxtLink to="/places/sebastix/checkin" v-if="place">Go to check-in page</NuxtLink>
      <br />
      Recent checkins on this place:
      <br />
      <div v-if="checkins">
        <div v-for="(checkin) in checkins">
          {{ checkin.created_at }} -
          {{ checkin.content }} by {{ checkin.pubkey }}
        </div>
      </div>
    </div>
    <div v-else>
      Loading place sebastix...
    </div>
    <hr class="my-6" />
    raw event:
    <pre class="bg-gray-800 text-white text-xs overflow-x-scroll" v-if="place">
      <code>{{ place_raw }}</code>
    </pre>
  </div>
</template>

<style scoped>

</style>