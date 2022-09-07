import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '字段列名',
    dataIndex: 'columnName',
    width: 150,
  },
  {
    title: '字段描述',
    dataIndex: 'columnComment',
    slots: { customRender: 'columnComment' },
    width: 150,
  },
  {
    title: '物理类型',
    dataIndex: 'columnType',
    width: 150,
  },
  {
    title: '插入 | 编辑 | 列表 | 查询 ',
    dataIndex: 'isInsert|isEdit|isList|isQuery',
    width: 200,
    slots: { customRender: 'isInsert|isEdit|isList|isQuery' },
  },
  {
    title: '必填',
    dataIndex: 'isRequired',
    slots: { customRender: 'isRequired' },
    width: 80,
  },
  {
    title: '显示类型',
    dataIndex: 'htmlType',
    slots: { customRender: 'htmlType' },
  },
  {
    title: '字典类型',
    dataIndex: 'dictType',
    slots: { customRender: 'dictType' },
  },
];
