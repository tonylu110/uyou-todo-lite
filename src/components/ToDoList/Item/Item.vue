<script setup lang="ts">
import { ref, watchEffect, Ref } from 'vue'
import { createToast } from '../../Toast'
import getTime from "../../../utils/getTime"

const props = withDefaults(defineProps<{
  time: number
  text: string
  isOk: boolean
}>(), {
  time: 114514,
  text: 'msg',
  isOk: false
})

const emits = defineEmits<{
  (e: 'setOk', id: number, okState: boolean): void
  (e: 'del', id: number): void
}>()

const okState = ref(false)

watchEffect(() => {
  okState.value = props.isOk
})

const setOk = () => {
  okState.value = !okState.value
  emits('setOk', props.time, okState.value)
}
const deleteItem = () => {
  emits('del', props.time)
}

const itemDom = ref(null) as unknown as Ref<Element>
const menu = () => {
  navigator.clipboard.writeText(props.text).then(() => {
    createToast(itemDom.value, {
      msg: 'copy success',
      center: true
    })
  })
}
</script>

<template>
  <div relative mb-10px w="[calc(100vw-40px)]">
    <div 
      w-40px h-40px bg="#00b600 active:#00a600" left="[-3px]"
      absolute top="50%" translate="y-[-50%]"
      ml-4px rounded-24 cursor-pointer
      flex justify-center items-center
      shadow="sm black/30" border="3px solid white"
      class="ok"
      @click="setOk"
    >
      <div i-mdi:check-bold text-24px c-white></div>
    </div>
    <div 
      w-40px h-40px bg="#d6010f active:#b6000b" right="[-20px]"
      absolute top="50%" translate="y-[-50%]"
      ml-4px rounded-24 cursor-pointer
      flex justify-center items-center
      shadow="sm black/30" border="3px solid white"
      class="del"
      @click="deleteItem"
    >
      <div i-mdi:close-thick text-24px c-white></div>
    </div>
    <div 
      relative w="[calc(100vw-40px)]" bg="#f6f2e9"
      h-auto p-10px rounded-5px shadow="sm black/30"
      transition="transform !300 ease-in-out" pointer-events-none
      class="item"
      ref="itemDom"
    >
      <div 
        bg="#ede4d8" m="l-[-10px] t-[-10px]" p="y-5px x-10px"
        w="100%" rounded="tl-7px tr-7px" 
        flex justify-between items-center
      >
        <span c="#cebfae">{{ getTime(time) }}</span>
        <div 
          h-10px p-5px m="r-[-3px]" bg="black/7 active:black/14"
          flex justify-center items-center
          rounded-3px c="#6e492f" select-none
          cursor-pointer pointer-events-auto
          opacity-0 hover:opacity-100 transition="opacity 300 ease-in-out"
          @click="menu"
        >
          <div i-ph:copy-bold text-14px></div>
        </div>
      </div>
      <span 
        block mt-10px 
        select-text pointer-events-auto
        transition-300 bg="selection:#dcc6a9"
        overflow-hidden text-ellipsis
        :c="okState ? '#cebfae' : '#6e492f'"
        :line="okState ? 'through' : ''"
      >
        {{ text }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.ok:hover ~ .item {
  transform: translateX(60px);
}
.del:hover ~ .item {
  transform: translateX(-60px);
}
</style>