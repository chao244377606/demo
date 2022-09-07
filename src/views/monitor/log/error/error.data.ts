import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description/index';

export const columns: BasicColumn[] = [
  {
    title: '服务id',
    dataIndex: 'serviceId',
  },
  {
    title: '服务host',
    dataIndex: 'serverHost',
  },
  {
    title: '服务ip',
    dataIndex: 'serverIp',
  },
  {
    title: '软件环境',
    dataIndex: 'env',
  },
  {
    title: '请求方法',
    dataIndex: 'method',
  },
  {
    title: '请求接口',
    dataIndex: 'requestUri',
  },
  {
    title: '日志时间',
    dataIndex: 'createTime',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'serviceId',
    label: '服务id',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'serverHost',
    label: '服务host',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const detailSchema: DescItem[] = [
  {
    label: '服务id',
    field: 'serviceId',
  },
  {
    label: '服务host',
    field: 'serverHost',
  },
  {
    label: '服务ip',
    field: 'serverIp',
  },
  {
    label: '软件环境',
    field: 'env',
  },
  {
    label: '请求方法',
    field: 'method',
  },
  {
    label: '请求接口',
    field: 'requestUri',
  },
  {
    label: '日志时间',
    field: 'createTime',
    span: 2,
  },
  {
    label: '用户代理',
    field: 'userAgent',
    labelMinWidth: 80,
    span: 2,
  },
  {
    label: '请求数据',
    field: 'params',
    labelMinWidth: 80,
    span: 2,
  },
  {
    label: '日志数据',
    field: 'stackTrace',
    labelMinWidth: 80,
    span: 2,
  },
];
