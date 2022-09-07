<template>
  <div>
    <BasicTable @register="registeTable">
      <template #toolbar>
        <a-button type="primary" v-auth="'flow_model_create'" @click="handleCreate">
          创建
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'flow_model_update',
                label: '配置',
                icon: 'ant-design:setting-outlined',
                onClick: handleUpdate.bind(null, record),
              },
              {
                auth: 'flow_model_deploy',
                label: '部署',
                icon: 'ant-design:rocket-outlined',
                onClick: handleDeploy.bind(null, record),
              },
              {
                auth: 'flow_model_download',
                label: '下载',
                icon: 'clarity:download-cloud-line',
                onClick: handleDownload.bind(null, record),
              },
              {
                auth: 'flow_model_delete',
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
    <IframeModal @register="registerModal" @success="handleSuccess" />
    <DeployModal @register="deployModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { modelList, removeModel } from '/@/api/flow/flow';

  import { useModal } from '/@/components/Modal';
  import IframeModal from '../IframeModal.vue';
  import DeployModal from './DeployModal.vue';

  import { columns, searchFormSchema } from './model.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import website from '/@/settings/website';

  export default defineComponent({
    name: 'FlowModel',
    components: { BasicTable, IframeModal, TableAction, DeployModal },
    setup() {
      const { createMessage } = useMessage();
      const { success } = createMessage;
      const [registerModal, { openModal }] = useModal();
      const [deployModal, { openModal: openDeployModal }] = useModal();

      const [registeTable, { reload }] = useTable({
        api: modelList,
        rowKey: 'id',
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

      function handleCreate() {
        openModal(true, {
          url: website.flowDesignUrl + `/index.html`,
        });
      }

      function handleUpdate(record: Recordable) {
        openModal(true, {
          url: website.flowDesignUrl + `/index.html#/editor/${record.id}`,
        });
      }

      function handleDeploy(record: Recordable) {
        openDeployModal(true, {
          record,
        });
      }

      function handleDownload(record: Recordable) {
        window.open(website.flowDesignUrl + `/app/rest/models/${record.id}/bpmn20`);
      }

      async function handleDelete(record: Recordable) {
        await removeModel({ ids: record.id });
        success('操作成功');
        reload();
      }

      function handleSuccess() {
        //操作成功提示
        success('操作成功');
        reload();
      }

      return {
        registeTable,
        registerModal,
        deployModal,
        handleCreate,
        handleDeploy,
        handleDownload,
        handleDelete,
        handleSuccess,
        handleUpdate,
      };
    },
  });
</script>
