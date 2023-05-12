<template>
  <dialog :class="`alert ${dialogShow ? '' : 'hide'}`" ref="dialog">
    <div class="title" data-tauri-drag-region>
      {{ title }}
    </div>
    <div class="body" :style="{alignItems: title === t('dialog.hit') ? 'center' : ''}">
      <slot/>
    </div>
    <div class="buttons">
      <div class="cancel" v-if="cancelButtonShow" @click="emits('cancel')">{{ t('dialog.cancel') }}</div>
      <div class="return" :style="{width: cancelButtonShow ? '' : '100%'}" @click="emits('return')">{{ t('dialog.return') }}</div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import {onMounted, Ref, ref, watchEffect} from "vue"
import { useI18n } from "vue-i18n";

const { t } = useI18n()

const props = withDefaults(defineProps<{
  title?: string
  cancelButtonShow?: boolean
  dialogShow?: boolean
}>(), {
  title: 'title',
  cancelButtonShow: true,
  dialogShow: false
})

const dialog = ref(null) as unknown as Ref<HTMLDialogElement>

const emits = defineEmits<{
  (e: 'cancel'): void,
  (e: 'return'): void
}>()

onMounted(() => {
  const closeAlert = () => {
    dialog.value.close()
  }

  watchEffect(() => {
    if (props.dialogShow) {
      dialog.value.removeEventListener('animationend', closeAlert)
      dialog.value.showModal()
    } else {
      dialog.value.addEventListener('animationend', closeAlert)
    }
  })
})
</script>

<style scoped>
@import "dialogAnimation.css";

.alert {
  padding: 0;
  z-index: 10;
  background-color: white;
  width: 300px;
  border-radius: 9px;
  box-shadow: 0 5px 20px #00000050;
  border: 1px solid #999;
  overflow: hidden;
  transition: dialog;
  user-select: none;
  color: #00000090;
  outline: none;
}

.alert .title {
  border-bottom: 1.5px solid #00000015;
  padding: 12px;
  display: flex;
  background: #00000008;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
.alert .body {
  padding: 18px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  border-bottom: 1.5px solid #00000015;
  min-height: 3em;
  justify-content: center;
}
.alert .body:deep(ul) {
  margin: 0;
}
.alert .body:deep(ul) li {
  margin-left: -18px;
  user-select: text;
}
.alert .body :deep(span) {
  display: block;
  white-space: pre-wrap;
  user-select: text;
  text-align: center;
}

.alert .buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
  background: #00000010;
}
.alert .buttons div {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
}
.alert .buttons .cancel {
  border-right: 2px solid #00000010;
}
.alert .buttons .cancel:active {
  background-color: #00000010 !important;
}
.alert .button .cancel:hover {
  background-color: #00000005;
}
.alert .buttons .return {
  color: #5985eb;
}
.alert .buttons .return:active {
  background-color: #5985eb !important;
  color: white;
}
.alert .button .return:hover {
  background-color: #00000005;
}
</style>