<script setup>

</script>

<template>
  <div>
    <h1>Hello there!</h1>
    <div>
      <p>In this demo you can:</p>
      <ul>
        <li><NuxtLink to="/login">Login</NuxtLink></li>
        <li><NuxtLink to="/notes">View notes</NuxtLink></li>
        <li><NuxtLink to="/long-form-content">View content</NuxtLink></li>
        <li><NuxtLink to="/places">View places</NuxtLink></li>
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