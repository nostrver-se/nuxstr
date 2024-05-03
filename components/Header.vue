<script setup>
  import { useNdkStore } from "../stores/Ndk.js"
  import { useUserStore } from "../stores/User.js"
  import { NDKNip07Signer } from "@nostr-dev-kit/ndk";

  const NdkStore = useNdkStore()
  const UserStore = useUserStore()
  const nip07signer = new NDKNip07Signer()

  onMounted(async () => {
    try {
      if (!UserStore.signedIn) {
        await NdkStore.initNdk()
        // NdkStore.ndk.signer = nip07signer
        // await NdkStore.ndk.connect()
        // const user = await nip07signer.user()
        // UserStore.login(user, NdkStore.ndk)
      }
    } catch (e) {
      console.log(e)
    }
  })

</script>
<template>
  <header class="fixed top-0 sm:static w-full sm:w-auto flex bg-purple-950/80 backdrop-blur-sm px-2">
    <div class="flex-none py-4">
      <NuxtLink to="/" class="font-bold text-purple-300">Nuxt + Nostr = Nuxstr</NuxtLink>
    </div>
    <div class="grow py-4">

    </div>
    <div class="flex-none py-4">
      <NuxtLink to="/profile" class="text-purple-300" v-if="UserStore.signedIn">
        <span v-if="UserStore.name" class="mx-2">{{ UserStore.name }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </NuxtLink>
      <NuxtLink to="/login" class="text-purple-300" v-else>
        <span class="mx-2">connect</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </NuxtLink>
    </div>
  </header>
</template>

<style scoped>
  header {
    padding-top: env(safe-area-inset-top,0);
  }
</style>