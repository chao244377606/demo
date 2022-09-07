<template>
  <div class="">
    <BasicTable @register="registerTable">
      <!-- 操作栏-工具栏 -->
      <template #toolbar>
        <a-button v-if="!isDetail" type="primary" @click="actionType()">新增</a-button>
      </template>
      <!-- 操作列渲染 -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '查看',
                onClick: actionType.bind(null, record, 'show'),
              },
              {
                label: '修改',
                disabled: isDetail,
                onClick: actionType.bind(null, record, 'edit'),
              },
              {
                label: '删除',
                disabled: isDetail,
                onClick: handleDelete.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>

    <jiashuModal @register="registerModal" @ok="handelOk" />
  </div>
</template>

<script setup lang="ts">
  import jiashuModal from './jiashuModal.vue';
  //api接口
  import { jiashuTableColumns } from './data';
  import { listApi } from './api';

  //========通用组件 start
  import { ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  const [registerModal, { openModal }] = useModal();

  // const emit = defineEmits(['ok']);
  let isDetail = ref(false);
  let addId = ref('');

  //使用基础表格

  const [registerTable, { reload }] = useTable({
    // useSearchForm: true,
    // formConfig: tableForm,
    api: listApi,
    canResize: false,
    immediate: false,
    beforeFetch: (params) => {
      params.oldmanId = addId.value;
      return params;
    },
    pagination: false,
    columns: jiashuTableColumns,
    actionColumn: {
      width: 200,
      title: '操作',
      dataIndex: 'action',
    },
    clickToRowSelect: false, //点击是否选中复选框
    showTableSetting: false, //显示表格设置工具
  });
  //========通用组件 end

  function handelOk() {
    reload();
  }
  // 打开方法
  function actionType(record = {}, type = 'add') {
    (record as any).oldmanId = addId.value;
    openModal(true, { record, type });
  }
  async function handleDelete(record) {
    if (!(await $fn.modal.open('是否确定删除'))) return;
    let res = await $fn.post('health/base/familyInfoDelete', { id: record.id });
    if ($fn.ok(res, '删除成功')) {
      reload();
    }
  }

  async function init(id, detail = false) {
    isDetail.value = detail;
    addId.value = id;

    reload();
  }
  defineExpose({ init });
</script>

<style lang="less" scoped></style>
