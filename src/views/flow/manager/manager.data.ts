import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getDictList } from '/@/api/system/system';

const stateOptions: LabelValueOptions = [
  {
    label: '激活',
    value: 'active',
  },
  {
    label: '挂起',
    value: 'suspend',
  },
];

export const columns: BasicColumn[] = [
  {
    title: '租户编号',
    dataIndex: 'tenantId',
  },
  {
    title: '流程主键',
    dataIndex: 'id',
  },
  {
    title: '流程标识',
    dataIndex: 'key',
  },

  {
    title: '流程名称',
    dataIndex: 'name',
  },
  {
    title: '流程分类',
    dataIndex: 'category',
  },
  {
    title: '流程版本',
    dataIndex: 'version',
  },
  {
    title: '状态',
    dataIndex: 'suspensionState',
  },
  {
    title: '部署时间',
    dataIndex: 'deploymentTime',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'key',
    label: '流程标识',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'category',
    label: '流程分类',
    component: 'ApiSelect',
    colProps: { span: 8 },
    componentProps: {
      api: getDictList,
      params: { code: 'flow' },
      labelField: 'dictValue',
      valueField: 'dictKey',
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'flowState',
    label: '流程状态',
    component: 'Select',
    required: true,
    componentProps: {
      options: stateOptions,
    },
  },
];
