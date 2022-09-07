<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <RadioGroup v-model:value="mode" button-style="solid">
          <RadioButton value="1">通用流程</RadioButton>
          <RadioButton value="2">定制流程</RadioButton>
        </RadioGroup>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'tenantId'">
          {{ record.tenantId === '' ? '通用' : record.tenantId }}
        </template>
        <template v-if="column.dataIndex === 'version'"> v{{ record.version }} </template>
        <template v-if="column.dataIndex === 'suspensionState'">
          {{ record.suspensionState === 1 ? '激活' : '挂起' }}
        </template>
        <template v-if="column.dataIndex === 'category'">
          {{ record.categoryName }}
        </template>
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'flow_manager_state',
                label: '变更状态',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                auth: 'flow_manager_image',
                label: '流程图',
                icon: 'ant-design:picture-filled',
                onClick: handleView.bind(null, record),
              },
              {
                auth: 'flow_manager_remove',
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
    <ManagerModal @register="registerModal" @success="handleSuccess" />
    <IframeModal @register="viewModal" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { managerList, deleteDeployment } from '/@/api/flow/flow';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Radio } from 'ant-design-vue';

  import { useModal } from '/@/components/Modal';
  import ManagerModal from './ManagerModal.vue';
  import IframeModal from '../IframeModal.vue';

  import { columns, searchFormSchema } from './manager.data';

  export default defineComponent({
    name: 'FlowManager',
    components: {
      BasicTable,
      ManagerModal,
      TableAction,
      IframeModal,
      RadioGroup: Radio.Group,
      RadioButton: Radio.Button,
    },
    setup() {
      const mode = ref('1');
      const { createMessage } = useMessage();

      const [viewModal, { openModal: openViewModal }] = useModal();

      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        api: managerList,
        searchInfo: { mode: mode.value },
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
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
        });
      }
      watch(mode, () => {
        reload({ searchInfo: { mode: mode.value } });
      });

      function handleView(record: Recordable) {
        openViewModal(true, {
          url: `/api/blade-flow/process/resource-view?processDefinitionId=${record.id}`,
        });
      }
      async function handleDelete(record: Recordable) {
        await deleteDeployment({ ids: record.id });
        //操作成功提示
        createMessage.success('操作成功');
        reload();
      }

      function handleSuccess() {
        createMessage.success('操作成功');
        reload();
      }

      return {
        mode,
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        viewModal,
        handleView,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
