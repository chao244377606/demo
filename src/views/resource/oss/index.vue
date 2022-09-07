<template>
  <div>
    <BasicTable @register="registeTable">
      <template #toolbar>
        <a-button type="primary" v-auth="'oss_add'" @click="handleCreate"> 新增 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'status'">
          <Tag color="success">
            {{ record.statusName }}
          </Tag>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'oss_view',
                label: '查看',
                color: 'success',
                icon: 'clarity:info-standard-line',
                onClick: handleView.bind(null, record),
              },
              {
                auth: 'oss_edit',
                label: '编辑',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                auth: 'oss_delete',
                label: '删除',
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  confirm: handleDelete.bind(null, record),
                },
              },
              {
                label: '调试',
                icon: 'clarity:scissors-line',
                onClick: handleDebug.bind(null, record),
              },
              {
                auth: 'oss_enable',
                label: '启用',
                icon: 'ant-design:play-circle-outlined',
                popConfirm: {
                  title: '是否启用这条配置',
                  confirm: handleEnable.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <CodeModal @register="registerModal" @success="handleSuccess" />
    <DebuggerModal @register="debuggerModal" />
  </div>
</template>
<script lang="ts" setup name="Oss">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getOssList, removeOss, enableOss } from '/@/api/resource/oss';

  import { useModal } from '/@/components/Modal';
  import CodeModal from './CodeModal.vue';
  import DebuggerModal from './DebuggerModal.vue';
  import { Tag } from 'ant-design-vue';

  import { columns, searchFormSchema } from './oss.data';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const { success } = createMessage;
  const [registerModal, { openModal }] = useModal();
  const [debuggerModal, { openModal: openDebuggerModal }] = useModal();
  const [registeTable, { reload, updateTableDataRecord }] = useTable({
    api: getOssList,
    rowKey: 'id',
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    useSearchForm: true,
    actionColumn: {
      width: 400,
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
  function handleDebug(record: Recordable) {
    openDebuggerModal(true, {
      record,
    });
  }
  async function handleDelete(record: Recordable) {
    await removeOss({ ids: record.id });
    success('操作成功');
    reload();
  }
  async function handleEnable(record: Recordable) {
    await enableOss({ id: record.id });
    success('启用成功');
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
