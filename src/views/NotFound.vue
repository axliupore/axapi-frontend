<template>
  <div class="welcome-container">
    <a-card class="card-content">
      <div class="card-div">
        <a-card class="card"> 404 页面未找到</a-card>
      </div>
    </a-card>
  </div>
</template>

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

      .card {
        background-color: rgb(255, 255, 255);
        box-shadow: rgba(0, 0, 0, 0.08) 0 6px 16px 0,
          rgba(0, 0, 0, 0.12) 0 3px 6px -4px, rgba(0, 0, 0, 0.05) 0 9px 28px 8px;
        border-radius: 8px;
        font-size: 32px;
        color: rgba(0, 0, 0, 0.65);
        line-height: 22px;
        min-width: 220px;
        flex: 1 1 0;
        text-align: center;
      }

      .ant-card .ant-card-head {
        border-bottom: 0;
        padding: 0;
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
