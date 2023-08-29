<script setup lang="ts">
import type { Ref } from 'vue'
import {ref, watch, watchEffect} from 'vue'
import { useI18n } from 'vue-i18n'
import { createToast } from '../../Toast'
import getTime from '../../../utils/getTime'
import CheckBox from './CheckBox/CheckBox.vue'

const props = withDefaults(defineProps<{
  time: number
  text: string
  isOk: boolean
}>(), {
  time: 114514,
  text: 'msg',
  isOk: false,
})

const emits = defineEmits<{
  (e: 'setOk', id: number, okState: boolean): void
  (e: 'del', id: number): void
}>()

const { t } = useI18n()

const okState = ref(false)

watchEffect(() => {
  okState.value = props.isOk
})

function setOk(ok: boolean) {
  emits('setOk', props.time, ok)
}
function deleteItem() {
  emits('del', props.time)
}

const itemDom = ref(null) as unknown as Ref<Element>
function menu() {
  navigator.clipboard.writeText(props.text).then(() => {
    createToast({
      msg: t('copyToast'),
      center: true,
    }, itemDom.value)
  })
}

watch(okState, (newValue) => setOk(newValue))
</script>

<template>
  <div relative mb-10px w="[calc(100vw-40px)]">
<!--    <div-->
<!--      w-40px h-40px bg="#00b600 active:#00a600" left="[-3px]"-->
<!--      absolute top="50%" translate="y-[-50%]" transition="transform !300 ease-in-out"-->
<!--      ml-4px rounded-24 cursor-pointer hover:opacity-100-->
<!--      flex justify-center items-center opacity-0-->
<!--      shadow="sm black/30" border="3px solid white"-->
<!--      class="ok"-->
<!--      @click="setOk"-->
<!--    >-->
<!--      <div i-mdi:check-bold text-24px c-white />-->
<!--    </div>-->
    <div
      w-40px h-40px bg="#d6010f active:#b6000b" right="[-20px]"
      absolute top="50%" translate="y-[-50%]" transition="transform !300 ease-in-out"
      ml-4px rounded-24 cursor-pointer hover:opacity-100
      flex justify-center items-center opacity-0
      shadow="sm black/30" border="3px solid white"
      class="del"
      @click="deleteItem"
    >
      <div i-mdi:close-thick text-24px c-white />
    </div>
    <div
      ref="itemDom" relative w="[calc(100vw-40px)]"
      bg="white/50 dark:#333/50" h-auto p-10px rounded-5px
      shadow="sm black/30" transition="transform !300 ease-in-out"
      pointer-events-none flex items-center
      class="item"
    >
      <CheckBox v-model="okState" :num="time"/>
      <div flex="~ col-reverse">
        <div
            m="l--10px b--10px t-7px" p="y-5px x-10px"
            w="100%" rounded="bl-7px br-7px"
            flex justify-between items-center
        >
          <span c="#555/50 dark:#bbb/50" text-12px>{{ getTime(time) }}</span>
        </div>
        <span
            block select-text pointer-events-auto
            transition-300 bg="selection:black/10"
            whitespace-pre-wrap break-words
            :c="okState ? '#555/30 dark:#bbb/30' : '#555 dark:#bbb'"
            :line="okState ? 'through' : ''"
        >
        {{ text }}
      </span>
        <div
            h-10px p-5px m="r-[-3px]" bg="#bbb dark:#333"
            flex justify-center items-center absolute right-10px top-8px
            rounded-3px select-none
            opacity-0 hover:opacity-100 cursor-pointer pointer-events-auto
            transition="opacity 300 ease-in-out"
            @click="menu"
        >
          <div i-ph:copy-bold text-14px c="#555 dark:#bbb" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ok:hover ~ .item {
  --uno: translate-x-60px;
}
.del:hover ~ .item {
  --uno: translate-x--60px;
}
</style>
