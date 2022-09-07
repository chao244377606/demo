<template>
  <div>
    <BasicTable @register="registerTable">
      <!-- 搜索-自定义组件 -->
      <template #form-linkage="{ model, field }">
        <fourLinkAge v-model="model[field]" />
      </template>
      <!-- 操作栏-工具栏 -->
      <template #toolbar>
        <a-button
          type="primary"
          @click="$fn.export('/health/base/oldManExport', getForm, { type: 3 })"
          >导出
        </a-button>
      </template>
      <!-- 操作列渲染 -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '基础档案',
                onClick: actionType.bind(null, record, 'show'),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>

    <listModal @register="registerModal" @ok="reload" />
  </div>
</template>

<script setup lang="ts">
  import fourLinkAge from '/@/coms/fourLinkAge/fourLinkAge.vue';
  import listModal from '../listManage/listModal.vue';
  //api接口
  import { tableZHColumns, tableZHForm, listApi } from './data';

  //========通用组件 start
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  const [registerModal, { openModal }] = useModal();

  //使用基础表格
  const [registerTable, { reload, getForm }] = useTable({
    useSearchForm: true,
    formConfig: tableZHForm,
    api: listApi,
    columns: tableZHColumns,
    actionColumn: {
      width: 200,
      title: '操作',
      dataIndex: 'action',
    },
    clickToRowSelect: false, //点击是否选中复选框
    showTableSetting: false, //显示表格设置工具
  });
  //========通用组件 end

  // 打开方法
  function actionType(record = {}, type = 'add') {
    openModal(true, { record, type });
  }
</script>
