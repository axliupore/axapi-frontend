<template>
  <div class="welcome-container">
    <a-card class="card-content">
      <a-typography>
        <a-typography-title :level="3"
          >欢迎使用 Ax-API 接口开放平台 🎉
        </a-typography-title>
        <a-typography-title :level="4"
          >Ax-API 接口开放平台是一个为用户和开发者提供全面API接口调用服务的平台
          🛠
        </a-typography-title>
        <a-typography-title :level="5">
          😀
          作为用户，可以获取调用权限，根据自己的需求浏览和选择合适的接口，可以进行在线的接口调试，快速验证接口的功能和效果。
          <br />
          💻 作为开发者，本项目提供了客户端的
          SDK，通过开发者凭证即可轻松集成接口到自己的项目中去。
          <br />
          🤝 您可以将自己的接口接入到 API
          接口开放平台平台上，并发布给其他用户使用。
          您可以管理和各个接口，以便更好地分析和优化接口性能。
          <br />
          👌 提供了开发者在线文档和技术支持，快速接入和发布接口。
          <br />
          🏁 无论您是用户还是开发者，Ax-API
          接口开放平台都致力于提供稳定、安全、高效的接口调用服务，帮助您实现更快速、便捷的开发和调用体验。
        </a-typography-title>
      </a-typography>
      <div class="card-div">
        <a-card v-for="(card, key) in cardList" :key="key" class="card">
          <div class="card-div-title">
            <div class="card-div-title-left">{{ card.id }}</div>
            <div class="card-div-title-right">
              <a-typography-title :level="5">
                {{ card.title }}
              </a-typography-title>
            </div>
          </div>
          <div class="card-div-content">
            <a-typography-text strong>
              {{ card.description }}
            </a-typography-text>
          </div>
        </a-card>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { userStore } from "@/store/user";

const cardList = ref([
  {
    id: 1,
    title: "多样化的接口选择",
    description:
      "平台上提供丰富多样的接口供您选择，涵盖了各个领域的功能和服务，满足不同需求。",
  },
  {
    id: 2,
    title: "在线调试功能",
    description:
      "您可以在平台上进行接口在线调试，快速验证接口的功能和效果，节省了开发调试的时间和工作量。",
  },
  {
    id: 3,
    title: "客户端SDK支持",
    description:
      "为了方便开发者集成接口到自己的代码中，平台提供了客户端SDK，使调用接口变得更加简单和便捷。",
  },
  {
    id: 4,
    title: "开发者文档和技术支持",
    description:
      "平台提供了详细的开发者文档和技术支持，帮助开发者快速接入和发布接口，解决遇到的问题和困难。",
  },
  {
    id: 5,
    title: "稳定和安全",
    description:
      "平台致力于提供稳定和安全的接口调用服务，采用了安全措施和技术手段，保障用户数据的安全性和隐私保护。",
  },
]);

onMounted(() => {
  const user = userStore();
  user.getLoginUser();
});
</script>

<style lang="less" scoped>
.welcome-container {
  margin-top: 20px;
  width: 100%;

  .card-content {
    width: 100%;

    .card-div {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-top: 20px;

      .card {
        background-color: rgb(255, 255, 255);
        box-shadow: rgba(0, 0, 0, 0.08) 0 6px 16px 0,
          rgba(0, 0, 0, 0.12) 0 3px 6px -4px, rgba(0, 0, 0, 0.05) 0 9px 28px 8px;
        border-radius: 8px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
        line-height: 22px;
        min-width: 220px;
        flex: 1 1 0;
      }

      .ant-card .ant-card-head {
        border-bottom: 0;
        padding: 16px;
      }

      .card-div-title {
        display: flex;
        gap: 4px;
        align-items: center;

        .card-div-title-left {
          width: 48px;
          height: 48px;
          line-height: 22px;
          background-size: 100%;
          text-align: center;
          padding: 8px 16px 16px 12px;
          color: rgb(255, 255, 255);
          font-weight: bold;
          background-image: url("https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg");
        }

        .card-div-title-right {
          font-size: 16px;
          color: rgba(0, 0, 0, 0.88);
          padding-bottom: 8px;
        }
      }

      .card-div-content {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
        text-align: justify;
        line-height: 22px;
        margin-bottom: 16px;
      }
    }
  }
}
</style>
