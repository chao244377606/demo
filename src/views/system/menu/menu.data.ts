import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description/index';
import { h } from 'vue';
import { Icon } from '/@/components/Icon';

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

const isButton = (category: number) => category === 2;
const isMenu = (category: number) => category === 1;

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

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'category',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '菜单', value: 1 },
        { label: '按钮', value: 2 },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'name',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },

  {
    field: 'parentId',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: { label: 'title', value: 'value' },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'code',
    label: '菜单编号',
    component: 'Input',
    required: true,
    helpMessage: '菜单编号和组件的name对应可实现页面缓存',
  },

  {
    field: 'source',
    label: '图标',
    component: 'IconPicker',
    required: true,
    dynamicDisabled: true,
    dynamicRules: ({ values }) => {
      return !isButton(values.category) ? [{ required: true, message: '请输入图标' }] : [];
    },
    show: ({ values }) => !isButton(values.category),
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'path',
    label: '路由地址',
    component: 'Input',
    dynamicRules: ({ values }) => {
      return !isButton(values.category) ? [{ required: true, message: '请输入路由地址' }] : [];
    },
    show: ({ values }) => !isButton(values.category),
  },
  {
    field: 'component',
    label: '组件地址',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      return !isMenu(values.category);
    },
    dynamicRules: ({ values }) => {
      return isMenu(values.category) ? [{ required: true, message: '请输入组件地址' }] : [];
    },
    show: ({ values }) => !isButton(values.category),
    helpMessage: '目录请输入‘LAYOUT’,菜单请输入组件地址',
  },
  {
    field: 'isOpen',
    label: '打开新窗口',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '否', value: 1 },
        { label: '是', value: 2 },
      ],
    },
    show: ({ values }) => !isButton(values.category),
    helpMessage: '有外部链接时是否新窗口打开',
  },
];

export const detailSchema: DescItem[] = [
  {
    field: 'category',
    label: '菜单类型',
  },
  {
    field: 'name',
    label: '菜单名称',
  },

  {
    field: 'parentName',
    label: '上级菜单',
  },
  {
    field: 'code',
    label: '菜单编号',
  },

  {
    field: 'source',
    label: '图标',
    render: (curVal) => {
      return h(Icon, { icon: curVal });
    },
  },
  {
    field: 'sort',
    label: '排序',
  },
  {
    field: 'path',
    label: '路由地址',
  },
];
