<script setup>

const route = useRoute()
const router = useRouter()

let routeName = ref('index')

// Watcher for route changes.
watch(
  () => route.name,
  (newRouteName) => {
    routeName.value = newRouteName
  }
)

function goBack() {
  router.back()
}

</script>
<template>
  <div class="mb-2">
    <NuxtLink href="#" @click="goBack()" v-show="routeName !== 'index'" class="h-8 bg-purple-100 px-1 py-2 mr-1">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </NuxtLink>
    <span class="inline-block align-middle">
      {{ routeName }}
    </span>
  </div>
</template>

<style scoped>

</style>