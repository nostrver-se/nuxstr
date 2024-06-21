<script setup>
  import { ref } from "vue"
  import { useNdkStore } from '~/stores/Ndk'

  const NdkStore = useNdkStore()

  const places = ref()

  const fetchPlaces = async () => {
    const filter = {kinds: [37515], limit: 25}
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
    Display a list with places requested (event kind <code>37515</code> from yondar.nostr1.com and khatru.nostrver.se)
    <br />
    <code>{{ NdkStore.explicitRelayUrls }}</code>
    <ul v-if="places">
      <li v-for="(place) in places" class="break-all p-2 mb-2 border-b border-b-purple-100">
        <NuxtLink :to="`/event/${place.id}`">{{ place.dTag }}</NuxtLink>
      </li>
    </ul>
    <div v-else>
      Loading places...
    </div>
  </div>
</template>

<style scoped>

</style>