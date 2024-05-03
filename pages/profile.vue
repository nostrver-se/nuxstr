<script setup>
  import { useNdkStore } from '~/stores/Ndk'
  import { useUserStore } from '~/stores/User'

  const NdkStore = useNdkStore()
  const UserStore = useUserStore()

  onMounted(async () => {
    if (!UserStore.signedIn) {

    }
  })

</script>

<template>
  <div>
    <div v-if="UserStore.signedIn" class="">
      <div class="mt-4">
        <h3>Your metadata</h3>
      </div>
      <dl class="divide-y divide-gray-100">
        <div class="mt-4 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Name</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            {{ UserStore.name }}
          </dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Pubkey</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <code>{{ UserStore.pubkey }}</code>
          </dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">npub</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <code>{{ UserStore.npub }}</code>
          </dd>
        </div>
      </dl>
      <div class="mt-4">
        <h3>Your relays</h3>
      </div>
      <dl class="divide-y divide-gray-100">
        <div class="mt-4 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">current connected relays</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <span class="block" v-for="(relay) in NdkStore.explicitRelayUrls">{{ relay }}</span>
          </dd>
        </div>
        <div class="mt-4 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">defined by default from this client</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <span class="block" v-for="(relay) in NdkStore.getDefaultExplicitRelays">{{ relay }}</span>
          </dd>
        </div>
        <div class="mt-4 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">from .well-known/nostr.json (NIP-05)</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            ...
          </dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">from event kind 10002 (NIP-65)</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            ...
          </dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">from event kind 3 (NIP-02)</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            ...
          </dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Outbox model modus</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {{ NdkStore.enableOutboxModel }}
          </dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0" v-if="NdkStore.enableOutboxModel">
          <dt class="text-sm font-medium leading-6 text-gray-900">Connected relays with outbox model</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <span class="block" v-for="(relay) in NdkStore.getDefaultOutboxRelays">{{ relay }}</span>
          </dd>
        </div>
      </dl>
      <div class="mt-4">
        <button @click="UserStore.logout(NdkStore.ndk)" class="block text-purple-500 mt-6 p-2 mx-auto bg-purple-100 hover:bg-purple-200">
          Click here to logout
        </button>
      </div>
    </div>
    <div v-else>
      <NuxtLink to="/login" class="block text-purple-500 mt-6 p-2 mx-auto bg-purple-100 hover:bg-purple-200">
        You need to login first
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
  h3 {
    @apply text-xl font-bold
  }
</style>