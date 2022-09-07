<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>

    <!-- 全屏加载 -->
    <Loading :loading="$fn.store.loading" :absolute="true" :tip="$fn.store.loadingTip" />
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { Loading } from '/@/components/Loading';

  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@/components/Application';
  import { useTitle } from '/@/hooks/web/useTitle';
  import { useLocale } from '/@/locales/useLocale';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  dayjs.locale('zh-cn');

  // support Multi-language
  const { getAntdLocale } = useLocale();

  // Listening to page changes and dynamically changing site titles
  useTitle();
</script>
<style>
  .ant-scrolling-effect {
    width: 100% !important;
  }
</style>
