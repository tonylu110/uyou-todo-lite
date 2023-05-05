<script setup lang="ts">
import { ref } from 'vue';
import TitleBar from './components/TitleBar'
import emitter from './utils/emitter';

const bgColor = ref('')

emitter.on('bgColor', (data) => {
  bgColor.value = (data as unknown as string)
})
</script>

<template>
  <div :class="bgColor" h-screen w-screen>
    <title-bar></title-bar>
    <router-view></router-view>
  </div>
</template>
