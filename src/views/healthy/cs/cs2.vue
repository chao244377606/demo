<template>
  <!-- 浮动 -->
  <div @click="go('/basicFiles/list')">基础档案</div>
  <div @click="go('/basicFiles/baseDataSet/list')">基础数据</div>
</template>

<script lang="ts" setup>
  import { useGo } from '/@/hooks/web/usePage';
  const go = useGo();

  // 执行刷新
  // go();
</script>
