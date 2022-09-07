<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="title"
    @ok="handleSubmit"
    :showOkBtn="!isDetail"
  >
    <BasicForm :disabled="isDetail" @register="userBasicForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './cs.data';

  const emit = defineEmits(['ok']);

  let isDetail = ref(false);
  let title = ref('新增');

  //表单信息
  const [userBasicForm, { setFieldsValue, validate, resetFields }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    //打开逻辑 s
    isDetail.value = false;
    title.value = (data && data.title) || '新增';
    if (data) {
      let type = data.type || 'add';
      if (type === 'edit' || type === 'show') {
        title.value = data.title || '编辑';
        if (type === 'show') {
          title.value = data.title || '查看';
          isDetail.value = true;
        }
        getData(data.record);
      } else {
        setFieldsValue({ ...data.record });
      }
    }
  });
  function getData(record) {
    setModalProps({ confirmLoading: true, loading: true });

    setFieldsValue({
      ...record,
    });

    setModalProps({ confirmLoading: false, loading: false });
  }

  async function handleSubmit() {
    const [values] = await Promise.all([validate()]);
    // setModalProps({ confirmLoading: true });
    // const allValues = Object.assign(values);

    closeModal();
    emit('ok');
  }
</script>
