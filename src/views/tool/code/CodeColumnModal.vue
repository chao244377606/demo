<template>
  <BasicModal
    v-bind="$attrs"
    @register="codeModal"
    title="字段配置"
    @ok="handleSubmit"
    :defaultFullscreen="true"
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
      <template #isInsert="{ record }">
        <Switch v-model:checked="record.isInsert" checkedValue="1" unCheckedValue="0" />
      </template>
      <template #isEdit="{ record }">
        <Switch v-model:checked="record.isEdit" checkedValue="1" unCheckedValue="0" />
      </template>
      <template #isList="{ record }">
        <Switch v-model:checked="record.isList" checkedValue="1" unCheckedValue="0" />
      </template>
      <template #isQuery="{ record }">
        <Switch v-model:checked="record.isQuery" checkedValue="1" unCheckedValue="0" />
      </template>
      <template #isRequired="{ record }">
        <Switch v-model:checked="record.isRequired" checkedValue="1" unCheckedValue="0" />
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
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { getList, update } from '/@/api/tool/codecolumn';
  import { getAllDictList } from '/@/api/system/system';

  import { columns } from './codecolumn.data';
  import { Select, Switch } from 'ant-design-vue';

  import { BasicTable, useTable } from '/@/components/Table';
  const emit = defineEmits(['success', 'register']);
  interface Dict {
    code: string;
    dictValue: string;
  }
  const rowId = ref();
  const dictList = ref<Dict[]>([]);
  const SelectOption = Select.Option;
  const [registerTable, { reload, setProps, getDataSource }] = useTable({
    api: getList,
    columns: columns,
    showTableSetting: false,
    tableSetting: { fullScreen: true },
    immediate: false,
    pagination: false,
  });

  const [codeModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    rowId.value = data.record.id;
    dictList.value = await getAllDictList();
    setProps({ searchInfo: { tableId: unref(rowId) } });
    reload();
  });

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      const codeList = getDataSource();
      await update(codeList);
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
