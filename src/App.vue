<script setup lang="ts">
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'
import { open } from '@tauri-apps/api/shell'
import { useI18n } from 'vue-i18n'
import { usePreferredDark } from '@vueuse/core'
import Dialog from './components/Dialog/Dialog.vue'
import { versionCode } from './utils/appVersion'
import { isLogin, updateData } from './utils/getUser'
import getCloudTodo from './utils/getCloudTodo'

const { t } = useI18n()

const newVersion = ref('')
const updateMsg: Ref<string[]> = ref([])
const dialogShow = ref(false)
const autoUpdate = localStorage.getItem('autoUpdate') === 'true' || !localStorage.getItem('autoUpdate')
onMounted(() => {
  if (autoUpdate) {
    fetch('https://api.todo.uyou.org.cn/update/get').then((res) => {
      return res.json()
    }).then((res) => {
      if (res[2].code > versionCode) {
        newVersion.value = `${t('updatePage.newVersion')}: v${res[2].version}`
        updateMsg.value = res[2].data
        dialogShow.value = true
      }
    })
  }
  if (isLogin && updateData)
    getCloudTodo()
})

const isDark = usePreferredDark()
</script>

<template>
  <div h-screen w-screen :class="isDark ? 'dark' : ''">
    <router-view />
    <Dialog
      :title="newVersion"
      :dialog-show="dialogShow"
      @cancel="dialogShow = false"
      @return="open('https://github.com/tonylu110/uyou-todo-lite/releases')"
    >
      <ul>
        <li v-for="(item, index) in updateMsg" :key="index">
          {{ item.slice(2) }}
        </li>
      </ul>
    </Dialog>
  </div>
</template>
