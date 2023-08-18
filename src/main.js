import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Vue3Lottie from "vue3-lottie";
import "bootstrap-icons/font/bootstrap-icons.css";
import Vue3linkify from "vue-3-linkify";
import "vue3-lottie/dist/style.css";
import "./assets/css/global.css";
import { createPinia } from "pinia"; // Import createPinia from Pinia
const pinia = createPinia();

createApp(App)
  .use(router)
  .use(Vue3Lottie)
  .use(pinia)
  .use(Vue3linkify)
  .mount("#app");
