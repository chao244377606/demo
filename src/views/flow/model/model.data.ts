import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getDictList } from '/@/api/system/system';
import { getTenantList } from '/@/api/system/system';

export const columns: BasicColumn[] = [
  {
    title: '模型主键',
    dataIndex: 'id',
  },
  {
    title: '模型标识',
    dataIndex: 'modelKey',
  },
  {
    title: '模型名称',
    dataIndex: 'name',
  },
  {
    title: '流程版本',
    dataIndex: 'version',
  },
  {
    title: '创建时间',
    dataIndex: 'created',
  },
  {
    title: '更新时间',
    dataIndex: 'lastUpdated',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'modelKey',
    label: '模型标识',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'name',
    label: '模型名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'categoryValue',
    label: '流程类型',
    component: 'ApiSelect',
    componentProps: {
      stringToNumber: true,
      api: getDictList,
      params: { code: 'flow' },
      labelField: 'dictValue',
      valueField: 'dictKey',
    },
    required: true,
  },
  {
    field: 'flowMode',
    label: '流程模式',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '通用流程', value: 1 },
        { label: '定制流程', value: 2 },
      ],
    },
    required: true,
  },
  {
    field: 'tenantId',
    label: '所属租户',
    component: 'ApiSelect',
    componentProps: {
      api: getTenantList,
      labelField: 'tenantName',
      valueField: 'tenantId',
      mode: 'multiple',
    },
    show: ({ model }) => {
      return model.flowMode == 2;
    },
  },
];
