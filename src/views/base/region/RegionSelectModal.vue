<template>
  <BasicModal v-bind="$attrs" @register="paramModal" title="调试" :show-ok-btn="false">
    <BasicForm @register="paramForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { select } from '/@/api/system/region';
  const [paramForm, { updateSchema, resetFields, setFieldsValue }] = useForm({
    labelWidth: 100,
    schemas: [
      {
        field: 'province',
        label: '省份',
        component: 'ApiSelect',
        componentProps: {
          api: select,
          labelField: 'name',
          valueField: 'code',
          stringToNumber: true,
          getPopupContainer: () => document.body,
          onChange: (e: any) => {
            setFieldsValue({ city: '', district: '' });
            updateSchema({
              field: 'city',
              componentProps: {
                params: { code: e },
              },
            });
          },
        },
      },
      {
        field: 'city',
        label: '地市',
        component: 'ApiSelect',
        componentProps: {
          api: select,
          labelField: 'name',
          valueField: 'code',
          stringToNumber: true,
          immediate: false,
          getPopupContainer: () => document.body,
          onChange: (e: any) => {
            setFieldsValue({ district: '' });
            updateSchema({
              field: 'district',
              componentProps: {
                params: { code: e },
              },
            });
          },
        },
      },
      {
        field: 'district',
        label: '区县',
        component: 'ApiSelect',
        componentProps: {
          api: select,
          labelField: 'name',
          valueField: 'code',
          stringToNumber: true,
          immediate: false,
          getPopupContainer: () => document.body,
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

  const [paramModal, { setModalProps }] = useModalInner(async () => {
    console.log('多少是');
    resetFields();
    setModalProps({ confirmLoading: false });
  });
</script>
