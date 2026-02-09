<script setup>
  import { ref } from "vue"
  import { useNdkStore } from '~/stores/Ndk'
  import { NDKArticle } from "@nostr-dev-kit/ndk";

  const NdkStore = useNdkStore()

  const NDKArticles = ref([])

  /**
   * Fetch Nostr articles
   *
   * @returns {Promise<void>}
   */
  const fetchArticles = async () => {
    const filters = {kinds: [30023], limit: 50}
    await NdkStore.ndk.subscribe(
      filters,
      {
        closeOnEose: true,
      },
      {
        onEvent: (event) => {
          const article = new NDKArticle(NdkStore.ndk, event)
          NDKArticles.value.push(article)
        },
      }
    )
  }

  onMounted(async() => {
    // Init a clean NDK here without a connected npub
    NdkStore.setExplicitRelays([
        'wss://relay.damus.io',
        'wss://nos.lol',
        'wss://relay.primal.net',
        'wss://nostr-01.yakihonne.com',
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
    <code>{{ NdkStore.explicitRelayUrls }}</code>
    <ul v-if="NDKArticles.length">
      <li v-for="(article) in NDKArticles" class="break-all p-2 mb-2 border-b border-b-purple-100">
        <NuxtLink :to="`/event/${article.id}`">{{ article.title }} published at {{ article.published_at }}</NuxtLink>
      </li>
    </ul>
    <div class="text-center text-2xl py-8" v-else>
      Loading long-form content...
    </div>
    <br />
    Requested from from the following relays:
    <u>
      <li>wss://relay.damus.io</li>
      <li>wss://nos.lol</li>
      <li>wss://nostr-01.yakihonne.com</li>
    </u>
  </div>
</template>

<style scoped>

</style>