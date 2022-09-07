<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    :showOkBtn="!isDetail"
    @ok="handleSubmit"
  >
    <div v-show="isDetail">
      <Description size="middle" @register="deptDetail" :column="1" />
    </div>
    <div v-show="!isDetail">
      <BasicForm @register="deptForm" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema, detailSchema } from './dept.data';
  import { Description, useDescription } from '/@/components/Description/index';
  import { getDeptList, getDeptDetail, updateDept } from '/@/api/system/dept';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const isDetail = ref(true);
  const rowId = ref('');
  //详情
  const [deptDetail, { setDescProps }] = useDescription({
    schema: detailSchema,
  });

  const [deptForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 100,
    baseColProps: {
      span: 24,
    },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    isUpdate.value = !!data?.isUpdate;
    isDetail.value = !!data?.isDetail;
    if (unref(isDetail)) {
      const detail = await getDeptDetail({ id: data.record.id });
      setDescProps({
        data: detail,
      });
    } else {
      let treeData = await getDeptList();
      if (unref(isUpdate)) {
        const deptDetail = await getDeptDetail({ id: data.record.id });
        rowId.value = data.record.id;
        setFieldsValue({
          ...deptDetail,
        });
        treeData.unshift({
          deptName: '顶级',
          id: '0',
        });
      }
      if (data.addChild) {
        setFieldsValue({
          parentId: data.record.id,
        });
      }

      updateSchema({
        field: 'parentId',
        componentProps: { treeData },
      });
    }
    setModalProps({ confirmLoading: false });
  });

  const getTitle = computed(() => {
    if (unref(isUpdate)) {
      return '编辑机构';
    } else if (unref(isDetail)) {
      return '机构详情';
    } else {
      return '新增机构';
    }
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (unref(isUpdate)) {
        values.id = rowId.value;
      }
      await updateDept(values);
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
