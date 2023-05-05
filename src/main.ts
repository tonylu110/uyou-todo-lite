import 'virtual:uno.css'
import { createApp } from "vue";
import "./styles.css";
import App from "./App.vue";
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import router from './router';

createApp(App).use(router).use(PerfectScrollbar).mount("#app");
