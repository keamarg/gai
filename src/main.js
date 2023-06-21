import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Vue3Lottie from "vue3-lottie";
import "vue3-lottie/dist/style.css";
import "./assets/css/global.css";

createApp(App).use(router).use(Vue3Lottie).mount("#app");
