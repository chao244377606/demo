<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
        <a-button
          type="info"
          v-if="useUserStore().getUserInfo.role_name.includes('admin')"
          @click="scopeSet"
          >权限设置</a-button
        >
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
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
    <RoleSettingModal @register="registerModal" @success="settingSuccess" />
  </div>
</template>
<script lang="ts" setup name="Role">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getRoleListByPage } from '/@/api/system/system';

  import { useDrawer } from '/@/components/Drawer';
  import RoleDrawer from './RoleDrawer.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import RoleSettingModal from './RoleSettingModal.vue';
  import { useModal } from '/@/components/Modal';
  import { remove } from '/@/api/authority/role';
  import { useUserStore } from '/@/store/modules/user';

  import { columns, searchFormSchema } from './role.data';

  const { createMessage } = useMessage();
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload, getRowSelection }] = useTable({
    api: getRoleListByPage,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    rowSelection: { type: 'radio' },
    rowKey: 'id',
    useSearchForm: true,
    pagination: false,
    actionColumn: {
      width: 160,
      title: '操作',
      dataIndex: 'action',
    },
  });

  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  async function handleDelete(record: Recordable) {
    await remove({ ids: record.id });
    createMessage.success('操作成功');
    reload();
  }

  function handleSuccess() {
    createMessage.success('操作成功');
    reload();
  }

  function settingSuccess() {
    createMessage.success('操作成功');
    reload();
  }
  function scopeSet() {
    const id = getRowSelection().selectedRowKeys;
    if (id?.length == 0) {
      createMessage.error('请至少选择一条数据');
      return;
    }
    openModal(true, {
      id,
    });
  }
</script>
