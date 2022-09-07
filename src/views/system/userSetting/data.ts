import { FormSchema } from '/@/components/Form/index';

export interface ListItem {
  key: string;
  title: string;
  description: string;
  extra?: string;
  avatar?: string;
  color?: string;
}

// tab的list
export const settingList = [
  {
    key: '1',
    name: '个人信息',
    component: 'BaseSetting',
  },
  {
    key: '2',
    name: '修改密码',
    component: 'SecureSetting',
  },
];

// 基础设置 form
export const baseSetschemas: FormSchema[] = [
  {
    field: 'realName',
    component: 'Input',
    label: '姓名',
    colProps: { span: 18 },
  },
  {
    field: 'name',
    component: 'Input',
    label: '用户名',
    colProps: { span: 18 },
  },
  {
    field: 'phone',
    component: 'Input',
    label: '手机号',
    colProps: { span: 18 },
  },
  {
    field: 'email',
    component: 'Input',
    label: '邮箱',
    colProps: { span: 18 },
  },
];

// 安全设置 list
export const passwordSetting: FormSchema[] = [
  {
    field: 'oldPassword',
    component: 'InputPassword',
    label: '原密码',
    required: true,
    colProps: { span: 18 },
  },
  {
    field: 'newPassword',
    component: 'InputPassword',
    label: '新密码',
    required: true,
    colProps: { span: 18 },
  },
  {
    field: 'newPassword1',
    component: 'InputPassword',
    label: '确认密码',
    required: true,
    colProps: { span: 18 },
  },
];
