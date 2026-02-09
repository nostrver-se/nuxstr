<script setup>
  import { ref } from "vue"
  import { useNdkStore } from '~/stores/Ndk'

  const NdkStore = useNdkStore()
  const events = ref([])

  const fetchKinds = [
    0, // Profile metadata
    1, // Notes
    3, // Contacts
    6, // Repost
    7, // Reaction
    1985, // Label
    9735, // Zap receipt event
    10002, // Relay list metadata
    30023 // Long-form content
  ]

  /**
   * @todo
   * Lets async load the feed component with:
   * https://nuxt.com/docs/api/composables/use-async-data
   */
  // const { data, pending, error, refresh } = await useAsyncData(
  //     'feed',
  //     () => {
  //       // Return a promise object here.
  //     }
  // )

  const fetchFeed = async() => {
    // Fetch all events with different kinds.
    const filters = {kinds: fetchKinds, limit: 50}
    await NdkStore.ndk.subscribe(
      filters,
      {
        closeOnEose: false,
      },
      {
        onEvent: (event) => {
          events.value.push(event)
        },
      }
   )
  }

  onMounted(async() => {
    NdkStore.setOutboxModel(false)
    NdkStore.resetExplicitRelays()
    await NdkStore.initNdk()
    await NdkStore.ndk.connect()
    await fetchFeed()
  })
</script>

<template>
  <div>
    <h1 class="px-2" v-if="NdkStore.initialized">
      Feed with last 50 events from
      <br />
      <code>{{ NdkStore.explicitRelayUrls }}</code>
    </h1>
    <ul v-if="events">
      <li v-for="(event) in events" class="break-all p-2 mb-2 bg-purple-100">
        <NuxtLink :to="`/event/${event.id}`">{{ event.id }}</NuxtLink>
        <br />
        <span>pubkey: {{ event.pubkey }}</span>
        <br />
        <span>created at: {{ event.created_at }} - kind: {{ event.kind }}</span>
        <br />
        content<br />
        <div class="py-2">{{ event.content }}</div>
      </li>
    </ul>
    <div class="text-center text-2xl py-8" v-else>
      Loading feed...
    </div>
  </div>
</template>

<style scoped>

</style>