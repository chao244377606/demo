<template>
  <div>
    <BasicTable @register="datasourceTable">
      <template #toolbar>
        <a-button type="primary" v-auth="'datasource_add'" @click="handleCreate"> 新增 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'datasource_view',
                label: '查看',
                color: 'success',
                icon: 'clarity:info-standard-line',
                onClick: handleView.bind(null, record),
              },
              {
                auth: 'datasource_edit',
                label: '编辑',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                auth: 'datasource_delete',
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
    <DataSourceModal @register="datasourceModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup name="Datasource">
  import DataSourceModal from './DatasourceModal.vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getDataSourceList, removeDataSource } from '/@/api/tool/datasource';
  import { useModal } from '/@/components/Modal';
  import { columns } from './datasource.data';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const { success } = createMessage;
  const [datasourceModal, { openModal }] = useModal();
  const [datasourceTable, { reload, updateTableDataRecord }] = useTable({
    api: getDataSourceList,
    rowKey: 'id',
    columns,
    formConfig: {
      labelWidth: 120,
    },
    useSearchForm: false,
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
  async function handleDelete(record: Recordable) {
    await removeDataSource({ ids: record.id });
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
</script>
