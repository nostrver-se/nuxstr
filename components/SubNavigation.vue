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
  <div class="pb-4">
    <NuxtLink href="#" @click="goBack()" v-show="routeName !== 'index'" class="bg-purple-100 p-2 mr-2">&lt;</NuxtLink> {{ routeName }}
  </div>
</template>

<style scoped>

</style>