<template>
  <div>
    <a-menu class="menu" mode="horizontal">
      <a-menu-item key="1">
        <a href="/">
          <div class="logo">
            <img src="~@/assets/logo.svg" alt="Ax-API 接口开放平台" /><span
              >Ax-API 接口开放平台</span
            >
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
      <a-menu-item key="5" style="text-align: center">
        <a-dropdown>
          <div @click.prevent>
            <UserIcon />
            <span>游客</span>
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <LoginIcon />
                <span style="margin-left: 8px"> 登录账号 </span>
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
import { SmileOutlined } from "@ant-design/icons-vue";
import UserIcon from "@/components/icon/UserIcon.vue";
</script>
<style lang="less">
.menu {
  width: 100%;

  .ant-menu-item {
    a {
      text-decoration: none; /* 去除链接的下划线 */
      color: inherit; /* 继承父元素的文字颜色 */
    }

    &::after {
      border-bottom: 0 !important;
    }

    &:hover {
      background-color: rgba(169, 169, 169, 0.2);
      border-radius: 8px;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
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
}
</style>
