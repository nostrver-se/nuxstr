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

  const getContent = () => {

  }

  const getGeometry = () => {
    // coordinates
    // type
  }

  const getProperties = () => {

  }

  const getType = () => {

  }

  const getName = () => {

  }

  const getDescription = () => {

  }

  const getAddress = () => {

  }

  const getWebsite = () => {

  }

  const getPhoneNumber = () => {

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
      <a :href="`https://go.yondar.me/place/${ place.encode() }`" target="_blank">View place with Yondar</a>
      <br />
      Content: {{ place.content }}
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