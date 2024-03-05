<template>
  <div class="menu-bar">
    <a-menu class="menu" mode="horizontal">
      <a-menu-item key="1">
        <a href="/">
          <div class="logo">
            <img
              src="../../../public/logo.svg"
              alt="Ax-API 接口开放平台"
            /><span>Ax-API 接口开放平台</span>
          </div>
        </a>
      </a-menu-item>
      <a-menu-item key="2">
        <SmileOutlined />
        <span>欢迎</span></a-menu-item
      >
      <a-menu-item key="3">
        <SquareIcon />
        <span>接口广场</span>
      </a-menu-item>
      <a-menu-item key="4">
        <OrderIcon />
        <span>我的订单</span>
      </a-menu-item>
      <a-menu-item class="menu-guide">
        <span>📘 开发者文档</span>
      </a-menu-item>
      <a-menu-item
        v-if="user.role === ACCESS_ENUM.NOT_LOGIN || user.avatar === ''"
        class="user-avatar"
        key="5"
      >
        <a-dropdown>
          <div @click.prevent>
            <UserIcon />
            <span>{{ user.username ? user.username : "游客" }}</span>
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item v-if="user.role === ACCESS_ENUM.NOT_LOGIN">
                <LoginIcon />
                <router-link to="/user/login">
                  <span style="margin-left: 8px"> 登录账号 </span>
                </router-link>
              </a-menu-item>
              <a-menu-item v-if="user.role !== ACCESS_ENUM.NOT_LOGIN">
                <LoginIcon />
                <router-link to="/user/logout">
                  <span style="margin-left: 8px"> 个人中心 </span>
                </router-link>
              </a-menu-item>
              <a-menu-item v-if="user.role !== ACCESS_ENUM.NOT_LOGIN">
                <LogoutOutlined style="color: #ff4d4f" />
                <span style="margin-left: 8px; color: #ff4d4f" @click="logout">
                  退出登录
                </span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-menu-item>
      <a-menu-item v-else class="user-avatar" key="6">
        <a-dropdown>
          <div @click.prevent>
            <a-avatar :src="user.avatar" style="margin-right: 10px" />
            <span>{{ user.username }}</span>
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <UserOutlined />
                <router-link to="/user/logout">
                  <span style="margin-left: 8px"> 个人中心 </span>
                </router-link>
              </a-menu-item>
              <a-menu-item>
                <LogoutOutlined style="color: #ff4d4f" />
                <span style="margin-left: 8px; color: #ff4d4f" @click="logout">
                  退出登录
                </span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script setup lang="ts">
import OrderIcon from "@/components/icon/OrderIcon.vue";
import SquareIcon from "@/components/icon/SquareIcon.vue";
import LoginIcon from "@/components/icon/LoginIcon.vue";
import {
  SmileOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";
import UserIcon from "@/components/icon/UserIcon.vue";
import { userStore } from "@/store/user";
import { ACCESS_ENUM } from "@/access/access";
import token from "@/utils/token";
import router from "@/router";
import { message } from "ant-design-vue";

const logout = () => {
  message.success("退出登录成功");
  token.clearToken();
  router.push({
    path: "/",
    replace: true,
  });
  setTimeout(() => {
    location.reload();
  }, 500);
};

const user = userStore();
</script>
<style lang="less">
.menu-bar {
  .menu {
    width: 100%;

    .ant-menu-item {
      a {
        text-decoration: none; /* 去除链接的下划线 */
        color: inherit; /* 继承父元素的文字颜色 */
      }

      &::after {
        border-bottom: 0 !important;
        box-sizing: border-box;
      }

      &:hover {
        background-color: rgba(169, 169, 169, 0.2);
        border-radius: 8px;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
      }
    }

    .ant-menu-item:first-child {
      &:hover {
        background-color: transparent; /* 第一个菜单项悬浮时的背景色设置为透明 */
        box-shadow: none; /* 第一个菜单项悬浮时的阴影设置为透明 */
      }
    }

    .logo {
      margin-left: 20px;
    }

    .user-avatar {
      margin-left: auto;
      margin-right: 10px;
    }
  }
}
</style>
