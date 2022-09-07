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
        return 'minio';
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
      return '未知';
    },
  },
  {
    title: '资源编号',
    dataIndex: 'ossCode',
  },
  {
    title: '资源地址',
    dataIndex: 'endpoint',
  },
  {
    title: '空间名',
    dataIndex: 'bucketName',
  },
  {
    title: 'accessKey',
    dataIndex: 'accessKey',
  },
  {
    title: 'secretKey',
    dataIndex: 'secretKey',
  },
  {
    title: '是否启用',
    dataIndex: 'status',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'datasourceId',
    label: '数据源',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'codeName',
    label: '模块名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'serviceName',
    label: '服务名',
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
          label: 'minio',
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
    field: 'ossCode',
    label: '资源编号',
    component: 'Input',
    required: true,
  },
  {
    field: 'endpoint',
    label: '资源地址',
    component: 'Input',
    required: true,
  },
  {
    field: 'bucketName',
    label: '空间名',
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
    field: 'region',
    label: 'region',
    component: 'Input',
    show: ({ model }) => {
      return model.category === 4;
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
    field: 'ossCode',
    label: '资源编号',
  },
  {
    field: 'endpoint',
    label: '资源地址',
  },
  {
    field: 'bucketName',
    label: '空间名',
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
    field: 'region',
    label: 'region',
  },
  {
    field: 'remark',
    label: '备注',
  },
];
