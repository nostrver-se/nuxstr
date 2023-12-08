<script setup>
  import {useNdkStore} from '~/stores/Ndk'
  import {NDKNip07Signer} from "@nostr-dev-kit/ndk";

  const NdkStore = useNdkStore()
  const nip07signer = new NDKNip07Signer()

  const zapSebastix = async () => {
    NdkStore.setSigner(nip07signer)
    await NdkStore.initNdk()
    await NdkStore.ndk.connect()
    const user = await nip07signer.user()
    const sebastixUser = NdkStore.ndk.getUser({
      npub: 'npub1qe3e5wrvnsgpggtkytxteaqfprz0rgxr8c3l34kk3a9t7e2l3acslezefe'
    })
    // Fetch the newest event kind 0 from user with an event, so we can zap this.
    const filter = {
      kinds: [0],
      //authors: [sebastixUser.hexpubkey]
    }
    const eventProfile = await NdkStore.ndk.fetchEvent(filter)
    const zapResponse = await eventProfile.zap(2121, 'A zap from Nuxstr!')
    console.log(zapResponse)
  }

</script>

<template>
  <div>
    <button @click="zapSebastix">Zap @sebastix</button>
  </div>
</template>

<style scoped>
  button {
    @apply block text-purple-500 mx-auto mt-6 p-6 bg-purple-100 hover:bg-purple-200 w-full md:max-w-sm;
  }
</style>