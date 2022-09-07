import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description/index';
import { getDictList } from '/@/api/system/system';
import { getDataSourceSelect } from '/@/api/tool/datasource';

export const columns: BasicColumn[] = [
  {
    title: '数据源',
    dataIndex: 'datasourceId',
  },
  {
    title: '模块名',
    dataIndex: 'codeName',
  },
  {
    title: '服务名',
    dataIndex: 'serviceName',
  },
  {
    title: '表名',
    dataIndex: 'tableName',
  },
  {
    title: '包名',
    dataIndex: 'packageName',
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
    field: 'datasourceId',
    label: '数据源',
    component: 'ApiSelect',
    componentProps: {
      api: getDataSourceSelect,
      labelField: 'name',
      valueField: 'id',
    },
    required: true,
  },
  {
    field: 'codeName',
    label: '模块名',
    component: 'Input',
    required: true,
  },
  {
    field: 'serviceName',
    label: '服务名',
    component: 'Input',
    required: true,
  },
  {
    field: 'tableName',
    label: '表名',
    component: 'Input',
    required: true,
  },
  {
    field: 'tablePrefix',
    label: '表前缀',
    component: 'Input',
    required: true,
  },
  {
    field: 'pkName',
    label: '主键名',
    component: 'Input',
    required: true,
  },
  {
    field: 'packageName',
    label: '包名',
    component: 'Input',
    required: true,
  },
  {
    field: 'baseMode',
    label: '基础业务',
    component: 'ApiSelect',
    componentProps: {
      api: getDictList,
      params: { code: 'yes_no' },
      labelField: 'dictValue',
      valueField: 'dictKey',
      stringToNumber: true,
    },
    required: true,
  },
  {
    field: 'wrapMode',
    label: '包装器',
    component: 'ApiSelect',
    componentProps: {
      api: getDictList,
      params: { code: 'yes_no' },
      labelField: 'dictValue',
      valueField: 'dictKey',
      stringToNumber: true,
    },
    required: true,
  },
  {
    field: 'apiPath',
    label: '后端生成路径',
    component: 'Input',
    required: true,
  },
  {
    field: 'webPath',
    label: '前端生成路径',
    component: 'Input',
    required: true,
  },
];

export const detailSchema: DescItem[] = [
  {
    field: 'datasourceId',
    label: '数据源',
  },
  {
    field: 'codeName',
    label: '模块名',
  },
  {
    field: 'serviceName',
    label: '服务名',
  },
  {
    field: 'tableName',
    label: '表名',
  },
  {
    field: 'tablePrefix',
    label: '表前缀',
  },
  {
    field: 'pkName',
    label: '主键名',
  },
  {
    field: 'packageName',
    label: '包名',
  },
  {
    field: 'baseMode',
    label: '基础业务',
  },
  {
    field: 'wrapMode',
    label: '包装器',
  },
  {
    field: 'apiPath',
    label: '后端生成路径',
  },
  {
    field: 'webPath',
    label: '前端生成路径',
  },
];
