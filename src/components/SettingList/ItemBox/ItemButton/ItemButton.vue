<script setup lang="ts">
defineProps<{
  mode?: string
  fixed?: boolean
  bottom?: boolean
}>()

const emits = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <div
    :class="`item-button ${mode} ${bottom ? 'bottom-0 !fixed !w-[calc(100%-50px)]' : ''}`"
    @click="emits('click')"
  >
    <slot>button</slot>
  </div>
</template>

<style scoped>
.item-button {
  --uno: relative w-[calc(100%-30px)] h-30px min-h-30px p-x-15px p-y-10px rounded-7px border-1px border-solid border-black/20 bg-white dark:bg-#333/70 cursor-pointer mb-10px flex items-center justify-center c-#333 font-bold;
}
.item-button:active {
  --uno: bg-#5985eb c-white border-none;
}
.item-button.primary {
  --uno: bg-#5985eb c-white border-none;
}
.item-button.primary:active {
  --uno: bg-#4e6fbb border-none;
}
.item-button.error {
  --uno: bg-#e5544b c-white border-none;
}
.item-button.error:active {
  --uno: bg-#c95047 border-none;
}
.item-button:deep(img) {
  --uno: max-h-50px;
}
</style>
