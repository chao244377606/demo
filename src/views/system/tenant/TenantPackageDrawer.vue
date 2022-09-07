<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" :title="'租户产品包管理'" width="1000px">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
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
    <TenantPackageModal @register="registerModal" @success="handleSuccess" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { list, remove } from '/@/api/system/tenantpackage';
  import { useModal } from '/@/components/Modal';
  import TenantPackageModal from './TenantPackageModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  const menuName = ref('');
  const menuId = ref('');
  const { createMessage } = useMessage();
  const { success } = createMessage;
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload, setProps }] = useTable({
    api: list,
    columns: [
      {
        title: '产品包名',
        dataIndex: 'packageName',
      },
      {
        title: '备注',
        dataIndex: 'remark',
      },
    ],
    formConfig: {
      labelWidth: 80,
      schemas: [
        {
          field: 'packageName',
          label: '产品包名',
          component: 'Input',
          colProps: { span: 8 },
        },
      ],
    },
    rowKey: 'id',
    showIndexColumn: true,
    useSearchForm: true,
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
    });
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  async function handleDelete(record: Recordable) {
    await remove({ ids: record.id });
    success('操作成功');
    reload();
  }

  function handleSuccess() {
    //操作成功提示
    success('操作成功');
    reload();
  }
</script>
