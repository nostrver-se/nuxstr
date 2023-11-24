<script setup>
  useHead({
    meta: [
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
    ]
  })
</script>
<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.25s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>