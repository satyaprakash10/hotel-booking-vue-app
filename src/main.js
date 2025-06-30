import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import Toast from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import.meta.env.VITE_API_URL;
const app = createApp(App);

app.use(VueSweetalert2);
app.use(createPinia());
app.use(router);
app.use(Toast);
app.mount("#app");
