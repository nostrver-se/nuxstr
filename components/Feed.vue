<script setup>
import { ref } from "vue";
import { useNdkStore } from '~/stores/Ndk'

const NdkStore = useNdkStore()
const events = ref([])

await NdkStore.initNdk().then(async() => {
  NdkStore.ndk.connect().then(() => {
    fetchFeed()
  }).finally(() => {
    console.log('event fetchFeed within the init ready function')
  })
})

function fetchFeed() {
  // Fetch all events with kind 1.
  NdkStore.ndk.fetchEvents({kinds: [1], limit: 50}).then(result => {
    events.value = result
  })
}
</script>

<template>
  <div>
    <h1>Feed with last 50 events</h1>
    <ul>
      <li v-for="(event) in events" class="break-all">
        <NuxtLink :to="`/event/${event.id}`">{{ event.id }}</NuxtLink> - created at: {{ event.created_at }} - kind: {{ event.kind }} - content: {{ event.content }} - pubkey: {{ event.pubkey }}
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>