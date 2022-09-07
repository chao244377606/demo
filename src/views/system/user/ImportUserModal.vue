<template>
  <BasicModal
    v-bind="$attrs"
    @register="importModal"
    title="用户导入"
    :canFullscreen="true"
    @ok="handleSubmit"
    :showOkBtn="false"
  >
    <BasicForm @register="importForm">
      <template #upload="{}">
        <UploadDragger
          v-model:fileList="fileList"
          name="file"
          :multiple="false"
          :customRequest="upload"
        >
          <p class="ant-upload-drag-icon">
            <inbox-outlined />
          </p>
          <p class="ant-upload-text">将文件拖拽到此处或点击上传</p>
        </UploadDragger>
      </template>
      <template #downLoad="{}">
        <a-button @click="handleTemplate" color="primary">点击下载</a-button>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';

  import { BasicForm, useForm } from '/@/components/Form/index';
  import { InboxOutlined } from '@ant-design/icons-vue';

  import { BasicModal, useModalInner } from '/@/components/Modal';
  import website from '/@/settings/website';
  import { useUserStore } from '/@/store/modules/user';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Upload } from 'ant-design-vue';
  import { importUser } from '/@/api/system/user';

  const UploadDragger = Upload.Dragger;

  const { createMessage } = useMessage();

  const emit = defineEmits(['success', 'register']);
  const fileList = ref([]);
  //权限弹窗
  const [importModal, { setModalProps, closeModal }] = useModalInner(async () => {
    resetFields();
    setModalProps({ confirmLoading: false, canFullscreen: true });
  });
  //基础表单信息
  const [importForm, { resetFields, getFieldsValue }] = useForm({
    labelWidth: 70,
    schemas: [
      {
        field: 'excelFile',
        label: '模板上传',
        component: 'Input',
        slot: 'upload',
      },
      {
        field: 'isCovered',
        label: '数据覆盖',
        component: 'Switch',
        componentProps: {
          checkedValue: 1,
          unCheckedValue: 0,
        },
        defaultValue: 0,
      },
      {
        label: '模板下载',
        field: 'excelTemplate',
        component: 'Input',
        slot: 'downLoad',
      },
    ],
    showActionButtonGroup: false,
    baseColProps: {
      span: 24,
    },
    actionColOptions: {
      span: 23,
    },
  });

  function handleTemplate() {
    window.open(
      `/api/blade-user/export-template?${website.tokenHeader}=${useUserStore().getToken}`,
    );
  }

  const upload = async (param) => {
    const values = getFieldsValue();
    await importUser({ file: param.file, isCovered: values.isCovered });
    createMessage.success('上传成功');
    closeModal();
    emit('success');
  };

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      // await submitUserGrant({ userIds: userIds.value, roleIds: roleSelect.value.join(',') });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
