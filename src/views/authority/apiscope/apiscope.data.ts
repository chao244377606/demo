import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { DescItem } from '/@/components/Description/index';
import { Icon } from '/@/components/Icon';
import { getDictList } from '/@/api/system/system';

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    width: 200,
    align: 'left',
  },
  {
    title: '图标',
    dataIndex: 'source',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.source });
    },
  },
  {
    title: '菜单编号',
    dataIndex: 'code',
    width: 180,
  },
  {
    title: '路由地址',
    dataIndex: 'path',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 50,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '菜单名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'code',
    label: '菜单编号',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const serchTableSchema: FormSchema[] = [
  {
    field: 'scopeName',
    label: '权限名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'resourceCode',
    label: '权限编号',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const apiColumns: BasicColumn[] = [
  {
    title: '权限名称',
    dataIndex: 'scopeName',
  },
  {
    title: '权限编号',
    dataIndex: 'resourceCode',
  },
  {
    title: '权限路径',
    dataIndex: 'scopePath',
  },
  {
    title: '接口类型',
    dataIndex: 'scopeTypeName',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'scopeName',
    label: '权限名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'resourceCode',
    label: '权限编号',
    component: 'Input',
    required: true,
  },
  {
    field: 'scopePath',
    label: '权限路径',
    component: 'Input',
    required: true,
  },
  {
    field: 'scopeType',
    label: '接口类型',
    component: 'ApiSelect',
    componentProps: {
      api: getDictList,
      params: { code: 'api_scope_type' },
      labelField: 'dictValue',
      valueField: 'dictKey',
      stringToNumber: true,
    },
    required: true,
  },
  {
    field: 'remark',
    label: '备注',
    component: 'Input',
    required: true,
  },
];

export const detailSchema: DescItem[] = [
  {
    field: 'scopeName',
    label: '权限名称',
  },
  {
    field: 'resourceCode',
    label: '权限编号',
  },
  {
    field: 'scopePath',
    label: '权限路径',
  },
  {
    field: 'scopeType',
    label: '接口类型',
  },
  {
    field: 'remark',
    label: '备注',
  },
];
