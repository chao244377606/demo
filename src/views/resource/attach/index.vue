<template>
  <div>
    <BasicTable @register="registeTable">
      <template #toolbar>
        <a-button type="primary" v-auth="'attach_upload'" @click="handleCreate"> 上传 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'attach_delete',
                label: '删除',
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  confirm: handleDelete.bind(null, record),
                },
              },
              {
                auth: 'attach_download',
                label: '下载',
                icon: 'clarity:download-cloud-line',
                onClick: handleDownload.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <AttachModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup name="Attach">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getAttachList, removeAttach } from '/@/api/resource/attach';

  import { useModal } from '/@/components/Modal';
  import AttachModal from './AttachModal.vue';

  import { columns, searchFormSchema } from './attach.data';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const { success } = createMessage;
  const [registerModal, { openModal }] = useModal();
  const [registeTable, { reload, updateTableDataRecord }] = useTable({
    api: getAttachList,
    rowKey: 'id',
    columns,
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

  function handleDownload(record: Recordable) {
    window.open(`${record.link}`);
  }

  async function handleDelete(record: Recordable) {
    await removeAttach({ ids: record.id });
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
