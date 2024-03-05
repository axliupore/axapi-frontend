import { defineStore } from "pinia";
import { model_User, UserService } from "../../generated";
import { ACCESS_ENUM } from "@/access/access";

export const userStore = defineStore("user", {
  state: (): model_User => ({
    accessKey: "",
    account: "",
    avatar: "",
    balance: 0,
    email: "",
    gender: 0,
    id: 0,
    invitationCode: "",
    phone: "",
    profile: "",
    role: ACCESS_ENUM.NOT_LOGIN,
    secretKey: "",
    username: "",
  }),
  getters: {},
  actions: {
    async getLoginUser() {
      const res = await UserService.getApiUserGet();
      if (res.code === 0 && res.data != undefined) {
        /**
         * 从 API 响应中获取的数据
         */
        const userData: Partial<model_User> = res.data;

        /**
         * 使用对象解构赋值更新状态对象的属性
         */
        Object.assign(this, userData);
      }
    },
  },
});
