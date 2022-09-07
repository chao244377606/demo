import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
// import { getDictList } from '/@/api/system/system';

export const columns: BasicColumn[] = [
  {
    title: '附件地址',
    dataIndex: 'link',
  },
  {
    title: '附件域名',
    dataIndex: 'domain',
  },
  {
    title: '附件名称',
    dataIndex: 'name',
  },
  {
    title: '附件原名',
    dataIndex: 'originalName',
  },
  {
    title: '附件拓展名',
    dataIndex: 'extension',
  },
  {
    title: '附件大小',
    dataIndex: 'attachSize',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'domain',
    label: '附件域名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'name',
    label: '附件名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'originalName',
    label: '附件原名',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'secretKey',
    label: 'secretKey',
    component: 'Input',
    required: true,
  },
];
