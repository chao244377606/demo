<template>
  <BasicForm :disabled="isDetail" @register="userBasicForm" />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { jianKangForm } from './data';
  const emit = defineEmits(['ok']);
  let isDetail = ref(false);
  let addId = ref('');

  //表单信息
  const [userBasicForm, { getFieldsValue, setFieldsValue, validate, resetFields }] = useForm({
    labelWidth: 140,
    schemas: jianKangForm,
    showActionButtonGroup: false,
  });

  async function init(id, detail = false) {
    resetFields();
    isDetail.value = detail;
    addId.value = id;

    let res = await $fn.get('/health/base/healthInfo', { oldmanId: addId.value });
    if (res.success) {
      setFieldsValue({
        ...res.data,
      });
    } else {
      setFieldsValue({});
    }
  }
  async function handleSubmit() {
    await Promise.all([validate()]);
    $fn.store.setLoad(true);
    let form = getFieldsValue();
    let res = await $fn.post('/health/base/healthInfoAdd', {
      oldmanId: addId.value,
      ...form,
    });
    $fn.store.setLoad(false);
    if ($fn.ok(res, '保存成功')) {
      emit('ok');
    }
  }
  defineExpose({ init, handleSubmit });
</script>

<style lang="less" scoped></style>
