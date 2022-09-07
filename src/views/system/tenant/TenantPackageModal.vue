<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { detail, submit } from '/@/api/system/tenantpackage';
  import { getMenuList } from '/@/api/system/menu';
  import { TreeSelect } from 'ant-design-vue';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const rowId = ref('');

  const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: [
      {
        field: 'packageName',
        label: '产品包名',
        component: 'Input',
        required: true,
      },
      {
        field: 'menuId',
        label: '菜单列表',
        component: 'ApiTreeSelect',
        componentProps: {
          api: getMenuList,
          treeCheckable: true,
          showCheckedStrategy: TreeSelect.SHOW_ALL,
          getPopupContainer: () => document.body,
        },
        required: true,
      },
      {
        field: 'remark',
        label: '备注',
        component: 'InputTextArea',
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
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      rowId.value = data.record.id;
      const detailData = await detail({ id: data.record.id });
      detailData.menuId = detailData.menuId.split(',');
      setFieldsValue({
        ...detailData,
      });
    }
    setModalProps({ confirmLoading: false });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (unref(isUpdate)) {
        values.id = rowId.value;
      }
      values.menuId = values.menuId.join(',');
      await submit(values);
      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
