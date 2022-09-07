<template>
  <BasicModal v-bind="$attrs" @register="paramModal" title="用户信息选择" @ok="handleSubmit">
    <BasicForm @register="paramForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { getDeptSelect } from '/@/api/system/dept';
  import { getRoleSelect } from '/@/api/authority/role';
  const emit = defineEmits(['success', 'register']);

  const deptId = ref('');
  const roleId = ref('');
  const userId = ref('');
  const [paramForm, { updateSchema, resetFields, getFieldsValue, validate }] = useForm({
    labelWidth: 100,
    baseColProps: {
      span: 24,
    },
    schemas: [
      {
        field: 'deptId',
        label: '选择部门',
        component: 'ApiSelect',
        required: true,
        componentProps: {
          api: getDeptSelect,
          labelField: 'deptName',
          style: { width: '100%' },
          valueField: 'id',
          immediate: false,
        },
      },
      {
        field: 'roleId',
        label: '选择角色',
        component: 'ApiSelect',
        required: true,
        componentProps: {
          api: getRoleSelect,
          labelField: 'roleName',
          style: { width: '100%' },
          valueField: 'id',
          immediate: false,
        },
      },
    ],
    showActionButtonGroup: false,
  });

  const [paramModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    userId.value = data.user_id;
    deptId.value = data.dept_id;
    roleId.value = data.role_id;
    updateSchema([
      {
        field: 'deptId',
        label: '选择部门',
        component: 'ApiSelect',
        required: true,
        componentProps: {
          api: getDeptSelect,
          style: { width: '100%' },
          params: { userId: userId.value },
          labelField: 'deptName',
          valueField: 'id',
        },
      },
      {
        field: 'roleId',
        label: '选择角色',
        component: 'ApiSelect',
        required: true,
        componentProps: {
          api: getRoleSelect,
          style: { width: '100%' },
          params: { userId: userId.value },
          labelField: 'roleName',
          valueField: 'id',
        },
      },
    ]);
    setModalProps({ confirmLoading: false });
  });

  async function handleSubmit() {
    try {
      await validate();
      const form = getFieldsValue();
      deptId.value = form.deptId;
      roleId.value = form.roleId;
      setModalProps({ confirmLoading: true });
      closeModal();
      emit('success', { values: { roleId: roleId.value, deptId: deptId.value } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
