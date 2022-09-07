<template>
  <BasicModal v-bind="$attrs" @register="paramModal" title="部署模型" @ok="handleSubmit">
    <BasicForm @register="paramForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './model.data';
  import { deployModel } from '/@/api/flow/flow';
  import { flowCategory } from '/@/utils/flow';

  export default defineComponent({
    name: 'PostModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const rowId = ref('');

      const [paramForm, { resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
        baseColProps: {
          span: 24,
        },
      });

      const [paramModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        rowId.value = data.record.id;
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          await deployModel({
            tenantIds: values.tenantId ? values.tenantId.join(',') : '',
            modelId: rowId.value,
            category: flowCategory(values.categoryValue),
          });
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { paramModal, paramForm, handleSubmit };
    },
  });
</script>
