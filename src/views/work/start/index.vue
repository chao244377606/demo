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
        <template v-if="column.dataIndex === 'category'">
          {{ record.categoryName }}
        </template>
        <template v-if="column.dataIndex === 'version'"> v{{ record.version }} </template>
        <template v-if="column.dataIndex === 'suspensionState'">
          {{ record.suspensionState === 1 ? '激活' : '挂起' }}
        </template>
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'work_start_flow',
                label: '发起',
                icon: 'clarity:note-edit-line',
                onClick: handleStart.bind(null, record),
              },
              {
                auth: 'work_start_image',
                label: '流程图',
                icon: 'ant-design:picture-filled',
                onClick: handleView.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <IframeModal @register="viewModal" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { startList } from '/@/api/work/work';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Radio } from 'ant-design-vue';

  import { useModal } from '/@/components/Modal';
  import IframeModal from '/@/views/flow/IframeModal.vue';
  import { useGo } from '/@/hooks/web/usePage';
  import { columns, searchFormSchema } from './start.data';
  import { flowRoute } from '/@/utils/flow';
  import { useFlowStore } from '/@/store/modules/dict';

  export default defineComponent({
    name: 'FlowManager',
    components: {
      BasicTable,
      TableAction,
      IframeModal,
      RadioGroup: Radio.Group,
      RadioButton: Radio.Button,
    },
    setup() {
      const mode = ref('1');
      const { createMessage } = useMessage();
      const go = useGo();
      const [viewModal, { openModal: openViewModal }] = useModal();

      const [registerTable, { reload }] = useTable({
        api: startList,
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

      function handleStart(record: Recordable) {
        go(
          `/work/process/${flowRoute(useFlowStore().getFlowRouter, record.category)}/form/${
            record.id
          }`,
        );
      }
      watch(mode, () => {
        reload({ searchInfo: { mode: mode.value } });
      });

      function handleView(record: Recordable) {
        openViewModal(true, {
          url: `/api/blade-flow/process/resource-view?processDefinitionId=${record.id}`,
        });
      }

      function handleSuccess() {
        createMessage.success('操作成功');
        reload();
      }

      return {
        mode,
        registerTable,
        handleStart,
        viewModal,
        handleView,
        handleSuccess,
      };
    },
  });
</script>
