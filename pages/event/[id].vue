<script setup>
import { useNdkStore } from '~/stores/Ndk'
import Kind1 from "~/components/kinds/Kind1.vue";

const NdkStore = useNdkStore()

const route = useRoute()
const event_raw = ref()
let event = ref()
const Kinds = {
  Kind1
}

NdkStore.initNdk().then(async() => {
  await NdkStore.ndk.connect()
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