import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { userStore } from "@/store/user";
import { ACCESS_ENUM } from "@/access/access";
import { checkAccess } from "@/access/check";

export const routerBeforeEach = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const loginUser = userStore();

  /**
   * 如果是未登录就获取登录态
   */
  if (loginUser.role === ACCESS_ENUM.NOT_LOGIN) {
    await loginUser.getLoginUser();
  }

  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;

  /**
   * 要跳转的页面必须登录
   */
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    /**
     * 如果没有登录，跳转到登录页面
     */
    if (loginUser.role === ACCESS_ENUM.NOT_LOGIN) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }

    /**
     * 如果已经登录了，但是权限不足，那么跳转到无权限页面
     */
    if (!checkAccess(loginUser, needAccess)) {
      next("/404");
      return;
    }
  }
  next();
};
