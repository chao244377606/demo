<template>
  <BasicModal
    v-bind="$attrs"
    @register="apiScopeModal"
    :title="getTitle"
    width="50%"
    :showOkBtn="!isDetail"
    @ok="handleSubmit"
  >
    <div v-show="isDetail">
      <Description size="middle" @register="apiScopeDetail" :column="2" />
    </div>
    <div v-show="!isDetail">
      <BasicForm @register="apiScopeForm" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema, detailSchema } from './apiscope.data';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Description, useDescription } from '/@/components/Description/index';
  import { getApiScopeDetail, submitApiScope } from '/@/api/authority/scope';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const isDetail = ref(true);
  const rowId = ref('');
  const menuId = ref('');
  //权限详情
  const [apiScopeDetail, { setDescProps }] = useDescription({
    schema: detailSchema,
  });

  //权限表单
  const [apiScopeForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { lg: 12, md: 24 },
  });

  //权限弹窗
  const [apiScopeModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    isDetail.value = !!data?.isDetail;
    menuId.value = data?.menuId;
    if (unref(isDetail)) {
      const apiScopeData = await getApiScopeDetail({ id: data.record.id });
      setDescProps({
        data: apiScopeData,
      });
    } else {
      resetFields();
      //修改请求查询详情
      if (unref(isUpdate)) {
        rowId.value = data.record.id;
        const apiScopeData = await getApiScopeDetail({ id: data.record.id });
        setFieldsValue({
          ...apiScopeData,
        });
      }
    }
  });

  const getTitle = computed(() => {
    if (unref(isUpdate)) {
      return '编辑权限';
    } else if (unref(isDetail)) {
      return '权限详情';
    } else {
      return '新增权限';
    }
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      values.menuId = menuId.value;
      if (unref(isUpdate)) {
        values.id = rowId.value;
      }
      await submitApiScope(values);
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
