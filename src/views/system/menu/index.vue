<template>
  <div>
    <BasicTable @register="menuTable">
      <template #toolbar>
        <a-button type="primary" v-auth="'menu_add'" @click="handleCreate"> 新增菜单 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'menu_view',
                label: '查看',
                color: 'success',
                icon: 'clarity:info-standard-line',
                onClick: handleView.bind(null, record),
              },
              {
                auth: 'menu_edit',
                label: '编辑',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                auth: 'menu_delete',
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
                label: '新增子项',
                icon: 'clarity:plus-line',
                onClick: handleCreate.bind(null, record, true),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <MenuModal @register="menuModel" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup name="Menu">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getLazyList, removeMenu } from '/@/api/system/menu';

  import { useModal } from '/@/components/Modal';
  import MenuModal from './MenuModal.vue';
  import { useUserStore } from '/@/store/modules/user';

  import { columns, searchFormSchema } from './menu.data';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const { success } = createMessage;
  const [menuModel, { openModal }] = useModal();
  const [menuTable, { reload }] = useTable({
    title: '菜单列表',
    api: getLazyList,
    columns,
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
      record,
      isDetail: false,
      isUpdate: false,
      addChild: record ? true : false,
    });
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
    await removeMenu({ ids: record.id });
    success('操作成功');
    reload();
  }

  function handleSuccess() {
    reload();
  }
</script>
