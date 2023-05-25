<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';
import TitleBar from './components/TitleBar'
import emitter from './utils/emitter';
import Dialog from './components/Dialog/Dialog.vue';
import { versionCode } from './utils/appVersion';
import { open } from '@tauri-apps/api/shell';
import { useI18n } from 'vue-i18n';
import { isLogin, uid } from './utils/getUser';
import LocalStorage from './utils/localStorage';

const { t } = useI18n()

const bgColor = ref('')

emitter.on('bgColor', (data) => {
  bgColor.value = (data as unknown as string)
})

const newVersion = ref('')
const updateMsg: Ref<string[]> = ref([])
const dialogShow = ref(false)
const autoUpdate = localStorage.getItem('autoUpdate') === 'true' || !localStorage.getItem('autoUpdate')
onMounted(() => {
  if (autoUpdate) {
    fetch('https://api.todo.uyou.org.cn/update/get').then(res => {
      return res.json()
    }).then(res => {
      if (res[2].code > versionCode) {
        newVersion.value = `${t('updatePage.newVersion')}: v${res[2].version}`
        updateMsg.value = res[2].data
        dialogShow.value = true
      }
    })
  }
  if (isLogin) {
    fetch('https://api.todo.uyou.org.cn/gettodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: uid
      })
    }).then(res => {
      return res.json()
    }).then(res => {
      localStorage.setItem('ToDo', res.data)
      emitter.emit('todoData', LocalStorage('get'))
    })
  }
})
</script>

<template>
  <div :class="bgColor" h-screen w-screen>
    <title-bar></title-bar>
    <router-view></router-view>
    <Dialog 
      :title="newVersion" 
      :dialog-show="dialogShow" 
      @cancel="dialogShow = false" 
      @return="open('https://github.com/tonylu110/uyou-todo-lite/releases')"
    >
      <ul>
        <li v-for="(item, index) in updateMsg" :key="index">{{ item.slice(2) }}</li>
      </ul>
    </Dialog>
  </div>
</template>
