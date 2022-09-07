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
    title: '流程名称',
    dataIndex: 'processDefinitionName',
  },
  {
    title: '当前步骤',
    dataIndex: 'taskName',
  },
  {
    title: '流程版本',
    dataIndex: 'processDefinitionVersion',
  },
  {
    title: '流程进度',
    dataIndex: 'processIsFinished',
  },
  {
    title: '申请时间',
    dataIndex: 'createTime',
  },
];

export const searchFormSchema: FormSchema[] = [
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
  {
    field: 'name',
    label: '流程名称',
    component: 'Input',
    colProps: { span: 8 },
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
