<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'log_error_view',
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
    <ErrorLogModal @register="registerModal" />
  </div>
</template>
<script lang="ts" setup name="ErrorLog">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getErrorList } from '/@/api/monitor/log/log';

  import { useModal } from '/@/components/Modal';
  import ErrorLogModal from './ErrorLogModal.vue';

  import { columns, searchFormSchema } from './error.data';

  const [registerModal, { openModal }] = useModal();
  const [registerTable] = useTable({
    api: getErrorList,
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
