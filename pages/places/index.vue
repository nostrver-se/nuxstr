<script setup>
  import { ref } from "vue"
  import { useNdkStore } from '~/stores/Ndk'

  const NdkStore = useNdkStore()

  const places = ref()

  const fetchPlaces = async () => {
    const filter = {kinds: [37515], limit: 50}
    places.value = await NdkStore.ndk.fetchEvents(filter)
  }

  onMounted(async () => {
    NdkStore.setExplicitRelays([
      'wss://khatru.nostrver.se',
      'wss://yondar.nostr1.com'
    ])
    NdkStore.setOutboxModel(false)
    await NdkStore.initNdk()
    await NdkStore.ndk.connect()
    await fetchPlaces()
  })

</script>

<template>
  <div>
    Display a list with places and with a Check-in button.
    <br />
    <code>{{ NdkStore.explicitRelayUrls }}</code>
    <ul v-if="places">
      <li v-for="(place) in places" class="break-all p-2 mb-2 border-b border-b-purple-100">
        <NuxtLink :to="`/event/${place.id}`">{{ place.id }}</NuxtLink>
      </li>
    </ul>
    <div v-else>
      Loading places...
    </div>
    <br />
    Places - requested locations (event kind 37515 from yondar.nostr1.com and khatru.nostrver.se)
  </div>
</template>

<style scoped>

</style>