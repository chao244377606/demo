<template>
  <div>
    <BasicTable @register="menuTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                label: '权限配置',
                icon: 'clarity:settings-line',
                onClick: handleEdit.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <ApiscopeDrawer @register="registerDrawer" />
  </div>
</template>
<script lang="ts" setup name="Apiscope">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getLazyMenuList } from '/@/api/system/menu';

  import { useDrawer } from '/@/components/Drawer';
  import ApiscopeDrawer from './ApiscopeDrawer.vue';

  import { columns, searchFormSchema } from './apiscope.data';

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [menuTable] = useTable({
    api: getLazyMenuList,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    pagination: false,
    striped: false,
    useSearchForm: true,
    canResize: false,
    actionColumn: {
      width: 200,
      title: '操作',
      dataIndex: 'action',
    },
  });

  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }
</script>
