import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description/index';
import { getDictList } from '/@/api/system/system';
import { uploadAttach } from '/@/api/resource/attach';

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
      placeholder: '请选择通知类型',
      api: getDictList,
      params: { code: 'notice' },
      labelField: 'dictValue',
      valueField: 'dictKey',
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'title',
    label: '标题',
    component: 'Upload',
    rules: [{ required: true, message: '请选择上传文件' }],
    componentProps: () => {
      return {
        api: uploadAttach,
        //是否多选上传，如果false的话数据也是一个array
        multiple: false,
      };
    },
    colProps: { span: 24 },
  },
  {
    //下拉组件
    field: 'category',
    label: '通知类型',
    component: 'ApiSelect',
    componentProps: {
      placeholder: '请选择通知类型',
      api: getDictList,
      params: { code: 'notice' },
      labelField: 'dictValue',
      valueField: 'dictKey',
      stringToNumber: true,
    },
    required: true,
  },
  {
    //日期组件
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
    //省市区联动组件
    field: 'province',
    label: '省市区联动',
    component: 'Cascader',
    colProps: { span: 24 },
    componentProps: {
      fieldNames: { label: 'name', value: 'code' },
    },
    required: true,
  },
  {
    //富文本组件
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
