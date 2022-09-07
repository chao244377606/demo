<template>
  <BasicModal v-bind="$attrs" @register="settingModal" title="租户授权配置" @ok="handleSubmit">
    <BasicForm @register="settingForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { settingTenant, getTenantDetail } from '/@/api/system/tenant';

  const emit = defineEmits(['success', 'register']);
  const rowIds = ref();

  const [settingForm, { setFieldsValue, resetFields, validate }] = useForm({
    labelWidth: 90,
    schemas: [
      {
        field: 'accountNumber',
        label: '账号额度',
        component: 'InputNumber',
        componentProps: {
          style: { width: '100%' },
        },
        defaultValue: -1,
      },
      {
        field: 'expireTime',
        label: '过期时间',
        component: 'DatePicker',
        componentProps: {
          valueFormat: 'YYYY-MM-DD HH:mm:ss',
          showTime: true,
          style: { width: '100%' },
        },
      },
    ],
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
    baseColProps: {
      span: 24,
    },
  });

  const [settingModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    rowIds.value = data.ids.join(',');
    if (data.ids.length == 1) {
      const detailData = await getTenantDetail({ id: data.ids[0] });
      setFieldsValue({
        ...detailData,
      });
    }
    setModalProps({ confirmLoading: false });
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      values.ids = rowIds.value;
      if (!values.expireTime) {
        values.expireTime = '';
      }
      setModalProps({ confirmLoading: true });
      await settingTenant(values);
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
