import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import website from '/@/settings/website';

export const columns: BasicColumn[] = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
  },
  {
    title: '所属租户',
    dataIndex: 'tenantId',
    defaultHidden: !website.tenantMode,
  },
  {
    title: '角色别名',
    dataIndex: 'roleAlias',
  },
  {
    title: '角色排序',
    dataIndex: 'sort',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'roleAlias',
    label: '角色别名',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'roleAlias',
    label: '角色别名',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentId',
    label: '上级角色',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: { label: 'title', value: 'value' },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'sort',
    label: '角色排序',
    required: true,
    component: 'InputNumber',
  },
];
