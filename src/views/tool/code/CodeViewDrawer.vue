<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    title="预览代码"
    :show-ok-btn="false"
    width="1500px"
  >
    <Tabs>
      <template v-for="(value, key) in dataMap" :key="key">
        <TabPane>
          <template #tab>
            {{ key }}
          </template>
          <pre>{{ value }}</pre>
        </TabPane>
      </template>
    </Tabs>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { Tabs } from 'ant-design-vue';
  import { viewCode } from '/@/api/tool/code';
  const TabPane = Tabs.TabPane;
  const dataMap = ref();
  const [registerDrawer, { setDrawerProps }] = useDrawerInner(async (data) => {
    dataMap.value = await viewCode({ id: data.record.id, system: 'lemon' });
    setDrawerProps({ confirmLoading: false });
  });
</script>
