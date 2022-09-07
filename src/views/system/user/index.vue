<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5">
      <template #toolbar>
        <a-button type="primary" v-auth="'user_add'" @click="handleCreate">新增</a-button>
        <a-button
          type="info"
          v-auth="'user_role'"
          @click="roleSet"
          preIcon="ant-design:user-outlined"
          >角色配置</a-button
        >
        <a-button
          type="info"
          v-auth="'user_reset'"
          @click="passwordReset"
          preIcon="ant-design:key-outlined"
          >密码重置</a-button
        >
        <a-button
          v-if="useUserStore().getUserInfo.role_name.includes('admin')"
          @click="handleLock"
          preIcon="ant-design:unlock-outlined"
          >账号解封</a-button
        >
        <a-button
          type="primary"
          v-if="useUserStore().getUserInfo.role_name.includes('admin')"
          @click="handleImportCreate"
          >导入</a-button
        >
        <a-button
          type="success"
          v-if="useUserStore().getUserInfo.role_name.includes('admin')"
          @click="handleExportCreate"
          >导出</a-button
        >
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'user_view',
                label: '查看',
                color: 'success',
                icon: 'clarity:info-standard-line',
                onClick: handleView.bind(null, record),
              },
              {
                auth: 'user_edit',
                label: '编辑',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                auth: 'user_delete',
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
    <AccountModal @register="registerModal" @success="handleSuccess" />
    <RoleSettingModal @register="roleSettingModal" @success="handleRoleSuccess" />
    <ImportUserModal @register="importUserModal" @success="handleRoleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup name="User">
  import { h } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getUserList, resetPassword, removeUser, unLockUser } from '/@/api/system/user';
  import { PageWrapper } from '/@/components/Page';
  import DeptTree from './DeptTree.vue';
  import { useUserStore } from '/@/store/modules/user';

  import { useModal } from '/@/components/Modal';
  import AccountModal from './AccountModal.vue';
  import RoleSettingModal from './RoleSettingModal.vue';
  import ImportUserModal from './ImportUserModal.vue';

  import { useMessage } from '/@/hooks/web/useMessage';
  import { columns, searchFormSchema } from './account.data';
  import website from '/@/settings/website';

  const { createMessage, createConfirm } = useMessage();
  const { success, error } = createMessage;
  const [registerModal, { openModal }] = useModal();
  const [roleSettingModal, { openModal: openRoleModal }] = useModal();
  const [importUserModal, { openModal: openImportModal }] = useModal();

  const [
    registerTable,
    {
      reload,
      setProps,
      updateTableDataRecord,
      getRowSelection,
      clearSelectedRowKeys,
      getSelectRows,
      getForm,
    },
  ] = useTable({
    title: '账号列表',
    api: getUserList,
    rowKey: 'id',
    columns,
    rowSelection: { type: 'checkbox' },
    clickToRowSelect: false,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    useSearchForm: true,
    actionColumn: {
      width: 240,
      title: '操作',
      dataIndex: 'action',
    },
  });

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
      isDetail: false,
    });
  }
  function handleImportCreate() {
    openImportModal(true, {});
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
      isDetail: false,
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
    await removeUser({ ids: record.id });
    success('操作成功');
    reload();
  }

  function handleSuccess({ isUpdate, values }) {
    //操作成功提示
    success('操作成功');
    if (isUpdate) {
      // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
      updateTableDataRecord(values.id, values);
    } else {
      reload();
    }
  }

  function handleRoleSuccess() {
    //操作成功提示
    success('操作成功');
    reload();
  }

  function handleSelect(deptId = '') {
    setProps({ searchInfo: { deptId } });
    reload();
  }

  function roleSet() {
    const ids = getRowSelection().selectedRowKeys;
    if (ids?.length == 0) {
      error('请至少选择一条数据');
      return;
    }
    openRoleModal(true, {
      records: getSelectRows(),
      recordIds: ids,
    });
  }

  function passwordReset() {
    const ids = getRowSelection().selectedRowKeys;
    if (ids == undefined || ids.length == 0) {
      error('请至少选择一条数据');
      return;
    }
    createConfirm({
      iconType: 'warning',
      title: () => h('span', '确认'),
      content: () => h('span', '确定将选择账号密码重置为123456?'),
      onOk: async () => {
        await resetPassword({ userIds: ids });
        clearSelectedRowKeys();
        success('操作成功');
      },
    });
  }

  function handleLock() {
    const ids = getRowSelection().selectedRowKeys;
    if (ids == undefined || ids.length == 0) {
      error('请至少选择一条数据');
      return;
    }
    createConfirm({
      iconType: 'warning',
      title: () => h('span', '确认'),
      content: () => h('span', '确定将选择账号解封?'),
      onOk: async () => {
        await unLockUser({ userIds: ids });
        clearSelectedRowKeys();
        success('操作成功');
      },
    });
  }

  //导出
  function handleExportCreate() {
    createConfirm({
      iconType: 'warning',
      title: () => h('span', '确认'),
      content: () => h('span', '是否导出用户数据?'),
      onOk: () => {
        const form = getForm().getFieldsValue();
        window.open(
          `/api/blade-user/export-user?${website.tokenHeader}=${useUserStore().getToken}&account=${
            form.account ? form.account : ''
          }&realName=${form.realName ? form.realName : ''}`,
        );
      },
    });
  }
</script>
