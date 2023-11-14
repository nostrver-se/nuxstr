<script setup>
import { ref } from "vue";
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

await NdkStore.initNdk().then(async() => {
  NdkStore.ndk.connect().then(() => {
    fetchFeed()
  }).finally(() => {
    console.log('Feed data is loaded')
  })
})

function fetchFeed() {
  // Fetch all events with different kind.
  NdkStore.ndk.fetchEvents({kinds: fetchKinds, limit: 50}).then(result => {
    events.value = result
  })
}
</script>

<template>
  <div>
    <h1>Feed with last 50 events from {{ NdkStore.ndk.explicitRelayUrls }}</h1>
    <ul>
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
  </div>
</template>

<style scoped>

</style>