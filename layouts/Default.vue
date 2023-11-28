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
    <main class="sm:flex sm:flex-row sm:space-x-2">
      <section class="w-11/12 sm:w-4/5 mt-[68px] sm:basis-4/5 sm:mt-0 pr-2">
        <SubNavigation />
        <slot />
      </section>
      <Navigation class="w-1/12 sm:basis-1/5 mt-[56px] sm:mt-0" />
    </main>
    <Footer />
  </div>
</template>