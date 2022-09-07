<template>
  <div>
    <BasicTable @register="postTable">
      <template #toolbar>
        <a-button type="primary" v-auth="'post_add'" @click="handleCreate"> 新增 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'tenantId'">
          {{ formatDictValue(record.tenantId) }}
        </template>
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
    <PostModal @register="postModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup name="Post">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getTenantList } from '/@/api/system/system';
  import { getPostPageList, removePost } from '/@/api/system/post';
  import { useModal } from '/@/components/Modal';
  import PostModal from './PostModal.vue';
  import { columns, searchFormSchema } from './post.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();

  let dictMap = new Map();
  const getDict = async () => {
    let tenantList = await getTenantList();
    tenantList.forEach((val) => {
      dictMap.set(val.tenantId, val.tenantName);
    });
  };
  getDict();
  function formatDictValue(tenantId) {
    return dictMap.get(tenantId + '');
  }
  const [postModal, { openModal }] = useModal();
  const [postTable, { reload, updateTableDataRecord }] = useTable({
    api: getPostPageList,
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
    await removePost({ ids: record.id });
    createMessage.success('操作成功');
    reload();
  }

  function handleSuccess({ isUpdate, values }) {
    //操作成功提示
    createMessage.success('操作成功');
    if (isUpdate) {
      // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
      updateTableDataRecord(values.id, values);
    } else {
      reload();
    }
  }
</script>
