import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '文件名',
    dataIndex: 'name',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '文件名',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'paramName',
    label: '参数名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'paramKey',
    label: '参数键名',
    component: 'Input',
    required: true,
  },
  {
    field: 'paramValue',
    label: '参数键值',
    component: 'InputTextArea',
  },
];
