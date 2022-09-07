<template>
  <div>
    <BasicTable @register="paramTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增参数 </a-button>
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
    <ParamModal @register="paramModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup name="Param">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getParamPageList, removeParam } from '/@/api/system/system';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useModal } from '/@/components/Modal';
  import ParamModal from './ParamModal.vue';

  import { columns, searchFormSchema } from './param.data';

  const { createMessage } = useMessage();

  const [paramModal, { openModal }] = useModal();
  const [paramTable, { reload }] = useTable({
    api: getParamPageList,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    useSearchForm: true,
    actionColumn: {
      width: 160,
      title: '操作',
      dataIndex: 'action',
    },
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
    await removeParam({ ids: record.id });
    //操作成功提示
    createMessage.success('操作成功');
    reload();
  }

  function handleSuccess() {
    createMessage.success('操作成功');
    reload();
  }
</script>
