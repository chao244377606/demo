import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '字典编号',
    dataIndex: 'code',
  },
  {
    title: '字典名称',
    dataIndex: 'dictValue',
  },
  {
    title: '封存',
    dataIndex: 'isSealed',
    format: (text) => {
      return text == '0' ? '否' : '是';
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'code',
    label: '字典编号',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'dictValue',
    label: '字典名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const dictFormSchema: FormSchema[] = [
  {
    field: 'code',
    label: '字典编号',
    component: 'Input',
    dynamicDisabled: ({ model }) => {
      return model.parentId != '0';
    },
    required: true,
  },
  {
    field: 'dictValue',
    label: '字典名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentId',
    label: '上级字典',
    component: 'Input',
    dynamicDisabled: true,
    show: false,
  },
  {
    field: 'parentName',
    label: '上级字典名称',
    component: 'Input',
    dynamicDisabled: true,
    show: ({ model }) => {
      return model.parentId != '0';
    },
  },
  {
    field: 'dictKey',
    label: '字典键值',
    component: 'Input',
    show: ({ model }) => {
      return model.parentId != '0';
    },
  },
  {
    field: 'sort',
    label: '字典排序',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'isSealed',
    label: '封存',
    component: 'Switch',
    componentProps: {
      checkedValue: 1,
      unCheckedValue: 0,
    },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
  },
];

export const ChildrenFormSchema: FormSchema[] = [
  {
    field: 'code',
    label: '字典编号',
    component: 'Input',
    required: true,
  },
  {
    field: 'dictValue',
    label: '字典名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'sort',
    label: '字典排序',
    component: 'Input',
    required: true,
  },
  {
    field: 'isSealed',
    label: '封存',
    component: 'Switch',
    componentProps: {
      checkedValue: 1,
      unCheckedValue: 0,
    },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
  },
  {
    field: 'parentId',
    label: '上级字典',
    component: 'Input',
    show: false,
  },
];
