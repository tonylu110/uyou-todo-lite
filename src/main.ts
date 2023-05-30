import 'virtual:uno.css'
import { createApp, ref } from "vue";
import { register, unregister } from '@tauri-apps/api/globalShortcut';
import "./styles.css";
import App from "./App.vue";
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import router from './router';
import i18n from './i18n';
import emitter from './utils/emitter';

const addShortcut = ref(localStorage.getItem('addShortcut') === 'true')
if (addShortcut.value) {
  await register('Alt+A', () => {
    emitter.emit('showAddItem')
  })
}

emitter.on('getShortcut', async (data) => {
  (data as boolean) ? await register('Alt+A', () => emitter.emit('showAddItem')) : await unregister('Alt+A')
})

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(PerfectScrollbar)
app.mount("#app");
