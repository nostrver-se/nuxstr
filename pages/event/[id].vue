<script setup>
import { useNdkStore } from '~/stores/Ndk'

const NdkStore = useNdkStore()

const route = useRoute()
let event_id = route.params.id

const event = ref()
await NdkStore.initNdk().then(async() => {
  NdkStore.ndk.connect().then(() => {
    fetchEvent()
  }).finally(() => {
    console.log('event fetch within the init ready function')
  })
})

async function fetchEvent(){
  NdkStore.ndk.fetchEvent(event_id).then(result => {
    event.value = result.rawEvent()
  })
}

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