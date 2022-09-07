import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '执行id',
    dataIndex: 'executionId',
  },
  {
    title: '流程key',
    dataIndex: 'processDefinitionKey',
  },
  {
    title: '实例id',
    dataIndex: 'processInstanceId',
  },
  {
    title: '状态',
    dataIndex: 'suspensionState',
  },
  {
    title: '发起人',
    dataIndex: 'startUser',
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
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
    field: 'executionId',
    label: '执行id',
    component: 'InputTextArea',
  },
  {
    field: 'processDefinitionKey',
    label: '流程key',
    component: 'Input',
    required: true,
  },
  {
    field: 'processInstanceId',
    label: '实例id',
    component: 'Input',
    required: true,
  },
];
