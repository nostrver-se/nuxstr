<script setup>
import NDK from "@nostr-dev-kit/ndk";

const route = useRoute()
let event_id = route.params.id

// Init NDK instance
const ndk = new NDK({
  explicitRelayUrls: ["wss://nostr.sebastix.dev", "wss://relay.damus.io"],
  outboxRelayUrls: ["wss://purplepag.es"],
  enableOutboxModel: true,
});
const event = ref([])
await ndk.connect().then(async() => {
  // Fetch event
  ndk.fetchEvent(event_id).then(result => {
    event.value = result.rawEvent()
  })
})

</script>

<template>
  <div>
    Event: {{ route.params.id }}
    <hr />
    <code>
      {{ event }}
    </code>
  </div>
</template>

<style scoped>

</style>