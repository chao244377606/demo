<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="租户产品包配置" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { detail } from '/@/api/system/tenantpackage';
  import { packageSelect } from '/@/api/system/tenantpackage';
  import { TreeSelect } from 'ant-design-vue';
  import { getMenuList } from '/@/api/system/menu';
  import { getTenantPackageDetail, submitTenantSetting } from '/@/api/system/tenant';

  const emit = defineEmits(['success', 'register']);
  const tenantId = ref('');

  const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: [
      {
        field: 'packageId',
        label: '产品包',
        component: 'ApiSelect',
        componentProps: {
          api: packageSelect,
          labelField: 'packageName',
          valueField: 'id',
          getPopupContainer: () => document.body,
          onChange: async (e: any) => {
            const detailData = await detail({ id: e });
            setFieldsValue({ menuId: detailData.menuId.split(',') });
          },
        },
        required: true,
      },
      {
        field: 'menuId',
        label: '菜单预览',
        component: 'ApiTreeSelect',
        componentProps: {
          api: getMenuList,
          treeCheckable: true,
          showCheckedStrategy: TreeSelect.SHOW_ALL,
          getPopupContainer: () => document.body,
        },
        required: true,
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

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    tenantId.value = data.record.tenantId;
    const detailData = await getTenantPackageDetail({ tenantId: data.record.id });
    if (detailData.menuId) {
      detailData.packageId = detailData.id;
      detailData.menuId = detailData.menuId.split(',');
    }
    setFieldsValue({
      ...detailData,
    });
    setModalProps({ confirmLoading: false });
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      values.menuId = values.menuId.join(',');
      values.tenantId = tenantId.value;
      await submitTenantSetting(values);
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
