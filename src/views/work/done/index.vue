<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'processDefinitionVersion'">
          v{{ record.processDefinitionVersion }}
        </template>
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'work_done_detail',
                label: '查看',
                color: 'success',
                icon: 'clarity:info-standard-line',
                onClick: handleDetail.bind(null, record),
              },
              {
                auth: 'work_done_follow',
                label: '跟踪',
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
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { doneList } from '/@/api/work/work';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useModal } from '/@/components/Modal';
  import IframeModal from '/@/views/flow/IframeModal.vue';
  import { useGo } from '/@/hooks/web/usePage';
  import { flowRoute } from '/@/utils/flow';
  import { useFlowStore } from '/@/store/modules/dict';
  import { columns, searchFormSchema } from './done.data';

  export default defineComponent({
    name: 'FlowManager',
    components: {
      BasicTable,
      TableAction,
      IframeModal,
    },
    setup() {
      const { createMessage } = useMessage();
      const go = useGo();

      const [viewModal, { openModal: openViewModal }] = useModal();

      const [registerTable, { reload }] = useTable({
        api: doneList,
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

      function handleView(record: Recordable) {
        openViewModal(true, {
          url: `/api/blade-flow/process/resource-view?processDefinitionId=${record.processInstanceId}`,
        });
      }
      function handleDetail(record: Recordable) {
        go(
          `/work/process/${flowRoute(useFlowStore().getFlowRouter, record.category)}/detail/${
            record.processInstanceId
          }/${record.businessId}`,
        );
      }
      function handleSuccess() {
        createMessage.success('操作成功');
        reload();
      }

      return {
        handleDetail,
        registerTable,
        viewModal,
        handleView,
        handleSuccess,
      };
    },
  });
</script>
