import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description/index';
import { getDictList } from '/@/api/system/system';

export const columns: BasicColumn[] = [
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '类型',
    dataIndex: 'category',
  },
  {
    title: '通知日期',
    dataIndex: 'releaseTime',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '通知标题',
    component: 'Input',
  },
  {
    field: 'category',
    label: '通知类型',
    component: 'ApiSelect',
    componentProps: {
      api: getDictList,
      params: { code: 'notice' },
      fieldNames: { label: 'dictValue', value: 'dictKey' },
      placeholder: '请选择通知类型',
    },
  },
  {
    field: 'releaseTime',
    label: '通知日期',
    component: 'RangePicker',
    componentProps: {
      showTime: false,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      style: { width: '100%' },
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'title',
    label: '标题',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },

  {
    field: 'category',
    label: '通知类型',
    component: 'ApiSelect',
    componentProps: {
      api: getDictList,
      params: { code: 'notice' },
      fieldNames: { label: 'dictValue', value: 'dictKey' },
      placeholder: '请选择通知类型',
    },
    required: true,
  },
  {
    field: 'releaseTime',
    label: '通知日期',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      style: { width: '100%' },
    },
    required: true,
  },
  {
    field: 'content',
    label: '内容',
    component: 'Input',
    colProps: { span: 24 },
    slot: 'content',
    required: true,
  },
];

export const detailSchema: DescItem[] = [
  {
    field: 'title',
    label: '标题',
  },
  {
    field: 'category',
    label: '通知类型',
    // render: (curVal) => {
    //   return formatDictValue(typeOptions, curVal);
    // },
  },
  {
    field: 'releaseTime',
    label: '通知日期',
  },
  {
    field: 'content',
    label: '内容',
  },
];
