<script setup>
import { ref } from "vue";
// Import the package
import NDK from "@nostr-dev-kit/ndk";
// Create a new NDK instance with explicit relays
const ndk = new NDK({
  explicitRelayUrls: ["wss://nostr.sebastix.dev", "wss://relay.damus.io"],
  outboxRelayUrls: ["wss://purplepag.es"],
  enableOutboxModel: true,
});
const events = ref([])
await ndk.connect().then(async() => {
  // Read all events with kind 1.
  ndk.fetchEvents({kinds: [1]}).then(result => {
    events.value = result
  })
})
</script>

<template>
  <div>
    <ul>
      <li v-for="(event) in events">
        {{ event.id }} - {{ event.created_at }} - {{ event.content }}
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>