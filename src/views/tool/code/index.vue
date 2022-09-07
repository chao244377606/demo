<template>
  <div>
    <BasicTable @register="codeTable">
      <template #toolbar>
        <a-button
          type="primary"
          v-auth="'code_add'"
          @click="handleCreate"
          preIcon="ant-design:plus-outlined"
        >
          新增
        </a-button>
        <a-button type="success" @click="handleGenCode" preIcon="ant-design:rocket-outlined">
          生成
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'datasourceId'">
          {{ formatIdName(options['source'], record.datasourceId) }}
        </template>
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'code_view',
                label: '查看',
                color: 'success',
                icon: 'clarity:info-standard-line',
                onClick: handleView.bind(null, record),
              },
              {
                auth: 'code_edit',
                label: '编辑',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                auth: 'code_edit',
                label: '字段配置',
                icon: 'clarity:note-edit-line',
                onClick: handleColumnEdit.bind(null, record),
              },
              {
                auth: 'code_view',
                label: '代码预览',
                color: 'success',
                icon: 'clarity:info-standard-line',
                onClick: handleCodeView.bind(null, record),
              },
              {
                auth: 'code_delete',
                label: '删除',
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  confirm: handleDelete.bind(null, record),
                },
              },
              {
                auth: 'code_edit',
                label: '复制',
                icon: 'ant-design:copy-outlined',
                popConfirm: {
                  title: '是否确认复制',
                  confirm: handleCopy.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <CodeModal @register="codeModal" @success="handleSuccess" />
    <CodeViewDrawer @register="codeViewDrawer" />
    <CodeSettingDrawer @register="codeSettingDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup name="Code">
  import { ref } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getCodeList, removeCode, genCode, copyCode } from '/@/api/tool/code';
  import { formatIdName } from '/@/utils';
  import { getDataSourceSelect } from '/@/api/tool/datasource';
  import { useDrawer } from '/@/components/Drawer';

  import { useModal } from '/@/components/Modal';
  import CodeModal from './CodeModal.vue';
  import CodeSettingDrawer from './CodeSettingDrawer.vue';
  import CodeViewDrawer from './CodeViewDrawer.vue';

  import { columns, searchFormSchema } from './code.data';
  import { useMessage } from '/@/hooks/web/useMessage';

  let options = ref({});
  async function fetch() {
    options.value['source'] = await getDataSourceSelect();
  }
  fetch();
  const { createMessage } = useMessage();
  const [codeModal, { openModal }] = useModal();
  const [codeViewDrawer, { openDrawer }] = useDrawer();
  const [codeSettingDrawer, { openDrawer: openSettingDrawer }] = useDrawer();

  const [codeTable, { reload, getRowSelection }] = useTable({
    api: getCodeList,
    rowKey: 'id',
    columns,
    clickToRowSelect: false,
    rowSelection: { type: 'checkbox' },
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    useSearchForm: true,
    actionColumn: {
      width: 500,
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

  async function handleGenCode() {
    const ids = getRowSelection().selectedRowKeys;
    if (ids?.length == 0) {
      createMessage.error('请至少选择一条数据');
      return;
    }
    await genCode({ ids: ids, system: 'lemon' });
    createMessage.success('生成成功');
  }

  function handleView(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: false,
      isDetail: true,
    });
  }
  function handleCodeView(record: Recordable) {
    openDrawer(true, {
      record,
    });
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isDetail: false,
      isUpdate: true,
    });
  }

  function handleColumnEdit(record: Recordable) {
    // openColumnModal(true, {
    //   record,
    // });
    openSettingDrawer(true, {
      record,
    });
  }
  async function handleDelete(record: Recordable) {
    await removeCode({ ids: record.id });
    createMessage.success('操作成功');
    reload();
  }

  async function handleCopy(record: Recordable) {
    await copyCode({ id: record.id });
    createMessage.success('操作成功');
    reload();
  }

  function handleSuccess() {
    //操作成功提示
    createMessage.success('操作成功');
    reload();
  }
</script>
