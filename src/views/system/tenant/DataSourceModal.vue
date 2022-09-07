<template>
  <BasicModal v-bind="$attrs" @register="settingModal" title="租户授权配置" @ok="handleSubmit">
    <BasicForm @register="settingForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { dataSource, getTenantDetail } from '/@/api/system/tenant';
  import { getDataSourceSelect } from '/@/api/tool/datasource';

  const emit = defineEmits(['success', 'register']);
  const tenantId = ref();

  const [settingForm, { setFieldsValue, resetFields, validate }] = useForm({
    labelWidth: 90,
    schemas: [
      {
        field: 'datasourceId',
        label: '数据源',
        component: 'ApiSelect',
        componentProps: {
          placeholder: '请选择数据源',
          api: getDataSourceSelect,
          labelField: 'name',
          valueField: 'id',
        },
      },
    ],
    showActionButtonGroup: false,
    baseColProps: {
      span: 24,
    },
    actionColOptions: {
      span: 23,
    },
  });

  const [settingModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    tenantId.value = data.record.tenantId;
    const detailData = await getTenantDetail({ id: data.record.id });
    setFieldsValue({
      ...detailData,
    });
    setModalProps({ confirmLoading: false });
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      values.tenantId = tenantId.value;
      setModalProps({ confirmLoading: true });
      await dataSource(values);
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
