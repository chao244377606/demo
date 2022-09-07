<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    :title="'[' + menuName + ']接口权限配置'"
    width="1000px"
  >
    <BasicTable @register="apiConfigTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                label: '查看',
                color: 'success',
                icon: 'clarity:info-standard-line',
                onClick: handleView.bind(null, record),
              },
              {
                label: '编辑',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                label: '删除',
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <ApiscopeModal @register="registerModal" @success="handleSuccess" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { getApiScopeList, removeApiScope } from '../../../api/authority/scope';
  import { apiColumns, serchTableSchema } from './apiscope.data';
  import { useModal } from '/@/components/Modal';
  import ApiscopeModal from './ApiscopeModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  const menuName = ref('');
  const menuId = ref('');
  const { createMessage } = useMessage();
  const { success } = createMessage;
  const [registerModal, { openModal }] = useModal();
  const [apiConfigTable, { reload, setProps }] = useTable({
    api: getApiScopeList,
    columns: apiColumns,
    formConfig: {
      labelWidth: 120,
      schemas: serchTableSchema,
    },
    rowKey: 'id',
    immediate: false,
    striped: false,
    useSearchForm: true,
    canResize: false,
    actionColumn: {
      width: 200,
      title: '操作',
      dataIndex: 'action',
    },
  });
  const [registerDrawer, { setDrawerProps }] = useDrawerInner(async (data) => {
    setProps({
      searchInfo: { menuId: data.record.id },
    });
    menuName.value = data.record.name;
    menuId.value = data.record.id;
    reload();
    setDrawerProps({ confirmLoading: false });
  });
  function handleCreate() {
    openModal(true, {
      isUpdate: false,
      isDetail: false,
      menuId: menuId.value,
    });
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
      isDetail: false,
      menuId: menuId.value,
    });
  }

  function handleView(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: false,
      isDetail: true,
    });
  }

  async function handleDelete(record: Recordable) {
    await removeApiScope({ ids: record.id });
    success('操作成功');
    reload();
  }

  function handleSuccess() {
    //操作成功提示
    success('操作成功');
    reload();
  }
</script>
