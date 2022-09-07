<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'suspensionState'">
          {{ record.suspensionState === 1 ? '激活' : '挂起' }}
        </template>
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
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
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { followList, deleteProcessInstance } from '/@/api/flow/flow';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { columns, searchFormSchema } from './follow.data';

  export default defineComponent({
    name: 'FlowFollow',
    components: { BasicTable, TableAction },
    setup() {
      const { createMessage } = useMessage();

      const [registerTable, { reload }] = useTable({
        api: followList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        actionColumn: {
          width: 160,
          title: '操作',
          dataIndex: 'action',
        },
      });

      async function handleDelete(record: Recordable) {
        await deleteProcessInstance({ processInstanceId: record.processInstanceId });
        //操作成功提示
        createMessage.success('操作成功');
        reload();
      }

      return {
        registerTable,
        handleDelete,
      };
    },
  });
</script>
