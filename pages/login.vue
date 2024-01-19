<script setup>
  import {useNdkStore} from '~/stores/Ndk'
  import {NDKNip07Signer, NDKNip46Signer} from "@nostr-dev-kit/ndk";
  import {useUserStore} from "../stores/User.js";

  const NdkStore = useNdkStore()
  const nip07signer = new NDKNip07Signer()
  const UserStore = useUserStore()
  const modalRef = ref(null)

  const loginExtension = async () => {
    try {
      await NdkStore.initNdk()
      NdkStore.ndk.client = nip07signer
      await NdkStore.ndk.connect()
      const user = await nip07signer.user()
      UserStore.login(user)

      // Fetch profile of user with https://ndk.fyi/docs/classes/NDKUser.html#fetchProfile
      const u = NdkStore.ndk.getUser({
        npub: UserStore.npub
      })
      await u.fetchProfile()
      UserStore.name = u.profile.name
      console.log(u.profile)
      // Other way:
      const profile = await fetchProfileKind0(u)
      console.log(profile)
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

  const fetchProfileKind0 = async (user) => {
    // @todo
    // Fetch the newest event kind 0 from user with an event.
    try {
      const filter = {
        kinds: [0],
        authors: [user.hexpubkey]
      }
      return await NdkStore.ndk.fetchEvent(filter)
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
      </p>
      <button @click="UserStore.logout(NdkStore.ndk)">
        Logout
      </button>
    </div>
    <div v-else>
      <button @click="loginExtension">
        Login with extension (NIP-07)
      </button>
      <button @click="loginNostrConnect">
        Login with Nostr Connect (NIP-46)
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