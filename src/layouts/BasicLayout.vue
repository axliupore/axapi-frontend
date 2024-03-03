<template>
  <div>
    <a-layout class="basicLayout">
      <a-config-provider
        :theme="{
          token: {
            colorPrimary: 'rgba(255, 255, 255)',
          },
        }"
      >
        <a-layout-header class="header">
          <MenuBar class="menu-bar" />
        </a-layout-header>
      </a-config-provider>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer
        class="footer"
        style="text-align: center"
      ></a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import MenuBar from "@/components/menu/MenuBar.vue";
</script>

<style lang="less" scoped>
.basicLayout {
  .header {
    padding-inline: 0;
  }

  .content {
    background-color: white;
    padding: 0 7%;
  }

  .footer {
    background-color: white;
  }
}
</style>
