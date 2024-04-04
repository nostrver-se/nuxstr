<script setup>
  import { useNdkStore } from '~/stores/Ndk'
  import { NDKNip07Signer } from "@nostr-dev-kit/ndk";

  const NdkStore = useNdkStore()
  const nip07signer = new NDKNip07Signer()

  const zapSebastix = async () => {
    try {
      await NdkStore.initNdk()
      NdkStore.ndk.signer = nip07signer
      await NdkStore.ndk.connect()
      await nip07signer.user()
      const sebastixUser = NdkStore.ndk.getUser({
        npub: 'npub1qe3e5wrvnsgpggtkytxteaqfprz0rgxr8c3l34kk3a9t7e2l3acslezefe'
      })
      const zapResponse = await sebastixUser.zap(21, 'A zap from Nuxstr!')
      console.log(zapResponse)
    } catch (e) {
      console.log(e)
      alert(e)
    }

  }

</script>

<template>
  <div>
    <button @click="zapSebastix">Zap 21 sats to @sebastix</button>
  </div>
</template>

<style scoped>
  button {
    @apply block text-purple-500 mx-auto mt-6 p-6 bg-purple-100 hover:bg-purple-200 w-full md:max-w-sm;
  }
</style>