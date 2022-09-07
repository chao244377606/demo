<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
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
              {
                ifShow: () => {
                  return useUserStore().getUserInfo.role_name.includes('admin');
                },
                label: '设计',
                icon: 'clarity:note-edit-line',
                onClick: handleDesign.bind(null, record),
              },
              {
                ifShow: () => {
                  return useUserStore().getUserInfo.role_name.includes('admin');
                },
                label: '预览',
                icon: 'clarity:info-standard-line',
                color: 'success',
                onClick: handleView.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup name="reportList">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { list, remove } from '/@/api/report/report';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';

  import website from '/@/settings/website';
  import { columns, searchFormSchema } from './report.data';

  const { createMessage } = useMessage();

  const [registerTable, { reload }] = useTable({
    api: list,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    useSearchForm: true,
    actionColumn: {
      width: 300,
      title: '操作',
      dataIndex: 'action',
    },
  });

  async function handleDelete(record: Recordable) {
    await remove({ ids: record.id });
    //操作成功提示
    createMessage.success('操作成功');
    reload();
  }

  async function handleDesign(record: Recordable) {
    // const iframeRouter = addIframeRouter('designer-' + record.name);
    // iframeRouter.meta.frameSrc = `${website.reportUrl}/designer?_u=blade-${record.name}`;
    // tabStore.addTab(iframeRouter as unknown as RouteLocationNormalized);
    window.open(`${website.reportUrl}/designer?_u=blade-${record.name}`);
  }

  async function handleView(record: Recordable) {
    // const iframeRouter = addIframeRouter('preview-' + record.name);
    // iframeRouter.meta.frameSrc = `${website.reportUrl}/preview?_u=blade-${record.name}`;
    // tabStore.addTab(iframeRouter as unknown as RouteLocationNormalized);
    window.open(`${website.reportUrl}/preview?_u=blade-${record.name}`);
  }
  // const IFrame = () => import('/@/views/sys/iframe/FrameBlank.vue');

  // function addIframeRouter(name) {
  //   const dashboard: AppRouteModule = {
  //     path: '/' + name,
  //     name: name,
  //     code: name,
  //     isOpen: false,
  //     component: IFrame,
  //     meta: {
  //       title: name,
  //     },
  //   };
  //   return dashboard;
  // }
</script>
