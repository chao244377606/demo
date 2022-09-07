<template>
  <BasicModal
    v-bind="$attrs"
    @register="codeModal"
    :title="getTitle"
    @ok="handleSubmit"
    :width="1200"
  >
    <div v-show="isDetail">
      <Description size="middle" @register="codeDetail" :column="2" />
    </div>
    <div v-show="!isDetail">
      <BasicForm @register="codeForm" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema, detailSchema } from './code.data';
  import { getCodeDetail, submitCode } from '/@/api/tool/code';
  import { Description, useDescription } from '/@/components/Description/index';

  const emit = defineEmits(['success', 'register']);
  const isDetail = ref(true);
  const isUpdate = ref(true);
  const rowId = ref('');
  //详情
  const [codeDetail, { setDescProps }] = useDescription({
    schema: detailSchema,
  });

  const [codeForm, { setFieldsValue, resetFields, validate }] = useForm({
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

  const [codeModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    isDetail.value = !!data?.isDetail;
    if (unref(isDetail)) {
      const detail = await getCodeDetail({ id: data.record.id });
      setModalProps({ showOkBtn: false });
      setDescProps({
        data: detail,
      });
    } else {
      if (unref(isUpdate)) {
        rowId.value = data.record.id;
        setModalProps({ showOkBtn: true });
        const detailData = await getCodeDetail({ id: data.record.id });
        setFieldsValue({
          ...detailData,
        });
      }
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (unref(isUpdate)) {
        values.id = rowId.value;
      }
      await submitCode(values);
      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
