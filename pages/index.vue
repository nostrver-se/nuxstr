<script setup>

</script>

<template>
  <div>
    <h1>Hello there!</h1>
    <div>
      <p>
        This is a playground built with <a href="https://nuxtjs.org/" target="_blank">Nuxt & Vue</a> where I'm tinkering around with Nostr stuff with Javascript and using the <a href="https://ndk.fyi/" target="_blank">NDK</a> library.
      </p>
      <p class="mt-4">
        In this demo you can:
      </p>
      <ul class="list-disc pl-8">
        <li><NuxtLink to="/login">Connect your Nostr ID</NuxtLink></li>
        <li><NuxtLink to="/notes">View notes</NuxtLink></li>
        <li><NuxtLink to="/long-form-content">View content</NuxtLink></li>
        <li><NuxtLink to="/places">View places</NuxtLink></li>
        <li><NuxtLink to="/blossom">Manage Blossom files</NuxtLink></li>
        <li><NuxtLink to="/zap-example">Send a zap</NuxtLink></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  h1 {
    @apply text-3xl font-bold
  }
</style>