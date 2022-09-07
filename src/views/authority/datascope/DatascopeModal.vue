<template>
  <BasicModal
    v-bind="$attrs"
    @register="dataScopeModal"
    :title="getTitle"
    :width="800"
    :showOkBtn="!isDetail"
    @ok="handleSubmit"
  >
    <div v-show="isDetail">
      <Description size="middle" @register="dataScopeDetail" :column="2" />
    </div>
    <div v-show="!isDetail">
      <BasicForm @register="dataScopeForm" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema, detailSchema } from './datascope.data';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Description, useDescription } from '/@/components/Description/index';
  import { getDataScopeDetail, submitDataScope } from '/@/api/authority/scope';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const isDetail = ref(true);
  const rowId = ref('');
  const menuId = ref('');
  //权限详情
  const [dataScopeDetail, { setDescProps }] = useDescription({
    schema: detailSchema,
  });

  //权限表单
  const [dataScopeForm, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: {
      span: 12,
    },
    actionColOptions: {
      span: 23,
    },
  });

  //权限弹窗
  const [dataScopeModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    isDetail.value = !!data?.isDetail;
    menuId.value = data?.menuId;
    if (unref(isDetail)) {
      const dataScopeData = await getDataScopeDetail({ id: data.record.id });
      setDescProps({
        data: dataScopeData,
      });
    } else {
      resetFields();
      //修改请求查询详情
      if (unref(isUpdate)) {
        rowId.value = data.record.id;
        const dataScopeData = await getDataScopeDetail({ id: data.record.id });
        setFieldsValue({
          ...dataScopeData,
        });
      } else {
        setFieldsValue({
          resourceCode: data.code,
          scopeName: data.menuName + '[暂无]',
          scopeField: '*',
        });
      }
      updateSchema({
        field: 'scopeType',
        componentProps: {
          onChange: (e: any, option) => {
            console.log(option);
            let scopeColumn = '';
            if (e === 1) {
              scopeColumn = '-';
            } else if (e === 2) {
              scopeColumn = 'create_user';
            } else if (e === 3) {
              scopeColumn = 'create_dept';
            } else if (e === 4) {
              scopeColumn = 'create_dept';
            }
            setFieldsValue({
              scopeName: data.menuName + '[' + option.label + ']',
              scopeColumn,
            });
          },
        },
        required: true,
      });
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
      await submitDataScope(values);
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
