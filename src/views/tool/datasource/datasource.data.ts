import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description/index';
export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '驱动类',
    dataIndex: 'driverClass',
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '链接地址',
    dataIndex: 'url',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'driverClass',
    label: '驱动类',
    component: 'Input',
    required: true,
  },
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    required: true,
  },
  {
    field: 'password',
    label: '密码',
    component: 'Input',
    required: true,
  },
  {
    field: 'url',
    label: '链接地址',
    component: 'Input',
    required: true,
  },
  {
    field: 'remark',
    label: '备注',
    component: 'Input',
  },
];

export const detailSchema: DescItem[] = [
  {
    field: 'name',
    label: '名称',
  },
  {
    field: 'driverClass',
    label: '驱动类',
  },
  {
    field: 'username',
    label: '用户名',
  },
  {
    field: 'password',
    label: '密码',
  },
  {
    field: 'url',
    label: '链接地址',
  },
  {
    field: 'remark',
    label: '备注',
  },
];
