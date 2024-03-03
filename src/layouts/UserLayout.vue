<template>
  <div id="userLayout" :class="['user-layout-wrapper']">
    <div class="container">
      <div class="user-layout-content">
        <div class="top">
          <div class="header">
            <img src="~@/assets/logo.svg" alt="logo" />
            <span class="title"> Ax-API 接口开放平台 </span>
          </div>
          <div class="desc">
            Ax-API 接口开放平台致力于提供稳定、安全、高效的接口调用服务
          </div>
        </div>

        <router-view />

        <div class="footer">
          <div class="links">
            <a-popover>
              <template #content>查看本站技术及源码，欢迎 star</template>
              <a href="https://github.com/AxLiupore/axapi">
                <GithubOutlined />
                项目地址</a
              >
            </a-popover>
            <a-popover>
              <template #content>
                <img
                  src="~@/assets/wechat.png"
                  alt="weixin"
                  style="max-width: 120px; max-height: 120px"
                />
              </template>
              <a href="">
                <WechatOutlined />
                联系作者
              </a>
            </a-popover>
            <a href="">
              <InfoCircleOutlined />
              免责声明</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  GithubOutlined,
  WechatOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons-vue";
import { onBeforeUnmount, onMounted } from "vue";

onMounted(() => {
  document.body.classList.add("userLayout");
});

onBeforeUnmount(() => {
  document.body.classList.remove("userLayout");
});
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  /* 设置整体布局高度为100% */
  height: 100%;

  .container {
    /* 设置容器宽度为100%，最小高度为100% */
    width: 100%;
    min-height: 100%;

    /* 设置背景样式 */
    background: #f0f2f5 no-repeat 50%;
    background-size: 100%;

    /* 容器相对定位，以便子元素绝对定位 */
    position: relative;
  }

  .user-layout-content {
    /* 内容区域上边距、下边距调整 */
    padding: 32px 0 24px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    .top {
      /* 顶部区域文本居中 */
      text-align: center;

      font-size: 33px;

      margin-top: 30px;

      .header {
        /* 头部区域高度和行高设置 */
        height: 44px;
        line-height: 44px;

        .badge {
          /* 徽标的定位和透明度设置 */
          position: absolute;
          display: inline-block;
          line-height: 1;
          vertical-align: middle;
          margin-left: -12px;
          margin-top: -10px;
          opacity: 0.8;
        }

        .logo {
          /* Logo样式设置 */
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
          border-style: none;
        }

        .title {
          /* 标题样式设置 */
          font-size: 33px;
          color: rgba(0, 0, 0, 0.85);
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Helvetica Neue, Arial, Noto Sans, sans-serif, "Apple Color Emoji",
            "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }

      .desc {
        /* 描述文本样式设置 */
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-top: 16px;
        margin-bottom: 34px;
      }
    }

    .main {
      /* 主要内容区域最小宽度和居中设置 */
      min-width: 260px;
      width: 368px;
      margin: 0 auto;
      flex: 1;
    }

    .footer {
      /* 底部区域设置 */
      width: 100%;
      bottom: 0;
      padding: 0 16px;
      margin-top: auto;
      text-align: center;

      .links {
        /* 链接样式设置 */
        margin-bottom: 8px;
        font-size: 14px;

        a {
          /* 链接样式设置 */
          color: rgba(0, 0, 0, 0.65);
          text-decoration: none;
          transition: all 0.3s;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
