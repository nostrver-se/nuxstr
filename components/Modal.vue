<script setup>
  const dialog = ref(document.getElementById('dialog'))
  const open = ref(true)
  const props = defineProps({
    // @todo
  })
  const emit = defineEmits(['show', 'close']);

  const show = () => {
    open.value = true
    dialog.value.showModal()
  }

  const close = () => {
    dialog.value.close()
    open.value = false
  }

</script>
<template>
  <dialog ref="dialog">
    <div class="mx-auto bg-white p-6 shadow-xl">
      <div class="content">
        Dynamic modal content {{ open }}
      </div>
      <form method="dialog" class="actions text-right">
        <button @click="close">Close</button>
      </form>
    </div>
  </dialog>
</template>
<style scoped>
  dialog {
    @apply fixed top-0 bottom-0 left-0 right-0 w-screen h-screen bg-neutral-950 bg-opacity-50 backdrop-blur-sm z-50;

    &[open] {
      @apply grid content-center;
    }

    button {
      @apply bg-purple-100 p-2;
    }
  }
</style>