import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getDictList } from '/@/api/system/system';
import { DescItem } from '/@/components/Description/index';
import website from '/@/settings/website';

export const columns: BasicColumn[] = [
  {
    title: '所属租户',
    dataIndex: 'tenantId',
    defaultHidden: !website.tenantMode,
  },
  {
    title: '岗位类型',
    dataIndex: 'categoryName',
  },
  {
    title: '岗位编号',
    dataIndex: 'postCode',
  },
  {
    title: '岗位名称',
    dataIndex: 'postName',
  },
  {
    title: '岗位排序',
    dataIndex: 'sort',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'category',
    label: '岗位类型',
    component: 'ApiSelect',
    componentProps: {
      api: getDictList,
      params: { code: 'post_category' },
      labelField: 'dictValue',
      valueField: 'dictKey',
    },
    colProps: { span: 8 },
  },
  {
    field: 'postCode',
    label: '岗位编号',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'postName',
    label: '岗位名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'category',
    label: '岗位类型',
    component: 'ApiSelect',
    componentProps: {
      stringToNumber: true,
      api: getDictList,
      params: { code: 'post_category' },
      labelField: 'dictValue',
      valueField: 'dictKey',
    },
    required: true,
  },
  {
    field: 'postCode',
    label: '岗位编号',
    component: 'Input',
    required: true,
  },
  {
    field: 'postName',
    label: '岗位名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'sort',
    label: '岗位排序',
    required: true,
    component: 'InputNumber',
  },
  {
    field: 'remark',
    label: '岗位描述',
    component: 'InputTextArea',
  },
];

export const detailSchema: DescItem[] = [
  {
    field: 'tenantId',
    label: '所属租户',
  },
  {
    field: 'categoryName',
    label: '岗位类型',
  },
  {
    field: 'postCode',
    label: '岗位编号',
  },
  {
    field: 'postName',
    label: '岗位名称',
  },
  {
    field: 'sort',
    label: '岗位排序',
  },
  {
    field: 'remark',
    label: '岗位描述',
  },
];
