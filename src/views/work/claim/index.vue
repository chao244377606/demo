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
                auth: 'work_claim_sign',
                label: '签收',
                icon: 'clarity:note-edit-line',
                onClick: handleClaim.bind(null, record),
              },
              {
                auth: 'work_claim_detail',
                label: '查看',
                color: 'success',
                icon: 'clarity:info-standard-line',
                onClick: handleDetail.bind(null, record),
              },
              {
                auth: 'work_claim_follow',
                label: '跟踪',
                icon: 'ant-design:picture-filled',
                onClick: handleImage.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <IframeModal @register="viewModal" />
  </div>
</template>
<script lang="ts" setup name="Claim">
  import { h } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { claimList, claimTask } from '/@/api/work/work';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useModal } from '/@/components/Modal';
  import IframeModal from '/@/views/flow/IframeModal.vue';

  import { columns, searchFormSchema } from './claim.data';
  import { useGo } from '/@/hooks/web/usePage';
  import { flowRoute } from '/@/utils/flow';
  import { useFlowStore } from '/@/store/modules/dict';
  const { createMessage, createConfirm } = useMessage();

  const [viewModal, { openModal: openViewModal }] = useModal();
  const go = useGo();

  const [registerTable, { reload }] = useTable({
    api: claimList,
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

  function handleClaim(record: Recordable) {
    createConfirm({
      iconType: 'warning',
      title: () => h('span', '提醒'),
      content: () => h('span', '确定签收此任务?'),
      onOk: async () => {
        await claimTask({ taskId: record.taskId });
        createMessage.success('操作成功');
        reload();
      },
    });
  }

  function handleDetail(record: Recordable) {
    go(
      `/work/process/${flowRoute(useFlowStore().getFlowRouter, record.category)}/detail/${
        record.processInstanceId
      }/${record.businessId}`,
    );
  }

  function handleImage(record: Recordable) {
    openViewModal(true, {
      url: `/api/blade-flow/process/diagram-view?processInstanceId=${record.processInstanceId}`,
    });
  }
</script>
