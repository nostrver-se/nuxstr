<script setup>
  import { useUserStore } from "~/stores/User";

  const route = useRoute()
  const UserStore = useUserStore()
  const place = ref()

  onMounted(async () => {
    place.value = route.params.place
  })

  const doCheckin = () => {
    console.log('@todo - create 13811 event here')
  }
</script>

<template>
  <div>
    <h1>{{ place }}</h1>
    <button id="btnCheckin" @click="doCheckin" class="p-2 bg-purple-100 text-purple-500" v-if="UserStore.signedIn">Click here</button>
    <NuxtLink to="/login" v-else>Connect first</NuxtLink>
    to check-in at <NuxtLink :to="`/places/${place}`">{{ place }}</NuxtLink>
    <div>
      <h3>Current check-ins</h3>
      @todo ...
    </div>
    <div>
      <h3>Check-in history</h3>
      @todo ...
    </div>
  </div>
</template>

<style lang="scss">

</style>