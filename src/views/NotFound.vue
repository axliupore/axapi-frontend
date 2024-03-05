<template>
  <div class="NotFound">
    <div class="content">404 页面未找到</div>
  </div>
</template>

<style lang="less" scoped>
.NotFound {
  display: flex;
  justify-content: center; /* 水平居中 */
  margin-top: 64px;

  .content {
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    font-size: 88px;
    font-weight: bold;
    margin: 0 auto;
    padding: 12px 24px;
    text-decoration: none;
    text-transform: capitalize;
    background-color: #0867ec;
    border: 2px solid #0867ec;
    color: #ffffff;
    pointer-events: none;
    width: 60%;
    text-align: center;
  }
}
</style>
