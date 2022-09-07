<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" v-auth="'dept_add'" @click="handleCreate">新增</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'tenantId'">
          {{ formatDictValue(record.tenantId) }}
        </template>
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'dept_view',
                label: '查看',
                color: 'success',
                icon: 'clarity:info-standard-line',
                onClick: handleView.bind(null, record),
              },
              {
                auth: 'dept_edit',
                label: '编辑',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                auth: 'dept_delete',
                label: '删除',
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  confirm: handleDelete.bind(null, record),
                },
              },
              {
                ifShow: () => {
                  return useUserStore().getUserInfo.role_name.includes('admin');
                },
                auth: 'dept_add',
                label: '新增子项',
                icon: 'clarity:plus-line',
                onClick: handleCreate.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <DeptModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup name="Dept">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getDeptList, removeDept } from '/@/api/system/dept';
  import { getTenantList } from '/@/api/system/system';

  import { useModal } from '/@/components/Modal';
  import DeptModal from './DeptModal.vue';
  import { useUserStore } from '/@/store/modules/user';

  import { columns, searchFormSchema } from './dept.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();

  //初始化字典
  let dictMap = new Map();
  const getTenant = async () => {
    let tenantList = await getTenantList();
    tenantList.forEach((val) => {
      dictMap.set(val.tenantId, val.tenantName);
    });
  };
  getTenant();
  function formatDictValue(tenantId) {
    return dictMap.get(tenantId + '');
  }

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getDeptList,
    columns,
    rowKey: 'id',
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    pagination: false,
    striped: false,
    useSearchForm: true,
    canResize: false,
    actionColumn: {
      width: 300,
      title: '操作',
      dataIndex: 'action',
    },
  });

  function handleCreate(record: Recordable) {
    openModal(true, {
      record: record,
      isDetail: false,
      isUpdate: false,
      addChild: record ? true : false,
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

  async function handleDelete(record: Recordable) {
    await removeDept({ ids: record.id });
    createMessage.success('操作成功');
    reload();
  }

  function handleSuccess() {
    //操作成功提示
    createMessage.success('操作成功');
    reload();
  }
</script>
