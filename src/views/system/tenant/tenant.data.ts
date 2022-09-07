import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description/index';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
export const columns: BasicColumn[] = [
  {
    title: '租户ID',
    dataIndex: 'tenantId',
  },
  {
    title: '租户名称',
    dataIndex: 'tenantName',
  },
  {
    title: '联系人',
    dataIndex: 'linkman',
  },
  {
    title: '联系电话',
    dataIndex: 'contactNumber',
  },
  {
    title: '账号额度',
    dataIndex: 'accountNumber',
    customRender: ({ record }) => {
      let accountNumber = record.accountNumber;
      if (!(record.accountNumber > 0)) {
        accountNumber = '不限制';
      }
      return h(Tag, { color: 'blue' }, () => accountNumber);
    },
  },
  {
    title: '过期时间',
    dataIndex: 'expireTime',
    customRender: ({ record }) => {
      let expireTime = record.expireTime;
      if (!record.expireTime) {
        expireTime = '不限制';
      }
      return h(Tag, { color: 'blue' }, () => expireTime);
    },
  },
  {
    title: '绑定域名',
    dataIndex: 'domain',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'tenantId',
    label: '租户ID',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'tenantName',
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
    field: 'tenantName',
    label: '租户名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'linkman',
    label: '联系人',
    component: 'Input',
    required: true,
  },
  {
    field: 'contactNumber',
    label: '联系电话',
    component: 'Input',
  },
  {
    field: 'address',
    label: '联系地址',
    component: 'Input',
  },
  {
    field: 'domain',
    label: '绑定域名',
    component: 'Input',
  },
];

export const detailSchema: DescItem[] = [
  {
    field: 'tenantId',
    label: '租户ID',
  },
  {
    field: 'tenantName',
    label: '租户名称',
  },
  {
    field: 'linkman',
    label: '联系人',
  },
  {
    field: 'contactNumber',
    label: '联系电话',
  },
  {
    field: 'address',
    label: '联系地址',
  },
  {
    field: 'accountNumber',
    label: '账号额度',
  },
  {
    field: 'expireTime',
    label: '过期时间',
  },
  {
    field: 'domain',
    label: '绑定域名',
  },
];
