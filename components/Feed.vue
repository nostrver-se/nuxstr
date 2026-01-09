<script setup>
  import { ref } from "vue"
  import { useNdkStore } from '~/stores/Ndk'

  const NdkStore = useNdkStore()
  const events = ref()

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
   * Let's async load the feed component with:
   * https://nuxt.com/docs/api/composables/use-async-data
   */
  // const { data, pending, error, refresh } = await useAsyncData(
  //     'feed',
  //     () => {
  //       // Return a promise object here.
  //     }
  // )

  const fetchFeed = async() => {
    // Fetch all events with different kind.
    const filters = {kinds: fetchKinds, limit: 50}
    events.value = await NdkStore.ndk.fetchEvents(filters)
    // For NDK >version 2.8
    //   const revents = await NdkStore.ndk.subscribe(
    //     filters,
    //     {
    //       closeOnEose: true,
    //       relayUrls: ['wss://nos.lol'],
    //     },
    //     {
    //       onEvent: (event) => {
    //         console.log(event);
    //         console.log('New note:', event.content);
    //       },
    //       onEvents: (events) => { // Parameter renamed to 'events'
    //         console.log(`Received ${events.length} events from cache initially.`);
    //         events.value = events
    //       },
    //     }
    //   )
    //   console.log(revents)
  }

  onMounted(async() => {
    NdkStore.setOutboxModel(true)
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