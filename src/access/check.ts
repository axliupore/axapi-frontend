import { model_User } from "../../generated";
import { ACCESS_ENUM } from "@/access/access";

export const checkAccess = (
  loginUser: model_User,
  needAccess = ACCESS_ENUM.NOT_LOGIN
) => {
  const loginUserAccess = loginUser.role ?? ACCESS_ENUM.NOT_LOGIN;
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  /**
   * 如果需要用户登录才能访问
   */
  if (needAccess === ACCESS_ENUM.USER) {
    /**
     * 如果用户没有登录，那么表示无权限
     */
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
    /**
     * 如果需要管理员权限
     */
    if (needAccess === ACCESS_ENUM.ADMIN) {
      if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
        return false;
      }
    }
    return true;
  }
};
