<script setup>

</script>

<template>
  <div class="container">
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