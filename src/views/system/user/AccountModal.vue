<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :width="900"
    :title="getTitle"
    @ok="handleSubmit"
    :showOkBtn="!isDetail"
  >
    <div v-show="isDetail">
      <Description size="middle" title="基础信息" @register="userBaseDetail" :column="2" />
      <Divider />
      <Description size="middle" title="详细信息" @register="userDetail" :column="2" />
      <Divider />
      <Description size="middle" title="职责信息" @register="userRoleDetail" :column="2" />
    </div>
    <div v-show="!isDetail">
      <BasicForm @register="userBasicForm" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { Divider } from 'ant-design-vue';
  import { Description, useDescription } from '/@/components/Description/index';
  import { formSchema, detailBaseSchema, detailSchema, detailRoleSchema } from './account.data';
  import { getUserDetail, updateUser, addUser } from '/@/api/system/user';
  import { getTenantList, getAllRoleList } from '/@/api/system/system';
  import { getDeptTree } from '/@/api/system/dept';
  import { getPostList } from '/@/api/system/post';
  import website from '/@/settings/website';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const isDetail = ref(true);
  const rowId = ref('');

  //详情信息
  const [userBaseDetail, { setDescProps: setBaseDetail }] = useDescription({
    schema: detailBaseSchema,
  });
  const [userDetail, { setDescProps }] = useDescription({
    schema: detailSchema,
  });
  const [userRoleDetail, { setDescProps: setRoleDetail }] = useDescription({
    schema: detailRoleSchema,
  });

  //表单信息
  const [userBasicForm, { setFieldsValue, updateSchema, validate, resetFields }] = useForm({
    labelWidth: 85,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: {
      span: 12,
    },
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: true, loading: true });
    isUpdate.value = !!data?.isUpdate;
    isDetail.value = !!data?.isDetail;
    //详情逻辑
    if (unref(isDetail)) {
      const userData = await getUserDetail({ id: data.record.id });
      setBaseDetail({
        data: userData,
      });
      setDescProps({
        data: userData,
      });
      setRoleDetail({
        data: userData,
      });
    } else {
      if (!website.tenantMode) {
        initTenant(website.tenantId);
        setFieldsValue({
          tenantId: website.tenantId,
        });
      } else {
        if (unref(isUpdate)) {
          initTenant(data.record.tenantId);
        }
        //租户下拉选择查询
        updateSchema({
          field: 'tenantId',
          componentProps: {
            api: getTenantList,
            labelField: 'tenantName',
            valueField: 'tenantId',
            onChange: async (e: any) => {
              initTenant(e);
            },
          },
        });
      }
      //修改查询用户详情
      if (unref(isUpdate)) {
        rowId.value = data.record.id;
        updateSchema([
          {
            field: 'password',
            show: false,
            required: false,
          },
          {
            field: 'password1',
            show: false,
            required: false,
          },
        ]);
        const userData = await getUserDetail({ id: data.record.id });
        if (userData.hasOwnProperty('deptId')) {
          const deptIdStr = userData.deptId as unknown as String;
          userData.deptId = deptIdStr.split(',');
        }
        if (userData.hasOwnProperty('roleId')) {
          const roleIdStr = userData.roleId as unknown as String;
          userData.roleId = roleIdStr.split(',');
        }
        if (userData.hasOwnProperty('postId')) {
          const postIdStr = userData.postId as unknown as String;
          userData.postId = postIdStr.split(',');
        }
        setFieldsValue({
          ...userData,
        });
      } else {
        updateSchema([
          {
            field: 'password',
            show: true,
            required: true,
          },
          {
            field: 'password1',
            show: true,
            required: true,
          },
        ]);
      }
    }
    setModalProps({ confirmLoading: false, loading: false });
  });

  //选中租户逻辑
  async function initTenant(tenantId) {
    const roleTree = await getAllRoleList({ tenantId });
    updateSchema([
      {
        field: 'roleId',
        componentProps: { treeData: roleTree },
      },
    ]);
    const deptTree = await getDeptTree({ tenantId });
    updateSchema([
      {
        field: 'deptId',
        componentProps: { treeData: deptTree },
      },
    ]);
    const postList = await getPostList({ tenantId });
    const postSelect: LabelValueOptions = [];
    postList.forEach((post) => postSelect.push({ label: post.postName, value: post.id }));
    updateSchema([
      {
        field: 'postId',
        componentProps: {
          options: postSelect,
          mode: 'multiple',
        },
      },
    ]);
  }

  const getTitle = computed(() => {
    if (unref(isUpdate)) {
      return '编辑用户';
    } else if (unref(isDetail)) {
      return '用户详情';
    } else {
      return '新增用户';
    }
  });

  async function handleSubmit() {
    try {
      const [values] = await Promise.all([validate()]);
      setModalProps({ confirmLoading: true });
      const allValues = Object.assign(values);
      allValues.roleId = allValues.roleId.join(',');
      allValues.deptId = allValues.deptId.join(',');
      allValues.postId = allValues.postId.join(',');
      if (unref(isUpdate)) {
        await updateUser({ ...allValues, id: rowId.value });
      } else {
        await addUser({ ...allValues });
      }
      closeModal();
      emit('success', {
        isUpdate: unref(isUpdate),
        values: { ...allValues, id: rowId.value },
      });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
