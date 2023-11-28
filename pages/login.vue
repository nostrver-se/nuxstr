<script setup>
  import { useNdkStore } from '~/stores/Ndk'
  import { NDKNip07Signer } from "@nostr-dev-kit/ndk";

  const NdkStore = useNdkStore()
  const nip07signer = new NDKNip07Signer();

  // @todo
  NdkStore.initNdk(nip07signer).then(async() => {
    console.log('ndk init with signer')
    nip07signer.user().then(async (user) => {
      console.log(user.npub)
    })
  })

</script>
<template>
  <div>
    @todo - login with extension or nsecBunker

    <button v-if="!NdkStore.ndk.signer">Login with extension (NIP-07)</button>
    <button v-else>Logout</button>
  </div>
</template>

<style scoped>

</style>