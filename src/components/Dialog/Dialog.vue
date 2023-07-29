<script setup lang="ts">
import type { Ref } from 'vue'
import { onMounted, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

const props = withDefaults(defineProps<{
  title?: string
  cancelButtonShow?: boolean
  dialogShow?: boolean
}>(), {
  title: 'title',
  cancelButtonShow: true,
  dialogShow: false,
})

const emits = defineEmits<{
  (e: 'cancel'): void
  (e: 'return'): void
}>()

const { t } = useI18n()

const dialog = ref(null) as unknown as Ref<HTMLDialogElement>

onMounted(() => {
  const closeAlert = () => {
    dialog.value.close()
  }

  watchEffect(() => {
    if (props.dialogShow) {
      dialog.value.removeEventListener('animationend', closeAlert)
      dialog.value.showModal()
    }
    else {
      dialog.value.addEventListener('animationend', closeAlert)
    }
  })
})
</script>

<template>
  <dialog
    ref="dialog"
    :class="`alert ${dialogShow ? '' : 'hide'}`"
    bg="white dark:#333"
    border="1px solid #999 dark:black/10"
  >
    <div
      class="title"
      data-tauri-drag-region
      c="#333 dark:#bbb"
    >
      {{ title }}
    </div>
    <div
      class="body"
      :style="{ alignItems: title === t('dialog.hit') ? 'center' : '' }"
      c="#333 dark:#bbb"
    >
      <slot />
    </div>
    <div class="buttons">
      <div
        v-if="cancelButtonShow"
        class="cancel"
        c="#333 dark:#bbb"
        @click="emits('cancel')"
      >
        {{ t('dialog.cancel') }}
      </div>
      <div
        class="return"
        :style="{ width: cancelButtonShow ? '' : '100%' }"
        @click="emits('return')"
      >
        {{ t('dialog.return') }}
      </div>
    </div>
  </dialog>
</template>

<style scoped>
@import "dialogAnimation.css";

.alert {
  --uno: p-0 z-10 w-300px rounded-9px shadow-md shadow-black/5 overflow-hidden select-none outline-none c-black/65;
}
.alert .title {
  --uno: border-b-1.5px border-b-solid border-b-black/10 p-12px flex justify-center items-center bg-black/5;
}
.alert .body {
  --uno: p-18px text-14px flex flex-col border-b-1.5px border-b-solid border-b-black/10 min-h-12 justify-center;
}
.alert .body:deep(ul) {
  --uno: m-0;
}
.alert .body:deep(ul) li {
  --uno: ml--18px select-text;
}
.alert .body :deep(span) {
  --uno: block whitespace-pre-wrap select-text text-center;
}

.alert .buttons {
  --uno: flex items-center h-50px bg-black/8;
}
.alert .buttons div {
  --uno: w-50% h-100% flex justify-center items-center text-15px font-bold cursor-pointer;
}
.alert .buttons .cancel {
  --uno: border-r-2px border-r-solid border-black/8;
}
.alert .buttons .cancel:active {
  --uno: \!bg-black/8;
}
.alert .buttons .cancel:hover {
  --uno: \!bg-black/4
}
.alert .buttons .return {
  --uno: c-#5985eb;
}
.alert .buttons .return:active {
  --uno: \!bg-#5985eb c-white;
}
.alert .buttons .return:hover {
  --uno: bg-black/4;
}
</style>
