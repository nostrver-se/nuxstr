<script setup>
import { useNdkStore } from '~/stores/Ndk'

const NdkStore = useNdkStore()

const route = useRoute()
let event_id = route.params.id
const event_raw = ref()
const event = ref()
await NdkStore.initNdk().then(async() => {
  NdkStore.ndk.connect().then(() => {
    fetchEvent()
  }).finally(() => {
    console.log('event fetch within the init ready function')
  })
})

function fetchEvent(){
  NdkStore.ndk.fetchEvent(event_id).then(result => {
    event_raw.value = result.rawEvent()
    console.log(event)
  })
}

</script>

<template>
  <div>
    @todo - render content of this event with different kind components
    <hr />
    Event id: <code>{{ event_id }}</code>
    <br />
    Kind:
    <br />
    Content:
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