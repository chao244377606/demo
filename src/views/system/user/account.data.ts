import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getDictList } from '/@/api/system/system';
import { DescItem } from '/@/components/Description/index';
import { Tag } from 'ant-design-vue';
import { h } from 'vue';
import website from '/@/settings/website';

const sexOptions: LabelValueOptions = [
  {
    label: '男',
    value: 1,
  },
  {
    label: '女',
    value: 2,
  },
  {
    label: '未知',
    value: 3,
  },
];

export const columns: BasicColumn[] = [
  {
    title: '登录账号',
    dataIndex: 'account',
  },
  {
    title: '所属租户',
    dataIndex: 'tenantName',
    defaultHidden: !website.tenantMode,
    customRender: ({ record }) => {
      return h(Tag, { color: '#108ee9' }, () => record.tenantName);
    },
  },
  {
    title: '用户姓名',
    dataIndex: 'name',
  },
  {
    title: '所属角色',
    dataIndex: 'roleName',
    customRender: ({ record }) => {
      return h(Tag, { color: '#108ee9' }, () => record.roleName);
    },
  },
  {
    title: '所属部门',
    dataIndex: 'deptName',
    customRender: ({ record }) => {
      return h(Tag, { color: '#108ee9' }, () => record.deptName);
    },
  },
  {
    title: '用户平台',
    dataIndex: 'userTypeName',
    customRender: ({ record }) => {
      return h(Tag, { color: '#108ee9' }, () => record.userTypeName);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '登录账号',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'realName',
    label: '用户姓名',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '基础信息',
    field: 'Divider1',
    component: 'Divider',

    colProps: { span: 24 },
  },

  {
    field: 'tenantId',
    label: '所属租户',
    component: 'ApiSelect',
    required: true,
    show: website.tenantMode,
    colProps: { span: 24 },
    componentProps: {
      style: { width: '100%' },
    },
  },
  {
    field: 'account',
    label: '登录账号',
    component: 'Input',
    required: true,
  },
  {
    field: 'userType',
    label: '用户平台',
    component: 'ApiSelect',
    componentProps: {
      api: getDictList,
      params: { code: 'user_type' },
      labelField: 'dictValue',
      valueField: 'dictKey',
      stringToNumber: true,
    },
    required: true,
  },
  {
    label: '密码',
    field: 'password',
    component: 'Input',
    required: true,
  },

  {
    label: '确认密码',
    field: 'password1',
    component: 'Input',
    required: true,
  },

  {
    label: '详细信息',
    field: 'Divider2',
    component: 'Divider',
    colProps: { span: 24 },
  },

  {
    field: 'name',
    label: '用户昵称',
    component: 'Input',
    required: true,
  },
  {
    field: 'realName',
    label: '用户姓名',
    component: 'Input',
    required: true,
  },
  {
    field: 'phone',
    label: '手机号',
    component: 'Input',
  },
  {
    field: 'email',
    label: '电子邮箱',
    component: 'Input',
  },
  {
    field: 'sex',
    label: '用户性别',
    component: 'Select',
    componentProps: {
      options: sexOptions,
    },
  },
  {
    field: 'birthday',
    label: '用户生日',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      style: { width: '100%' },
    },
  },
  {
    field: 'statusName',
    label: '账号状态',
    component: 'Input',
    defaultValue: true,
    show: false,
  },

  {
    label: '职责信息',
    field: 'Divider3',
    component: 'Divider',
    colProps: { span: 24 },
  },

  {
    field: 'code',
    label: '用户编号',
    component: 'Input',
  },
  {
    label: '所属角色',
    field: 'roleId',
    component: 'TreeSelect',
    componentProps: {
      multiple: true,
      fieldNames: {
        title: 'title',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'deptId',
    label: '所属部门',
    component: 'TreeSelect',
    componentProps: {
      multiple: true,
      fieldNames: {
        title: 'title',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'postId',
    label: '所属岗位',
    component: 'Select',
    required: true,
  },
];

//详情数据
export const detailBaseSchema: DescItem[] = [
  {
    field: 'tenantName',
    label: '所属租户',
    span: 2,
  },
  {
    field: 'account',
    label: '登录账号',
  },

  {
    field: 'userTypeName',
    label: '用户平台',
  },
];

export const detailSchema: DescItem[] = [
  {
    field: 'name',
    label: '用户昵称',
  },
  {
    field: 'realName',
    label: '用户姓名',
  },

  {
    field: 'phone',
    label: '手机号码',
  },
  {
    field: 'email',
    label: '电子邮箱',
  },
  {
    field: 'sexName',
    label: '用户性别',
  },
  {
    field: 'birthday',
    label: '用户生日',
  },
];

export const detailRoleSchema: DescItem[] = [
  {
    field: 'code',
    label: '用户编号',
  },
  {
    field: 'roleName',
    label: '所属角色',
  },

  {
    field: 'deptName',
    label: '所属部门',
  },
  {
    field: 'postName',
    label: '所属岗位',
  },
];
