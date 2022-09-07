import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description/index';
export const columns: BasicColumn[] = [
  {
    title: '应用ID',
    dataIndex: 'clientId',
  },
  {
    title: '应用秘钥',
    dataIndex: 'clientSecret',
  },
  {
    title: '授权类型',
    dataIndex: 'authorizedGrantTypes',
  },
  {
    title: '授权范围',
    dataIndex: 'scope',
  },
  {
    title: '令牌秒数',
    dataIndex: 'accessTokenValidity',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'clientId',
    label: '应用ID',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'clientSecret',
    label: '租户名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'linkman',
    label: '联系人',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'clientId',
    label: '应用ID',
    component: 'Input',
    required: true,
  },
  {
    field: 'clientSecret',
    label: '应用秘钥',
    component: 'Input',
    required: true,
  },
  {
    field: 'authorizedGrantTypes',
    label: '授权类型',
    component: 'CheckboxGroup',
    componentProps: {
      options: [
        {
          label: 'refresh_token',
          value: 'refresh_token',
        },
        {
          label: 'password',
          value: 'password',
        },
        {
          label: 'authorization_code',
          value: 'authorization_code',
        },
        {
          label: 'captcha',
          value: 'captcha',
        },
        {
          label: 'social',
          value: 'social',
        },
      ],
    },
    defaultValue: ['refresh_token', 'password', 'authorization_code'],
    required: true,
  },
  {
    field: 'scope',
    label: '授权范围',
    component: 'Input',
    defaultValue: 'all',
    required: true,
  },
  {
    field: 'accessTokenValidity',
    label: '令牌秒数',
    component: 'InputNumber',
    defaultValue: 3600,
    required: true,
  },
  {
    field: 'refreshTokenValidity',
    label: '刷新秒数',
    component: 'InputNumber',
    defaultValue: 604800,
    required: true,
  },
  {
    field: 'webServerRedirectUri',
    label: '回调地址',
    component: 'Input',
    required: true,
  },
  {
    field: 'resourceIds',
    label: '资源集合',
    component: 'Input',
  },
  {
    field: 'authorities',
    label: '权限',
    component: 'Input',
  },
  {
    field: 'autoapprove',
    label: '自动授权',
    component: 'Input',
  },
  {
    field: 'additionalInformation',
    label: '附加说明',
    component: 'Input',
  },
];

export const detailSchema: DescItem[] = [
  {
    field: 'clientId',
    label: '应用ID',
  },
  {
    field: 'clientSecret',
    label: '应用秘钥',
  },

  {
    field: 'authorizedGrantTypes',
    label: '授权类型',
  },
  {
    field: 'scope',
    label: '授权范围',
  },
  {
    field: 'accessTokenValidity',
    label: '令牌秒数',
  },
  {
    field: 'refreshTokenValidity',
    label: '刷新秒数',
  },
  {
    field: 'webServerRedirectUri',
    label: '回调地址',
  },
  {
    field: 'resourceIds',
    label: '资源集合',
  },
  {
    field: 'authorities',
    label: '权限',
  },
  {
    field: 'autoapprove',
    label: '自动授权',
  },
  {
    field: 'additionalInformation',
    label: '附加说明',
  },
];
