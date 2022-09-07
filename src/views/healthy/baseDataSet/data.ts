// import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
// import { getDictList } from './api';

//列表table列配置

export function numAdd(num, code) {
  // console.log(num, code, 'ds sd ');
  const str = code;
  if (!num || num < 1) {
    num = 1;
  }
  //显示的长度，如果以0001则长度为4
  let len = 3;
  if (num > 999) {
    len = 4;
  }
  if (num > 9999) {
    len = 5;
  }
  num = parseInt(num, 10); //转数据类型，以十进制自增
  num = num.toString(); //转为字符串
  while (num.length < len) {
    //当字符串长度小于设定长度时，在前面加0
    num = '0' + num;
  }
  //如果字符串长度超过设定长度只做自增处理。
  return str + num;
}
export const tableColumns: any = () => {
  return [
    {
      title: '编号',
      dataIndex: 'dictCode',
      customRender: ({ text, record, index }) => {
        let dictCodeKey = '';
        if (record.dictCode) {
          const check_active_code = $fn.store.dictCodeNum;
          const key = record.dictCode.split(check_active_code)[1];
          if (key) {
            dictCodeKey = numAdd(index + 1, check_active_code);
          }
        }
        record.dictCode = dictCodeKey;
        return dictCodeKey;
      },
      width: 100,
    },
    {
      title: '内容',
      dataIndex: 'dictValue',
      editRow: true, //行编辑开启
      //校验规则
      editRule: async (text, record) => {
        if (!text) return '请输入信息';
        return '';
      },
      //编辑组件
      // | 'Input' | 'InputNumber' | 'Select' | 'ApiSelect'
      // | 'Checkbox'| 'Switch'| 'DatePicker' | 'TimePicker';
      editComponent: 'Input',
      //组件属性-参考form
      editComponentProps: {
        prefix: '*',
      },
    },
  ];
};

// 显示正在使用的信息
export const useTableColumns: BasicColumn[] = [
  {
    title: '老人编号',
    dataIndex: 'code',
    width: 100,
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    customRender({ text }) {
      return $fn.dict('sex', text);
    },
  },
  {
    title: '身份证号',
    dataIndex: 'idCard',
  },
];
