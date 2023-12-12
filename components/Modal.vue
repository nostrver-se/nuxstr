<script setup>
  const dialog = ref(document.getElementById('dialog'))
  const open = ref(true)
  const props = defineProps({
    open: Boolean
  })
  const slots = useSlots()
  const emit = defineEmits(['show', 'close']);

  const show = () => {
    open.value = true
    dialog.value.showModal()
  }

  const close = () => {
    dialog.value.close()
    open.value = false
  }

  const submit = () => {
    // @todo
    console.log('submit')
  }

  defineExpose({
    show,
    close
  })

</script>
<template>
  <dialog ref="dialog">
    <div class="mx-auto bg-white p-6 shadow-xl">
      <form method="dialog" class="actions text-right space-x-2">
        <div class="content mb-2 text-left">
          <slot>
            Dynamic modal content
          </slot>
        </div>
        <button @click="close">Close</button>
        <button type="submit" @click="submit">Submit</button>
      </form>
    </div>
  </dialog>
</template>
<style scoped>
  dialog {
    &[open] {
      @apply grid content-center;
    }
    button {
      @apply bg-purple-100 text-purple-500 p-2;
    }
    &::backdrop {
      @apply bg-neutral-950 bg-opacity-50 backdrop-blur-sm;
    }
  }
</style>