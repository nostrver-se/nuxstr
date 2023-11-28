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
    <main class="flex flow-row space-x-2">
      <section class="w-11/12 sm:w-3/4 sm:basis-3/4 mt-[56px] sm:mt-0">
        <SubNavigation />
        <slot />
      </section>
      <Navigation class="sm:basis-1/4 mt-[56px] sm:mt-0" />
    </main>
    <Footer />
  </div>
</template>