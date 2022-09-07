<template>
  <BasicModal
    v-bind="$attrs"
    @register="menuModal"
    :title="getTitle"
    width="50%"
    :showOkBtn="!isDetail"
    @ok="handleSubmit"
  >
    <div v-show="isDetail">
      <Description size="middle" @register="menuDetail" :column="2" />
    </div>
    <div v-show="!isDetail">
      <BasicForm @register="menuForm" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema, detailSchema } from './menu.data';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Description, useDescription } from '/@/components/Description/index';
  import { getMenuDetail, getMenuList, submitMenu } from '/@/api/system/menu';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const isDetail = ref(true);

  //菜单详情
  const [menuDetail, { setDescProps }] = useDescription({
    schema: detailSchema,
  });

  //菜单表单
  const [menuForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { lg: 12, md: 24 },
  });

  //菜单弹窗
  const [menuModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    isUpdate.value = !!data?.isUpdate;
    isDetail.value = !!data?.isDetail;
    if (unref(isDetail)) {
      const menuData = await getMenuDetail({ id: data.record.id });
      setDescProps({
        data: menuData,
      });
    } else {
      //树菜单查询，用于选择上级菜单
      const treeData = await getMenuList();
      updateSchema({
        field: 'parentId',
        componentProps: { treeData },
      });
      //修改请求查询详情
      if (unref(isUpdate)) {
        const menuData = await getMenuDetail({ id: data.record.id });
        setFieldsValue({
          ...menuData,
        });
      }
      if (data.addChild) {
        setFieldsValue({
          parentId: data.record.id,
        });
      }
    }
    setModalProps({ confirmLoading: false });
  });

  const getTitle = computed(() => {
    if (unref(isUpdate)) {
      return '编辑菜单';
    } else if (unref(isDetail)) {
      return '菜单详情';
    } else {
      return '新增菜单';
    }
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // TODO 调用后端接口保存更新
      await submitMenu(values);
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
