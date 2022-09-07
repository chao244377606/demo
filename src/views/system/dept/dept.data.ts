import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { DescItem } from '/@/components/Description/index';
import { getTenantList } from '/@/api/system/system';
import { getDictList } from '/@/api/system/system';
import website from '/@/settings/website';

export const columns: BasicColumn[] = [
  {
    title: '机构名称',
    dataIndex: 'deptName',
  },
  {
    title: '机构全称',
    dataIndex: 'fullName',
  },
  {
    title: '所属租户',
    dataIndex: 'tenantId',
    defaultHidden: !website.tenantMode,
  },
  {
    title: '机构类型',
    dataIndex: 'deptCategoryName',
    customRender: ({ record }) => {
      const deptCategoryName = record.deptCategoryName;
      return h(Tag, { color: 'green' }, () => deptCategoryName);
    },
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 80,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'deptName',
    label: '机构名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'tenantId',
    label: '所属租户',
    component: 'ApiSelect',
    show: website.tenantMode,
    componentProps: {
      api: getTenantList,
      labelField: 'tenantName',
      valueField: 'tenantId',
    },
    colProps: { span: 8 },
  },
  {
    field: 'fullName',
    label: '机构全称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'deptName',
    label: '机构名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'fullName',
    label: '机构全称',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentId',
    label: '上级机构',
    component: 'TreeSelect',
    componentProps: {
      style: { width: '100%' },
      fieldNames: {
        label: 'deptName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'deptCategory',
    label: '机构类型',
    component: 'ApiSelect',
    componentProps: {
      style: { width: '100%' },
      api: getDictList,
      params: { code: 'org_category' },
      labelField: 'dictValue',
      valueField: 'dictKey',
      stringToNumber: true,
    },
    required: true,
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    componentProps: {
      style: { width: '100%' },
    },
    required: true,
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];

export const detailSchema: DescItem[] = [
  {
    field: 'deptName',
    label: '机构名称',
  },
  {
    field: 'fullName',
    label: '机构全称',
  },
  {
    field: 'parentName',
    label: '上级机构',
  },
  {
    field: 'deptCategoryName',
    label: '机构类型',
  },
  {
    field: 'sort',
    label: '排序',
  },
  {
    field: 'remark',
    label: '备注',
  },
];
