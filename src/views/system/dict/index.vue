<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <BasicTable @register="dictTable" @row-click="rowClick" class="w-2/4 xl:w-3/5">
      <template #toolbar>
        <a-button type="primary" v-auth="'dict_add'" @click="handleCreate">新增</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'dict_edit',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                auth: 'dict_delete',
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
    <BasicTable @register="dictChildrenTable" class="w-2/4 xl:w-3/5">
      <template #toolbar>
        <a-button type="primary" v-auth="'dict_add'" @click="handleChildrenCreate()">新增</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'dict_edit',
                icon: 'clarity:note-edit-line',
                label: '编辑',
                onClick: handleEdit.bind(null, record),
              },
              {
                auth: 'dict_delete',
                icon: 'ant-design:delete-outlined',
                color: 'error',
                label: '删除',
                popConfirm: {
                  title: '是否确认删除',
                  confirm: handleChidrenDelete.bind(null, record),
                },
              },
              {
                auth: 'dict_add',
                icon: 'clarity:plus-line',
                label: '新增子项',
                onClick: handleChildrenAdd.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <DictModal @register="dictModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup name="Dict">
  import { ref } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getDictParentPage, getDictChildrenPage, removeDict } from '/@/api/system/system';
  import { PageWrapper } from '/@/components/Page';

  import { useModal } from '/@/components/Modal';
  import DictModal from './DictModal.vue';

  import { columns, searchFormSchema } from './dict.data';
  import { useMessage } from '/@/hooks/web/useMessage';

  const parentRecord = ref({});
  const { createMessage } = useMessage();
  const { success } = createMessage;
  const [dictModal, { openModal }] = useModal();
  const [dictTable, { reload }] = useTable({
    title: '字典列表',
    api: getDictParentPage,
    rowKey: 'id',
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    useSearchForm: true,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
    },
  });

  const [dictChildrenTable, { setProps, reload: childrenReload }] = useTable({
    title: '[]字典详情',
    api: getDictChildrenPage,
    rowKey: 'id',
    searchInfo: { parentId: -1 },
    immediate: false,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    pagination: false,
    useSearchForm: true,
    actionColumn: {
      width: 300,
      title: '操作',
      dataIndex: 'action',
    },
  });

  function rowClick(record) {
    parentRecord.value = record;
    setProps({
      title: '[' + record.dictValue + ']字典详情',
      searchInfo: { parentId: record.id },
    });
    childrenReload();
  }

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }
  function handleChildrenCreate() {
    openModal(true, {
      parentRecord: parentRecord.value,
      isUpdate: false,
    });
  }
  function handleChildrenAdd(record: Recordable) {
    openModal(true, {
      parentRecord: record,
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
    await removeDict({ ids: record.id });
    success('操作成功');
    reload();
  }

  function handleSuccess() {
    //操作成功提示
    success('操作成功');
    reload();
    childrenReload();
  }

  async function handleChidrenDelete(record: Recordable) {
    await removeDict({ ids: record.id });
    success('操作成功');
    childrenReload();
  }
</script>
