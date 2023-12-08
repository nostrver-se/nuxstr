<script setup>
const { $pwa } = useNuxtApp()
</script>

<template>
  <div class="container">
    <div v-show="$pwa.needRefresh">
      <span>
        The app has been updated, click on reload button to refresh.
      </span>
      <button @click="$pwa.updateServiceWorker()">Reload</button>
    </div>
    <Header />
    <main class="flex flex-row">
      <section class="flex-1 mt-[68px] sm:mt-0 pr-10 sm:pr-0">
        <SubNavigation />
        <slot />
      </section>
      <Navigation class="flex-none w-10 sm:w-72 mt-[56px] sm:mt-0" />
    </main>
    <Footer />
  </div>
</template>