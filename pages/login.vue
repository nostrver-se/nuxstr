<script setup>
  import { useNdkStore } from '~/stores/Ndk'
  import { NDKNip07Signer, NDKNip46Signer } from "@nostr-dev-kit/ndk"
  import { useUserStore } from "../stores/User.js"

  const NdkStore = useNdkStore()
  const nip07signer = new NDKNip07Signer()
  const UserStore = useUserStore()
  const modalRef = ref(null)

  const loginExtension = async () => {
    try {
      NdkStore.resetExplicitRelays()
      await NdkStore.initNdk()
      //NdkStore.ndk.client = nip07signer // with removing this line I can reproduce this issue: https://njump.me/nevent1qvzqqqqqqypzqpnrnguxe8qszsshvgkvhn6qjzxy7xsvx03rlrtddr62haj4lrm3qy88wumn8ghj7mn0wvhxcmmv9uq36amnwvaz7tmwdaehgu3wd46hg6tw09mkzmrvv46zucm0d5hsqg9s32gxctx2u5u4cp3yzqdnsx72lyy7j6vwcyngrfj6n2em7ns28vqpcrs8
      NdkStore.ndk.signer = nip07signer
      await NdkStore.ndk.connect()
      const user = await nip07signer.user()
      UserStore.login(user, NdkStore.ndk)
    } catch (e) {
      console.log(e)
      alert(e);
    }
  }

  const loginNostrConnect = () => {
    // @todo
    // open Modal
    try {
      console.log('open the modal')
      modalRef.value.show()
    } catch (e) {
      console.log(e)
      alert(e)
    }
  }
</script>
<template>
  <div>
    <div v-if="UserStore.signedIn">
      <p class="text-center">
        Welcome <strong>{{ UserStore.name }}</strong>
        <br />
        <code >{{ UserStore.npub }}</code>
        <br />
        <br />
        <NuxtLink to="/profile">View your profile here</NuxtLink>
      </p>
      <button @click="UserStore.logout(NdkStore.ndk)">
        Logout
      </button>
    </div>
    <div v-else>
      <button @click="loginExtension">
        Connect with extension (NIP-07)
      </button>
      <button @click="loginNostrConnect">
        Connect with Nostr Connect (NIP-46)
      </button>
    </div>
    <Modal :open="false" ref="modalRef">
      <label>
        Enter your bunker URL:
        <input type="text" name="bunker" class="bg-purple-100 w-full p-2" />
      </label>
    </Modal>
  </div>
</template>

<style scoped>
  button {
    @apply block text-purple-500 mx-auto mt-6 p-6 bg-purple-100 hover:bg-purple-200 w-full md:max-w-sm;
  }
</style>