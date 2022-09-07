<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'log_api_view',
                label: '查看',
                color: 'success',
                icon: 'clarity:info-standard-line',
                onClick: handleView.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <ApiLogModal @register="registerModal" />
  </div>
</template>
<script lang="ts" setup name="ApiLog">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getApiList } from '/@/api/monitor/log/log';

  import { useModal } from '/@/components/Modal';
  import ApiLogModal from './ApiLogModal.vue';

  import { columns, searchFormSchema } from './api.data';
  const [registerModal, { openModal }] = useModal();
  const [registerTable] = useTable({
    api: getApiList,
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

  function handleView(record: Recordable) {
    openModal(true, {
      record,
    });
  }
</script>
