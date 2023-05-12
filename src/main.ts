import 'virtual:uno.css'
import { createApp } from "vue";
import "./styles.css";
import App from "./App.vue";
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import router from './router';
import i18n from './i18n';

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(PerfectScrollbar)
app.mount("#app");
