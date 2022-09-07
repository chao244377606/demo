<template>
  <BasicModal
    v-bind="$attrs"
    @register="postModal"
    :title="getTitle"
    :showOkBtn="!isDetail"
    @ok="handleSubmit"
  >
    <div v-show="isDetail">
      <Description size="middle" @register="postDetail" :column="1" />
    </div>
    <div v-show="!isDetail">
      <BasicForm @register="postForm" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema, detailSchema } from './tenant.data';
  import { getTenantDetail, submitTenant } from '/@/api/system/tenant';
  import { Description, useDescription } from '/@/components/Description/index';

  const emit = defineEmits(['success', 'register']);
  const isDetail = ref(true);
  const isUpdate = ref(true);
  const rowId = ref('');
  //详情
  const [postDetail, { setDescProps }] = useDescription({
    schema: detailSchema,
  });

  const [postForm, { setFieldsValue, resetFields, validate }] = useForm({
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

  const [postModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    isUpdate.value = !!data?.isUpdate;
    isDetail.value = !!data?.isDetail;
    if (unref(isDetail)) {
      const detail = await getTenantDetail({ id: data.record.id });
      setDescProps({
        data: detail,
      });
    } else {
      if (unref(isUpdate)) {
        rowId.value = data.record.id;
        const detailData = await getTenantDetail({ id: data.record.id });
        setFieldsValue({
          ...detailData,
        });
      }
    }
    setModalProps({ confirmLoading: false });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增岗位' : '编辑岗位'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (unref(isUpdate)) {
        values.id = rowId.value;
      }
      await submitTenant(values);
      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
