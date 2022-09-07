<template>
  <div>
    <BasicTable @register="noticeTable">
      <template #toolbar>
        <a-button type="primary" v-auth="'datasource_add'" @click="handleCreate"> 新增 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'category'">
          {{ formatDictValue(options['category'], record.category) }}
        </template>
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'notice_view',
                label: '查看',
                color: 'success',
                icon: 'clarity:info-standard-line',
                onClick: handleView.bind(null, record),
              },
              {
                auth: 'notice_edit',
                label: '编辑',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                auth: 'notice_delete',
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
    <NoticeModal @register="noticeModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup name="Notice">
  import { ref } from 'vue';
  import NoticeModal from './noticeModal.vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getnoticeList, removenotice } from '/@/api/desk/notice';
  import { useModal } from '/@/components/Modal';
  import { columns, searchFormSchema } from './notice.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { formatDictValue } from '/@/utils';
  import { getDictList } from '/@/api/system/system';

  const { createMessage } = useMessage();
  const { success } = createMessage;
  const [noticeModal, { openModal }] = useModal();

  //初始化字典
  let options = ref({});
  async function fetch() {
    options.value['category'] = await getDictList({ code: 'notice' });
  }
  fetch();

  const [noticeTable, { reload, updateTableDataRecord }] = useTable({
    api: getnoticeList,
    rowKey: 'id',
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      fieldMapToTime: [
        ['releaseTime', ['releaseTime_datege', 'releaseTime_datelt'], 'YYYY-MM-DD HH:mm:ss'],
      ],
      baseColProps: { xl: 12, xxl: 6 },
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
      add: true,
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
    await removenotice({ ids: record.id });
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
