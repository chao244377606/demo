<template>
  <BasicModal v-bind="$attrs" @register="paramModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="paramForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './param.data';
  import { getParamDetail, submitParam } from '/@/api/system/system';
  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');

  const [paramForm, { setFieldsValue, resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: {
      span: 24,
    },
    actionColOptions: {
      span: 23,
    },
  });

  const [paramModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      rowId.value = data.record.id;
      const param = await getParamDetail({ id: data.record.id });
      setFieldsValue({
        ...param,
      });
    }
    setModalProps({ confirmLoading: false });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增参数' : '编辑参数'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (unref(isUpdate)) {
        await submitParam({ ...values, id: rowId.value });
      } else {
        await submitParam({ ...values });
      }
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
