<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="调试上传"
    @ok="handleSubmit"
    :width="900"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { FormSchema } from '/@/components/Table';
  import { uploadAttach } from '/@/api/resource/attach';
  import { useMessage } from '/@/hooks/web/useMessage';

  const schemas: FormSchema[] = [
    {
      field: 'backgroundUrl',
      component: 'Upload',
      label: '上传附件',
      rules: [{ required: true, message: '请选择上传文件' }],
      componentProps: () => {
        return {
          api: uploadAttach,
          multiple: false,
        };
      },
    },
  ];
  const { createMessage } = useMessage();
  const { success } = createMessage;
  const [registerForm, { setFieldsValue, resetFields, getFieldsValue }] = useForm({
    labelWidth: 100,
    schemas: schemas,
    showActionButtonGroup: false,
    baseColProps: {
      span: 24,
    },
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    setFieldsValue({
      code: data.record.ossCode,
    });
  });

  async function handleSubmit() {
    const values = getFieldsValue();
    success('获取到图片地址【' + values.backgroundUrl[0] + '】');
  }
</script>
