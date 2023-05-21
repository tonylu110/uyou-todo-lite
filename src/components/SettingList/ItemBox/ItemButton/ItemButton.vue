<template>
  <div 
    :class="`item-button ${mode} ${bottom ? 'bottom-0 !fixed !w-[calc(100%-50px)]' : ''}`" 
    @click="emits('click')"
  >
    <slot>button</slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  mode?: string,
  fixed?: boolean,
  bottom?: boolean
}>()

const emits = defineEmits<{
  (e: 'click') :void
}>()
</script>

<style scoped>
.item-button {
  --uno: relative w-[calc(100%-30px)] h-30px min-h-30px p-x-15px p-y-10px rounded-7px shadow-item bg-white cursor-pointer mb-10px flex items-center justify-center c-#333 font-bold;
}
.item-button:active {
  --uno: bg-#5985eb c-white;
}
.item-button.primary {
  --uno: bg-#5985eb c-white;
}
.item-button.primary:active {
  --uno: bg-#4e6fbb;
}
.item-button.error {
  --uno: bg-#e5544b c-white;
}
.item-button.error:active {
  --uno: bg-#c95047;
}
.item-button:deep(img) {
  --uno: max-h-50px;
}
</style>