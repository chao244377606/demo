import { FormSchema } from '/@/components/Table';
import { getDictList } from '/@/api/system/system';
import { getTenantList } from '/@/api/system/system';
import { flowUpload } from '/@/api/flow/flow';

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
  {
    field: 'flowFile',
    component: 'Upload',
    label: '附件上传',
    rules: [{ required: true, message: '请选择上传文件' }],
    componentProps: () => {
      return {
        api: flowUpload,
        multiple: false,
      };
    },
  },
];
