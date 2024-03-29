<script setup>

  import { ref } from "vue"
  import { useNdkStore } from '~/stores/Ndk'

  const NdkStore = useNdkStore()

  const articles = ref()
  const fetchArticles = async () => {
    const filter = {kinds: [30023], limit: 50}
    articles.value = await NdkStore.ndk.fetchEvents(filter)
  }

  onMounted(async() => {
    // Init a clean NDK here without a connected npub
    NdkStore.setExplicitRelays([
        'wss://relay.damos.io',
        'wss://nos.lol',
        'wss://relay.plebstr.com',
        'wss://relay.nostr.band',
        'wss://nostr-01.yakihonne.com',
        'wss://nostr-02.yakihonne.com',
        'wss://nostr-02.dorafactory.org'
    ])
    NdkStore.setOutboxModel(false)
    await NdkStore.initNdk()
    await NdkStore.ndk.connect()
    await fetchArticles()
  })

</script>

<template>
  <div>
    Content - request long-form content (event kind 30023) without any authentication.
    <br />
    Requested from from the following relays:
    <u>
      <li>wss://relay.damos.io</li>
      <li>wss://nos.lol</li>
      <li>wss://relay.plebstr.com</li>
      <li>wss://relay.nostr.band</li>
      <li>wss://nostr-01.yakihonne.com</li>
      <li>wss://nostr-02.yakihonne.com</li>
      <li>wss://nostr-02.dorafactory.org</li>
    </u>
    <ul v-if="articles">
      <li v-for="(article) in articles" class="break-all p-2 mb-2 border-b border-b-purple-100">
        <NuxtLink :to="`/event/${article.id}`">{{ article.id }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>