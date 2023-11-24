<script setup>
const { $pwa } = useNuxtApp()
</script>

<template>
  <div class="container">
    <div v-show="$pwa.needRefresh">
      <span>
        New content available, click on reload button to update.
      </span>
      <button @click="$pwa.updateServiceWorker()">Reload</button>
    </div>
    <Header />
    <main class="flex flow-row space-x-4">
      <section class="w-3/4 basis-3/4">
        <SubNavigation />
        <slot />
      </section>
      <Navigation class="basis-1/4" />
    </main>
    <Footer />
  </div>
</template>