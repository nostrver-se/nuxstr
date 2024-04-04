<script setup>
  import { useNdkStore } from '~/stores/Ndk'
  import { NDKEvent } from "@nostr-dev-kit/ndk";
  // @todo Create NDKPlace class...

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

  const place = ref()

  const getName = () => {

  }

  const getGeoLocation = () => {

  }

  const getCheckIns = () => {

  }

  onMounted(async () => {
    place.value = new NDKEvent(NdkStore.ndk, props.event)
  })
</script>

<template>
  <div>
    <div v-if="place">
      <h1>...</h1>
      Created at: {{ place.created_at }}
      <br />
      {{ place.content }}
    </div>
    <div v-else>
      Loading place...
    </div>
  </div>
</template>

<style scoped>
  h1 {
    @apply text-3xl font-bold
  }
</style>