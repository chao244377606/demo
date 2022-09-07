<template>
  <div class="my_text_area">
    <a-textarea :maxLength="maxLength" :rows="rows" v-bind="attrs" v-model:value="state" />
    <div class="count"> {{ cumCount }} / {{ maxLength }} </div>
  </div>
</template>
<script lang="ts" setup>
  import { PropType, computed } from 'vue';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';
  import { useAttrs } from '/@/hooks/core/useAttrs';

  let props = defineProps({
    value: {
      type: [String, Number, Boolean] as PropType<string | number | boolean>,
    },
    maxLength: {
      type: Number,
      default: 500,
    },
    rows: {
      type: Number,
      default: 4,
    },
  });
  const attrs = useAttrs();
  const [state] = useRuleFormItem(props);
  let cumCount = computed(() => {
    if (!state.value) return '0';
    let val = $fn.clone(state.value);
    return val.length;
  });
</script>
<style scoped lang="less">
  .my_text_area {
    position: relative;
    .count {
      position: absolute;
      z-index: 222;
      right: 4px;
      bottom: 2px;
      color: #888;
      font-size: 13px;
    }
    :deep(.ant-input-clear-icon) {
      display: none !important;
    }
  }
</style>
