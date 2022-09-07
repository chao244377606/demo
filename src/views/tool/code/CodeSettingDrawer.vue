<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    :destroyOnClose="true"
    title="编辑代码"
    :height="'80%'"
    @ok="handleSubmit"
    showFooter
    width="1400px"
  >
    <BasicTable @register="registerTable">
      <template #columnComment="{ record }">
        <a-input v-model:value="record.columnComment" />
      </template>
      <template #javaType="{ record }">
        <Select v-model:value="record.javaType" :style="{ width: '100%' }">
          <SelectOption value="Long">Long</SelectOption>
          <SelectOption value="String">String</SelectOption>
          <SelectOption value="Double">Double</SelectOption>
          <SelectOption value="BigDecimal">BigDecimal</SelectOption>
          <SelectOption value="Date">Date</SelectOption>
        </Select>
      </template>
      <template #javaField="{ record }">
        <a-input v-model:value="record.javaField" />
      </template>
      <template #isInsert|isEdit|isList|isQuery="{ record }">
        <a-divider :dashed="true" type="vertical" />
        <a-checkbox v-model:checked="record.isInsert" />
        <a-divider type="vertical" />
        <a-checkbox v-model:checked="record.isEdit" />
        <a-divider type="vertical" />
        <a-checkbox v-model:checked="record.isList" />
        <a-divider type="vertical" />
        <a-checkbox v-model:checked="record.isQuery" />
      </template>
      <template #isRequired="{ record }">
        <a-checkbox v-model:checked="record.isRequired" />
      </template>
      <template #htmlType="{ record }">
        <Select v-model:value="record.htmlType" :style="{ width: '100%' }">
          <SelectOption value="input">文本框</SelectOption>
          <SelectOption value="textarea">文本域</SelectOption>
          <SelectOption value="select">下拉框</SelectOption>
          <SelectOption value="radio">单选框</SelectOption>
          <SelectOption value="checkbox">复选框</SelectOption>
          <SelectOption value="datetime">日期控件</SelectOption>
          <SelectOption value="editor">富文本控件</SelectOption>
        </Select>
      </template>
      <template #dictType="{ record }">
        <Select v-model:value="record.dictType" :style="{ width: '100%' }">
          <template v-for="item in dictList" :key="`${item.dictValue}`">
            <SelectOption :value="item.code">{{ item.dictValue }}</SelectOption>
          </template>
        </Select>
      </template>
    </BasicTable>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { getList, update } from '/@/api/tool/codecolumn';
  import { Select, Divider, Checkbox } from 'ant-design-vue';

  import { columns } from './codecolumn.data';
  import { getAllDictList } from '/@/api/system/system';

  import { BasicTable, useTable } from '/@/components/Table';
  const ADivider = Divider;
  const ACheckbox = Checkbox;
  const dictList = ref<Dict[]>([]);
  const emit = defineEmits(['success', 'register']);
  interface Dict {
    code: string;
    dictValue: string;
  }
  const rowId = ref();
  const datasourceId = ref();
  const SelectOption = Select.Option;
  const [registerTable, { reload, setProps, getDataSource }] = useTable({
    api: getList,
    maxHeight: 680,
    columns: columns,
    showTableSetting: false,
    tableSetting: { fullScreen: true },
    immediate: false,
    pagination: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    rowId.value = data.record.id;
    datasourceId.value = data.record.datasourceId;
    dictList.value = await getAllDictList();
    setProps({ searchInfo: { tableId: unref(rowId), datasourceId: unref(datasourceId) } });
    setDrawerProps({ confirmLoading: false });
    reload();
  });

  async function handleSubmit() {
    try {
      setDrawerProps({ confirmLoading: true });
      const codeList = getDataSource();
      await update(codeList);
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
