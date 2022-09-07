<template>
  <BasicModal
    v-bind="$attrs"
    @register="datasourceModal"
    :title="getTitle"
    @ok="handleSubmit"
    :showOkBtn="!isDetail"
    :width="900"
  >
    <div v-show="isDetail">
      <Description size="middle" @register="datasourceDetail" :column="1" />
    </div>
    <div v-show="!isDetail">
      <BasicForm @register="datasourceForm" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema, detailSchema } from './datasource.data';
  import { getDataSourceDetail, submitDataSource } from '/@/api/tool/datasource';
  import { Description, useDescription } from '/@/components/Description/index';

  const emit = defineEmits(['success', 'register']);

  const isDetail = ref(true);
  const isUpdate = ref(true);
  const rowId = ref('');
  //详情
  const [datasourceDetail, { setDescProps }] = useDescription({
    schema: detailSchema,
  });

  const [datasourceForm, { setFieldsValue, resetFields, validate }] = useForm({
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

  const [datasourceModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    isDetail.value = !!data?.isDetail;
    if (unref(isDetail)) {
      const detail = await getDataSourceDetail({ id: data.record.id });
      setDescProps({
        data: detail,
      });
    } else {
      if (unref(isUpdate)) {
        rowId.value = data.record.id;
        const detailData = await getDataSourceDetail({ id: data.record.id });
        setFieldsValue({
          ...detailData,
        });
      }
    }
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
      setModalProps({ confirmLoading: true });
      if (unref(isUpdate)) {
        values.id = rowId.value;
      }
      await submitDataSource(values);
      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
