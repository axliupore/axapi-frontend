import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import UserLogin from "@/views/user/UserLogin.vue";
import UserRegister from "@/views/user/UserRegister.vue";
import WelcomeView from "@/views/WelcomeView.vue";
import { ACCESS_ENUM } from "@/access/access";
import NotFound from "@/views/NotFound.vue";
import UserIndex from "@/views/user/UserIndex.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import BasicLayout from "@/layouts/BasicLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户登录",
    component: UserLayout,
    children: [
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
    ],
  },
  {
    name: "主页",
    path: "/user",
    component: BasicLayout,
    children: [
      {
        path: "/user/index",
        name: "用户主页",
        component: UserIndex,
        meta: {
          access: ACCESS_ENUM.USER || ACCESS_ENUM.ADMIN,
        },
      },
      {
        path: "/",
        name: "主页",
        component: WelcomeView,
      },
      {
        path: "/404",
        name: "404",
        component: NotFound,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
