<script setup>
import { useNdkStore } from '~/stores/Ndk'
import Kind0 from "~/components/kinds/Kind0.vue"
import Kind1 from "~/components/kinds/Kind1.vue"
import Kind30023 from "~/components/kinds/Kind30023.vue"
import Kind37515 from "~/components/kinds/Kind37515.vue"

const NdkStore = useNdkStore()

const route = useRoute()
const event_raw = ref()
let event = ref()

/**
 * Used for loading a dynamic component for rendering different kinds.
 * https://vuejs.org/guide/essentials/component-basics.html#dynamic-components
 *
 * @type {{Kind1: DefineComponent<{}, {}, any>}}
 */
const Kinds = {
  Kind0, // Metadata of a profile
  Kind1, // Note
  Kind30023, // Long-form content
  Kind37515, // Place
}

NdkStore.initNdk().then(async() => {
  await NdkStore.ndk.connect()
  // @todo
  // Get the current layout transition status
  // When the transition is ready, render the event
  await fetchEvent(route.params.id)
})

async function fetchEvent(event_id){
  NdkStore.ndk.fetchEvent(event_id).then(result => {
    event = result.rawEvent()
    event_raw.value = result.rawEvent()
  })
}

</script>

<template>
  <div>
    <div class="eventComponent" v-if="event">
      Rendered component:
      <br />
      <component :is="Kinds[`Kind`+event.kind]" :event="event" />
    </div>
    <hr />
    Raw event value:
    <pre class="bg-gray-800 text-white text-xs overflow-x-scroll">
      <code class="">
        {{ event_raw }}
      </code>
    </pre>
  </div>
</template>

<style scoped>

</style>