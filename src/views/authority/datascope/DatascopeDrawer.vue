<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    :title="'[' + menuName + ']接口权限配置'"
    width="1000px"
  >
    <BasicTable @register="dataConfigTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                label: '查看',
                color: 'success',
                icon: 'clarity:info-standard-line',
                onClick: handleView.bind(null, record),
              },
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
    <DatascopeModal @register="registerModal" @success="handleSuccess" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { getDataScopeList, removeDataScope } from '../../../api/authority/scope';
  import { apiColumns, serchTableSchema } from './datascope.data';
  import { useModal } from '/@/components/Modal';
  import DatascopeModal from './DatascopeModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  export default defineComponent({
    name: 'ApiscopeDrawer',
    components: { BasicDrawer, BasicTable, TableAction, DatascopeModal },
    emits: ['register'],
    setup(_) {
      const menuName = ref('');
      const menuId = ref('');
      const code = ref('');
      const { createMessage } = useMessage();
      const { success } = createMessage;
      const [registerModal, { openModal }] = useModal();
      const [dataConfigTable, { reload, setProps }] = useTable({
        api: getDataScopeList,
        columns: apiColumns,
        formConfig: {
          labelWidth: 120,
          schemas: serchTableSchema,
        },
        rowKey: 'id',
        immediate: false,
        striped: false,
        useSearchForm: true,
        canResize: false,
        actionColumn: {
          width: 200,
          title: '操作',
          dataIndex: 'action',
        },
      });
      const [registerDrawer, { setDrawerProps }] = useDrawerInner(async (data) => {
        setProps({
          searchInfo: { menuId: data.record.id },
        });
        menuName.value = data.record.name;
        menuId.value = data.record.id;
        code.value = data.record.code;
        reload();
        setDrawerProps({ confirmLoading: false });
      });
      function handleCreate() {
        openModal(true, {
          isUpdate: false,
          isDetail: false,
          menuId: menuId.value,
          code: code.value,
          menuName: menuName.value,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
          isDetail: false,
          menuId: menuId.value,
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
        await removeDataScope({ ids: record.id });
        success('操作成功');
        reload();
      }

      function handleSuccess() {
        //操作成功提示
        success('操作成功');
        reload();
      }

      return {
        registerDrawer,
        registerModal,
        dataConfigTable,
        handleCreate,
        handleEdit,
        handleView,
        handleDelete,
        handleSuccess,
        menuName,
      };
    },
  });
</script>
