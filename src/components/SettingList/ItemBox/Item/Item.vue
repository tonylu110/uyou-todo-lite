<script setup lang="ts">
import Switch from '../../Switch';

withDefaults(defineProps<{
  switchState?: boolean
  title: string
  showSwitch?: boolean
  showArrow?: boolean
  itemImg?: string
}>(), {
  switchState: true,
  title: 'title',
  showSwitch: false,
  showArrow: true
})

const emits = defineEmits<{
  (e: 'switchFun'): void,
  (e: 'itemFun'): void
}>()
</script>

<template>
  <div 
    relative w="[calc(100%-50)]" min-h-30px h-30px
    p="y-10px x-15px" rounded-7px shadow-item
    :bg="`white ${showSwitch ? '' : 'active:primary-d'}` " :cursor="showSwitch ? 'auto' : 'pointer'"
    mb-10px :c="showSwitch ? 'black' : '#333 active:white'"
    flex items-center justify-between
    class="item"
    @click="emits('itemFun')"
  >
    <div flex items-center>
      <img
        w-25px h-25px
        m="r-22.5px l-[-2.5px]"
        v-if="itemImg" 
        :src="itemImg" 
        alt=""
      />
      <span
        w="[calc(100vw-115px)]" whitespace-nowrap
        overflow-hidden text-ellipsis
      >
        {{ title }}
      </span>
    </div>
    <Switch
      v-if="showSwitch"
      :swich-state="switchState"
      @switch="emits('switchFun')"
    />
    <div i-mdi:chevron-right text-24px absolute right-15px v-if="showArrow && !showSwitch"></div>
  </div>
</template>