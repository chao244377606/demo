import { FormSchema } from '/@/components/Table';
import { UserDict } from '/@/api/system/user';

export const basicFrom: FormSchema[] = [
  {
    field: 'taskUser',
    label: '审批人员',
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: UserDict,
      labelField: 'account',
      valueField: 'id',
    },
  },
  {
    field: 'startTime',
    label: '开始时间',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
    },
    required: true,
  },
  {
    field: 'endTime',
    label: '结束时间',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    required: true,
  },
  {
    field: 'reason',
    label: '请假理由',
    required: true,
    component: 'InputTextArea',
  },
];

export const handleForm: FormSchema[] = [
  {
    field: 'assigneeName',
    label: '申请人',
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'startTime',
    label: '开始时间',
    component: 'DatePicker',
    componentProps: {
      disabled: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
    },
  },
  {
    field: 'endTime',
    label: '结束时间',
    component: 'DatePicker',
    componentProps: {
      disabled: true,
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    field: 'reason',
    label: '请假理由',
    componentProps: { disabled: true },
    component: 'InputTextArea',
  },
  {
    field: 'comment',
    label: '批复意见',
    required: true,
    component: 'InputTextArea',
  },
];

export const detailForm: FormSchema[] = [
  {
    field: 'assigneeName',
    label: '申请人',
    component: 'Input',
    componentProps: { disabled: true },
    colProps: { span: 30 },
  },
  {
    field: 'startTime',
    label: '开始时间',
    component: 'DatePicker',
    componentProps: {
      disabled: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
    },
  },
  {
    field: 'endTime',
    label: '结束时间',
    component: 'DatePicker',
    componentProps: {
      disabled: true,
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    field: 'reason',
    label: '请假理由',
    componentProps: { disabled: true },
    component: 'InputTextArea',
  },
];
