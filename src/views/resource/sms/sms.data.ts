import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description/index';
// import { getDictList } from '/@/api/system/system';

export const columns: BasicColumn[] = [
  {
    title: '分类',
    dataIndex: 'category',
    format: (text) => {
      if (text == '1') {
        return '云片';
      }
      if (text == '2') {
        return '七牛云';
      }
      if (text == '3') {
        return '阿里云';
      }
      if (text == '4') {
        return '腾讯云';
      }
    },
  },
  {
    title: '资源编号',
    dataIndex: 'smsCode',
  },
  {
    title: '模版ID',
    dataIndex: 'templateId',
  },
  {
    title: 'accessKey',
    dataIndex: 'accessKey',
  },
  {
    title: '短信签名',
    dataIndex: 'signName',
  },
  {
    title: '是否启用',
    dataIndex: 'status',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'category',
    label: '分类',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'smsCode',
    label: '资源编号',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'templateId',
    label: '模版ID',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'category',
    component: 'RadioGroup',
    label: '分类',
    componentProps: {
      options: [
        {
          label: '云片',
          value: 1,
        },
        {
          label: '七牛云',
          value: 2,
        },
        {
          label: '阿里云',
          value: 3,
        },
        {
          label: '腾讯云',
          value: 4,
        },
      ],
    },
  },
  {
    field: 'smsCode',
    label: '资源编号',
    component: 'Input',
    required: true,
  },
  {
    field: 'templateId',
    label: '模版ID',
    component: 'Input',
    required: true,
  },
  {
    field: 'signName',
    label: '短信签名',
    component: 'Input',
    required: true,
  },
  {
    field: 'accessKey',
    label: 'accessKey',
    component: 'Input',
    required: true,
  },
  {
    field: 'secretKey',
    label: 'secretKey',
    component: 'Input',
    required: true,
  },
  {
    field: 'appId',
    label: 'appId',
    component: 'Input',
    show: ({ model }) => {
      return model.category === 4;
    },
  },
  {
    field: 'regionId',
    label: 'regionId',
    component: 'Input',
    show: ({ model }) => {
      return model.category === 3;
    },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
  },
];

export const detailSchema: DescItem[] = [
  {
    field: 'category',
    label: '分类',
  },
  {
    field: 'smsCode',
    label: '资源编号',
  },
  {
    field: 'templateId',
    label: '模版ID',
  },
  {
    field: 'signName',
    label: '短信签名',
  },
  {
    field: 'accessKey',
    label: 'accessKey',
  },
  {
    field: 'secretKey',
    label: 'secretKey',
  },
  {
    field: 'appId',
    label: 'appId',
  },
  {
    field: 'regionId',
    label: 'regionId',
  },
  {
    field: 'remark',
    label: '备注',
  },
];
