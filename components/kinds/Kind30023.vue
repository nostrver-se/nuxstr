<script setup>
  import { useNdkStore } from '~/stores/Ndk'
  import { NDKArticle } from "@nostr-dev-kit/ndk"
  import { marked } from "marked"

  const NdkStore = useNdkStore()

  /**
   * Components properties.
   *
   * @type {Prettify<Readonly<ExtractPropTypes<{id: NumberConstructor, event: {}}>>>}
   */
  let props = defineProps({
    id: Number,
    event: {}
  })

  const article = ref()

  onMounted(async () => {
    article.value = new NDKArticle(NdkStore.ndk, props.event)
  })

</script>

<template>
  <div>
    <div v-if="article" class="p-4 bg-white max-w-[600px]">
      <h1>{{ article.title }}</h1>
      <ul>
        <li>Published at: {{ article.published_at }}</li>
        <li>Author: {{ article.author.pubkey }}</li>
      </ul>
      <div class="" v-html="marked.parse(article.content)">
      </div>
    </div>
    <div v-else>
      Loading article...
    </div>
  </div>
</template>

<style scoped>
  h1 {
    @apply text-3xl font-bold
  }
</style>