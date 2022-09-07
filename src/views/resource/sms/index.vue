<template>
  <div>
    <BasicTable @register="registeTable">
      <template #toolbar>
        <a-button type="primary" v-auth="'sms_add'" @click="handleCreate"> 新增 </a-button>
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
                auth: 'sms_view',
                label: '查看',
                color: 'success',
                icon: 'clarity:info-standard-line',
                onClick: handleView.bind(null, record),
              },
              {
                auth: 'sms_edit',
                label: '编辑',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                auth: 'sms_delete',
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
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <SmsModal @register="registerModal" @success="handleSuccess" />
    <DebuggerModal @register="debuggerModal" />
  </div>
</template>
<script lang="ts" setup name="Sms">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getSmsList, removeSms } from '/@/api/resource/sms';
  import { useModal } from '/@/components/Modal';
  import SmsModal from './SmsModal.vue';
  import DebuggerModal from './DebuggerModal.vue';
  import { columns, searchFormSchema } from './sms.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Tag } from 'ant-design-vue';

  const { createMessage } = useMessage();
  const { success } = createMessage;
  const [registerModal, { openModal }] = useModal();
  const [debuggerModal, { openModal: openDebuggerModal }] = useModal();
  const [registeTable, { reload, updateTableDataRecord }] = useTable({
    api: getSmsList,
    rowKey: 'id',
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    useSearchForm: true,
    actionColumn: {
      width: 300,
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
    await removeSms({ ids: record.id });
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
