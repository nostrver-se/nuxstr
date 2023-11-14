<script setup>
  let props = defineProps({
    id: Number,
    event: {}
  })

</script>

<template>
  <div class="bg-purple-100 break-all">
    {{ event }}
  </div>
</template>

<style scoped>

</style>