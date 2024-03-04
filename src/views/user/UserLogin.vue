<template>
  <div class="main">
    <a-form class="user-layout-login">
      <a-tabs v-model:activeKey="activeKey" centered>
        <a-tab-pane key="1" tab="账号密码登录">
          <a-form :model="formAccount">
            <a-form-item
              name="account"
              :rules="[{ required: true, message: '请输入账号' }]"
            >
              <a-input
                size="large"
                placeholder="请输入账号"
                v-model:value="formAccount.account"
              >
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item
              name="password"
              :rules="[{ required: true, message: '请输入密码' }]"
            >
              <a-input-password
                size="large"
                placeholder="请输入密码"
                v-model:value="formAccount.password"
              >
                <template #prefix>
                  <LockOutlined />
                </template>
              </a-input-password>
            </a-form-item>
            <div style="margin-bottom: 24px">
              <a-checkbox v-model:checked="checked">自动登录</a-checkbox>
              <router-link style="float: right" to="/user/register">
                还没账号?点击前往注册
              </router-link>
            </div>
            <a-form-item>
              <a-button
                class="login-button"
                size="large"
                type="primary"
                @click="loginAccount"
                html-type="submit"
                >登录
              </a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="2" tab="邮箱账号登录">
          <a-form :model="formEmail">
            <a-form-item
              name="email"
              :rules="[
                { required: true, message: '请输入邮箱' },
                {
                  pattern: /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/,
                  message: '不合法的邮箱账号！',
                },
              ]"
            >
              <a-input
                size="large"
                placeholder="请输入邮箱"
                v-model:value="formEmail.email"
              >
                <template #prefix>
                  <MailOutlined />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item
              name="code"
              :rules="[{ required: true, message: '请输入验证码' }]"
            >
              <div style="display: flex">
                <a-input
                  size="large"
                  placeholder="请输入验证码"
                  style="margin-right: 8px"
                  v-model:value="formEmail.code"
                >
                  <template #prefix>
                    <LockOutlined />
                  </template>
                </a-input>
                <a-button size="large" @click="sendEmail" :disabled="disabled">
                  {{ disabled ? `${countdown} 秒后重新获取` : "获取验证码" }}
                </a-button>
              </div>
            </a-form-item>
            <div style="margin-bottom: 24px">
              <a-checkbox v-model:checked="checked">自动登录</a-checkbox>
              <router-link style="float: right" to="/user/register">
                还没账号?点击前往注册
              </router-link>
            </div>
            <a-form-item>
              <a-button
                class="login-button"
                size="large"
                type="primary"
                @click="loginEmail"
                html-type="submit"
                >登录
              </a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons-vue";

import { reactive, ref } from "vue";
import { EmailService, UserService } from "../../../generated";
import { message } from "ant-design-vue";
import token from "@/utils/token";
import router from "@/router";

// 用来默认选择登录方式
const activeKey = ref("1");

// 默认是自动登录
const checked = ref(true);

// 是否禁用按钮
const disabled = ref<boolean>(false);

const countdown = ref(0);

let timer: ReturnType<typeof setInterval> | null = null;

// 账号登录需要用到的表单
const formAccount = reactive({
  account: "axliu",
  password: "12345678",
});

// 邮箱登录用到的表单
const formEmail = reactive({
  email: "276836658@qq.com",
  code: "",
});

const loginAccount = async () => {
  if (formAccount.account === "" || formAccount.password === "") {
    return;
  }
  const res = await UserService.postApiUserLoginAccount(formAccount);
  if (res.code === 0) {
    token.setToken(res.data.token);
    message.success("登录成功");
    await router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error(res.msg);
  }
};

const sendEmail = async () => {
  if (formEmail.email === "") {
    return;
  }
  const res = await EmailService.postApiEmailSend(formEmail);
  if (res.code === 0) {
    message.success("验证码发送成功");
    disabled.value = true;
    countdown.value = 60; // 设置初始倒计时为60秒
    timer = setInterval(() => {
      countdown.value -= 1;
      if (countdown.value === 0) {
        clearInterval(timer as any);
        disabled.value = false;
      }
    }, 1000);
  } else {
    message.error(res.msg);
  }
};

const loginEmail = async () => {
  if (formEmail.email === "" || formEmail.code === "") {
    return;
  }
  const res = await UserService.postApiUserLoginEmail(formEmail);
  if (res.code === 0) {
    token.setToken(res.data.token);
    message.success("登录成功");
    await router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error(res.msg);
  }
};
</script>

<style lang="less" scoped>
.user-layout-login {
  // 设置 label 标签的字体大小
  label {
    font-size: 14px;
  }

  // 登录按钮样式
  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }
}
</style>
