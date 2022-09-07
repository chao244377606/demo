<template>
  <BasicModal
    v-bind="$attrs"
    @register="clientModal"
    :title="getTitle"
    @ok="handleSubmit"
    :width="1200"
    :showOkBtn="!isDetail"
  >
    <div v-show="isDetail">
      <Description size="middle" @register="clientDetail" :column="2" />
    </div>
    <div v-show="!isDetail">
      <BasicForm @register="clientForm" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema, detailSchema } from './client.data';
  import { getClientDetail, submitClient } from '/@/api/system/client';
  import { Description, useDescription } from '/@/components/Description/index';
  const emit = defineEmits(['success', 'register']);

  const isDetail = ref(true);
  const isUpdate = ref(true);
  const rowId = ref('');
  //详情
  const [clientDetail, { setDescProps }] = useDescription({
    schema: detailSchema,
  });

  const [clientForm, { setFieldsValue, resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: {
      span: 12,
    },
    actionColOptions: {
      span: 23,
    },
  });

  const [clientModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    isUpdate.value = !!data?.isUpdate;
    isDetail.value = !!data?.isDetail;
    if (unref(isDetail)) {
      const detail = await getClientDetail({ id: data.record.id });
      setDescProps({
        data: detail,
      });
    } else {
      if (unref(isUpdate)) {
        rowId.value = data.record.id;
        const detailData = await getClientDetail({ id: data.record.id });
        setFieldsValue({
          ...detailData,
        });
      }
    }
    setModalProps({ confirmLoading: false });
  });

  const getTitle = computed(() => {
    if (unref(isUpdate)) {
      return '编辑应用';
    } else if (unref(isDetail)) {
      return '应用详情';
    } else {
      return '新增应用';
    }
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      values.authorizedGrantTypes = values.authorizedGrantTypes.join(',');
      setModalProps({ confirmLoading: true });
      if (unref(isUpdate)) {
        values.id = rowId.value;
      }
      await submitClient(values);
      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
