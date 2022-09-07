<template>
  <CollapseContainer title="流程部署">
    <BasicForm @register="registerForm" />
  </CollapseContainer>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './deploy.data';
  import { deployModel } from '/@/api/flow/flow';
  import { flowCategory } from '/@/utils/flow';
  import { CollapseContainer } from '/@/components/Container';

  export default defineComponent({
    name: 'Deploy',
    components: { BasicForm, CollapseContainer },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const rowId = ref('');

      const [registerForm, { resetFields, validate }] = useForm({
        labelWidth: 300,
        schemas: formSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
        baseColProps: {
          span: 13,
        },
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          await deployModel({
            tenantIds: values.tenantId ? values.tenantId.join(',') : '',
            modelId: rowId.value,
            category: flowCategory(values.categoryValue),
          });
          emit('success');
          resetFields();
        } finally {
          resetFields();
        }
      }

      return { registerForm, handleSubmit };
    },
  });
</script>
