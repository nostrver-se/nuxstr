<script setup>
import { ref } from "vue";
import NDK from "@nostr-dev-kit/ndk";

// Init NDK instance
const ndk = new NDK({
  explicitRelayUrls: ["wss://nostr.sebastix.dev", "wss://relay.damus.io"],
  outboxRelayUrls: ["wss://purplepag.es"],
  enableOutboxModel: true,
});
const events = ref([])
await ndk.connect().then(async() => {
  // Read all events with kind 1.
  ndk.fetchEvents({kinds: [1], limit: 50}).then(result => {
    events.value = result
  })
})
</script>

<template>
  <div>
    <h1>Feed with last 50 events</h1>
    <ul>
      <li v-for="(event) in events">
        <NuxtLink :to="`/event/${event.id}`">{{ event.id }}</NuxtLink> - {{ event.created_at }} - kind: {{ event.kind }} - {{ event.content }}
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>