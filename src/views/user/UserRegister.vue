<template>
  <div class="main">
    <a-form class="user-layout-register">
      <a-tabs v-model:activeKey="activeKey" centered>
        <a-tab-pane key="1" tab="账号密码注册">
          <a-form :model="formAccount">
            <a-form-item name="username">
              <a-input
                size="large"
                placeholder="请输入昵称"
                v-model:value="formAccount.username"
              >
                <template #prefix>
                  <AliwangwangOutlined />
                </template>
              </a-input>
            </a-form-item>
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
            <a-form-item
              name="password"
              :rules="[{ required: true, message: '请输入密码' }]"
            >
              <a-input-password
                size="large"
                placeholder="请确认密码"
                v-model:value="formAccount.checkPassword"
              >
                <template #prefix>
                  <LockOutlined />
                </template>
              </a-input-password>
            </a-form-item>
            <div style="margin-bottom: 24px">
              <a-checkbox v-model:checked="checked">同意并接受</a-checkbox>
              <router-link style="float: right" to="/user/login">
                已有账号?点击前往登录
              </router-link>
            </div>
            <a-form-item>
              <a-button
                class="login-button"
                size="large"
                type="primary"
                @click="registerAccount"
                html-type="submit"
                >注册
              </a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="2" tab="邮箱账号注册">
          <a-form :model="formEmail">
            <a-form-item name="username">
              <a-input
                size="large"
                placeholder="请输入昵称"
                v-model:value="formEmail.username"
              >
                <template #prefix>
                  <AliwangwangOutlined />
                </template>
              </a-input>
            </a-form-item>
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
              name="email"
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
                <a-button
                  size="large"
                  @click="sendEmail"
                  :disabled="disabled"
                  html-type="submit"
                >
                  {{ disabled ? `${countdown} 秒后重新获取` : "获取验证码" }}
                </a-button>
              </div>
            </a-form-item>
            <div style="margin-bottom: 24px">
              <a-checkbox v-model:checked="checked">同意并接受</a-checkbox>
              <router-link style="float: right" to="/user/login">
                已有账号?点击前往登录
              </router-link>
            </div>
            <a-form-item>
              <a-button
                class="login-button"
                size="large"
                type="primary"
                @click="registerEmail"
                html-type="submit"
                >注册
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
  AliwangwangOutlined,
} from "@ant-design/icons-vue";

import { reactive, ref } from "vue";
import { EmailService, UserService } from "../../../generated";
import { message } from "ant-design-vue";
import router from "@/router";

/**
 * 用来默认选择注册方式
 */
const activeKey = ref("1");

/**
 * 默认是自动注册
 */
const checked = ref(true);

/**
 * 是否禁用按钮
 */
const disabled = ref<boolean>(false);

const countdown = ref(0);

let timer: ReturnType<typeof setInterval> | null = null;

/**
 * 账号注册需要用到的表单
 */
const formAccount = reactive({
  account: "",
  password: "",
  checkPassword: "",
  username: "",
});

/**
 * 邮箱注册用到的表单
 */
const formEmail = reactive({
  email: "",
  code: "",
  username: "",
});

const registerAccount = async () => {
  if (
    formAccount.account === "" ||
    formAccount.password === "" ||
    formAccount.checkPassword === ""
  ) {
    return;
  }
  const res = await UserService.postApiUserRegisterAccount(formAccount);
  if (res.code === 0) {
    message.success("注册成功");
    await router.push({
      path: "/user/login",
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        clearInterval(timer);
        disabled.value = false;
      }
    }, 1000);
  } else {
    message.error(res.msg);
  }
};

const registerEmail = async () => {
  if (formEmail.email === "" || formEmail.code === "") {
    return;
  }
  const res = await UserService.postApiUserRegisterEmail(formEmail);
  if (res.code === 0) {
    message.success("注册成功");
    await router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error(res.msg);
  }
};
</script>

<style lang="less" scoped>
.user-layout-register {
  // 设置 label 标签的字体大小
  label {
    font-size: 14px;
  }

  // 注册按钮样式
  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }
}
</style>
