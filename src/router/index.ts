import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import UserLogin from "@/views/user/UserLogin.vue";
import UserRegister from "@/views/user/UserRegister.vue";
import WelcomeView from "@/views/WelcomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/user/login",
    name: "用户登录",
    component: UserLogin,
  },
  {
    path: "/user/register",
    name: "用户注册",
    component: UserRegister,
  },
  {
    path: "/",
    name: "主页",
    component: WelcomeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
