<template>
  <div>
    <BasicTable @register="tenantTable">
      <template #toolbar>
        <a-button type="primary" v-auth="'post_add'" @click="handleCreate"> 新增 </a-button>
        <a-button
          v-if="useUserStore().getUserInfo.role_name.includes('administrator')"
          preIcon="ant-design:tool-outlined"
          @click="handleSetting"
        >
          授权配置
        </a-button>
        <a-button
          v-if="useUserStore().getUserInfo.role_name.includes('administrator')"
          preIcon="ant-design:setting-outlined"
          @click="handleDatasource"
        >
          数据源配置
        </a-button>
        <a-button
          v-if="useUserStore().getUserInfo.role_name.includes('administrator')"
          preIcon="ant-design:usb-outlined"
          @click="handlePackage"
        >
          产品包配置
        </a-button>
        <a-button
          v-if="useUserStore().getUserInfo.role_name.includes('administrator')"
          preIcon="ant-design:appstore-add-outlined"
          @click="handlePackageSetting"
        >
          产品包管理
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'post_view',
                label: '查看',
                color: 'success',
                icon: 'clarity:info-standard-line',
                onClick: handleView.bind(null, record),
              },
              {
                auth: 'post_edit',
                label: '编辑',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                auth: 'post_delete',
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
    <TenantModal @register="tenantModal" @success="handleSuccess" />
    <SettingModal @register="settingModal" @success="handleSuccess" />
    <DataSourceModal @register="dataModal" @success="handleSuccess" />
    <TenantPackageSettingModal @register="packageModal" @success="handleSuccess" />
    <TenantPackageDrawer @register="registerDrawer" />
  </div>
</template>
<script lang="ts" setup name="Tenant">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getTenantPageList, removeTenant } from '/@/api/system/tenant';
  import { useUserStore } from '/@/store/modules/user';
  import { useDrawer } from '/@/components/Drawer';

  import { useModal } from '/@/components/Modal';
  import TenantModal from './TenantModal.vue';
  import SettingModal from './SettingModal.vue';
  import DataSourceModal from './DataSourceModal.vue';
  import TenantPackageDrawer from './TenantPackageDrawer.vue';
  import TenantPackageSettingModal from './TenantPackageSettingModal.vue';

  import { columns, searchFormSchema } from './tenant.data';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { createMessage } = useMessage();

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [tenantModal, { openModal }] = useModal();
  const [settingModal, { openModal: openSettingModal }] = useModal();
  const [packageModal, { openModal: openPackageModal }] = useModal();
  const [dataModal, { openModal: openDataModal }] = useModal();

  const [tenantTable, { reload, getRowSelection, getSelectRows }] = useTable({
    api: getTenantPageList,
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
      width: 250,
      title: '操作',
      dataIndex: 'action',
    },
  });

  function handleCreate() {
    openModal(true, {
      isDetail: false,
      isUpdate: false,
    });
  }

  function handleView(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: false,
      isDetail: true,
    });
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isDetail: false,
      isUpdate: true,
    });
  }

  function handleSetting() {
    const ids = getRowSelection().selectedRowKeys;
    if (ids?.length == 0) {
      createMessage.error('请至少选择一条数据');
      return;
    }
    openSettingModal(true, {
      ids,
    });
  }

  function handleDatasource() {
    const rows = getSelectRows();
    if (rows?.length == 0) {
      createMessage.error('请至少选择一条数据');
      return;
    }
    if (rows?.length > 1) {
      createMessage.error('只能选择一条数据');
      return;
    }
    openDataModal(true, {
      record: rows[0],
    });
  }

  function handlePackage() {
    const rows = getSelectRows();
    if (rows?.length == 0) {
      createMessage.error('请至少选择一条数据');
      return;
    }
    if (rows?.length > 1) {
      createMessage.error('只能选择一条数据');
      return;
    }
    openPackageModal(true, {
      record: rows[0],
    });
  }

  function handlePackageSetting() {
    openDrawer(true);
  }

  async function handleDelete(record: Recordable) {
    await removeTenant({ ids: record.id });
    createMessage.success('操作成功');
    reload();
  }

  function handleSuccess() {
    //操作成功提示
    createMessage.success('操作成功');
    reload();
  }
</script>
