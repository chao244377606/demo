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
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { FormSchema } from '/@/components/Table';
  import { smsSend } from '/@/api/resource/sms';

  const schemas: FormSchema[] = [
    {
      field: 'code',
      component: 'Input',
      label: '资源编号',
    },
    {
      field: 'phones',
      component: 'Input',
      label: '发送手机',
    },
    {
      field: 'params',
      component: 'Input',
      label: '发送参数',
    },
  ];
  export default defineComponent({
    name: 'DebuggerModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_) {
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
        await smsSend(values);
      }

      return {
        registerModal,
        registerForm,
        handleSubmit,
      };
    },
  });
</script>
