<template>
  <div :class="'item-button ' + mode">
    <slot>button</slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  mode: string
}>()
</script>

<style scoped>
.item-button {
  position: relative;
  width: calc(100% - 30px);
  height: 30px;
  min-height: 30px;
  padding: 10px 15px;
  border-radius: 7px;
  box-shadow: 0 2px 10px #00000030;
  background-color: white;
  cursor: pointer;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-weight: bold;
}
.item-button:active {
  background-color: #5985eb;
  color: white;
}
.item-button.primary {
  background-color: #5985eb;
  color: white;
}
.item-button.primary:active {
  background-color: #4e6fbb;
}
.item-button.error {
  background-color: #e5544b;
  color: white;
}
.item-button.error:active {
  background-color: #c95047;
}
.item-button:deep(.lang-img) {
  max-height: 50px;
}
</style>