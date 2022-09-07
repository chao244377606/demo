import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '参数名称',
    dataIndex: 'paramName',
  },
  {
    title: '参数键名',
    dataIndex: 'paramKey',
  },
  {
    title: '参数键值',
    dataIndex: 'paramValue',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'paramName',
    label: '参数名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'paramKey',
    label: '参数键名',
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
