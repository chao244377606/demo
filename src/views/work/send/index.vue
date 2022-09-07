<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'processDefinitionVersion'">
          v{{ record.processDefinitionVersion }}
        </template>
        <template v-if="column.dataIndex === 'processIsFinished'">
          {{ record.processIsFinished === 'finished' ? '已完成' : '未完成' }}
        </template>
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'work_send_detail',
                label: '查看',
                color: 'success',
                icon: 'clarity:info-standard-line',
                onClick: handleDetail.bind(null, record),
              },
              {
                auth: 'work_send_follow',
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
  import { sendList } from '/@/api/work/work';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useModal } from '/@/components/Modal';
  import IframeModal from '/@/views/flow/IframeModal.vue';
  import { useGo } from '/@/hooks/web/usePage';

  import { columns, searchFormSchema } from './send.data';
  import { flowRoute } from '/@/utils/flow';
  import { useFlowStore } from '/@/store/modules/dict';

  export default defineComponent({
    name: 'FlowManager',
    components: {
      BasicTable,
      TableAction,
      IframeModal,
    },
    setup() {
      const go = useGo();

      const { createMessage } = useMessage();

      const [viewModal, { openModal: openViewModal }] = useModal();

      const [registerTable, { reload }] = useTable({
        api: sendList,
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
          url: `/api/blade-flow/process/diagram-view?processInstanceId=${record.processInstanceId}`,
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
        registerTable,
        viewModal,
        handleDetail,
        handleView,
        handleSuccess,
      };
    },
  });
</script>
