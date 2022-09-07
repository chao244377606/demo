<template>
  <Tooltip placement="top">
    <template #title>
      <span>{{ title }}</span>
    </template>
    <slot></slot>
  </Tooltip>
</template>

<script lang="ts" setup>
  import { Tooltip } from 'ant-design-vue';
  defineProps({
    title: {
      type: String,
    },
    // abs: {
    //   type: string,
    //   default: 'top',
    // },
  });
  // console.log(props);
</script>
