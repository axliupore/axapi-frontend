import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import { createPinia } from "pinia";
import { routerBeforeEach } from "@/access";
import VueCropper from "vue-cropper";
import "vue-cropper/dist/index.css";

const pinia = createPinia();
const app = createApp(App);

/**
 * 在路由跳转前进行权限验证
 */
router.beforeEach(routerBeforeEach);

app.use(router);
app.use(Antd);
app.use(pinia);
app.use(VueCropper);

app.mount("#app");
