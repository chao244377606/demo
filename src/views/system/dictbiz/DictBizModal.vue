<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :width="900"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <BasicForm @register="dictForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { dictFormSchema } from './dictbiz.data';
  import { getBizDictDetail, submitBizDict } from '/@/api/system/system';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const rowId = ref('');
  const parentId = ref('0');
  const parentCode = ref('');
  const parentName = ref('');
  //基础信息
  const [dictForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: dictFormSchema,
    showActionButtonGroup: false,
    baseColProps: {
      span: 12,
    },
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    parentId.value = '0';
    parentName.value = '';
    parentCode.value = '';
    isUpdate.value = !!data?.isUpdate;
    if (data.parentRecord) {
      parentId.value = data.parentRecord.id;
      parentName.value = data.parentRecord.dictValue;
      parentCode.value = data?.parentRecord.code;
    }
    if (unref(isUpdate)) {
      rowId.value = data.record.id;
      const dictData = await getBizDictDetail({ id: data.record.id });
      setFieldsValue({
        ...dictData,
      });
    } else {
      setFieldsValue({
        parentId: parentId.value,
        parentName: parentName.value,
        code: parentCode.value,
      });
    }
    setModalProps({ confirmLoading: false });
  });
  const getTitle = computed(() => (!unref(isUpdate) ? '新增字典' : '编辑字典'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (values.isSealed) {
        values.isSealed = 1;
      }
      if (!values.dictKey) {
        values.dictKey = '-1';
      }
      !unref(isUpdate)
        ? await submitBizDict({ ...values })
        : await submitBizDict({ ...values, id: rowId.value });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
