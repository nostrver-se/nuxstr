<template>
  <div>
    Places - request locations (event kind 37515 from yondar.nostr1.com)
    <br />
    Display a list with places and with a Check-in button.
  </div>
</template>

<script setup>

  onMounted(() => {
    console.log('mounted')
    const allowedKinds = [30023, 37515, 13811];
    if (allowedKinds.indexOf(50)) console.log('we only accept kind 30023, 37515 or 13811 events')
  })

</script>

<style scoped>

</style>