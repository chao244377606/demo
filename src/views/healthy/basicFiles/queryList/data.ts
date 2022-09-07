import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

import { defHttp } from '/@/utils/http/axios';

//老人基础档案--list
export const listApi = (params) => defHttp.get({ url: '/health/base/oldManSearch', params });

//列表table列配置
export const tableJZColumns: BasicColumn[] = [
  {
    title: '老人编号',
    dataIndex: 'code',
    width: 120,
    fixed: 'left',
    // auth:'权限标识',//根据权限是否显示
    // sorter: true
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 100,
    fixed: 'left',
  },
  {
    title: '政府救助类型',
    dataIndex: 'bzbzName',
  },
  {
    title: '所属社区驿站',
    dataIndex: 'communityStation',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: 60,
    customRender({ text, record }) {
      text = text + '';
      if (!text) return '';
      if (record.dictInitVal) return record.dictInitVal;
      const val = $fn.dict('sex', text);
      record.dictInitVal = val;
      return val;
    },
  },
  {
    title: '年龄',
    dataIndex: 'age',
    // customRender({ text, record }) {
    //   text = text + '';
    //   if (!text) return '';
    //   if (record.ageInitVal) return record.ageInitVal;
    //   const val = $fn.pubVerify.idCardInfo(record.idCard).age;
    //   record.ageInitVal = val;
    //   return val;
    // },
    width: 60,
  },

  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '身份证号',
    dataIndex: 'idCard',
    width: 170,
  },
  {
    title: '出生日期',
    dataIndex: 'formatBirth',
  },
  {
    title: '居住地址',
    dataIndex: 'address',
  },
  {
    title: '是否健在',
    dataIndex: 'isAlive',
    width: 80,
    customRender({ text, record }) {
      text = text + '';
      if (!text) return '';
      if (record.isAliveInitVal) return record.isAliveInitVal;
      const val = $fn.dict('yesno', text);
      record.isAliveInitVal = val;
      return val;
    },
  },
];

//table 搜索区域配置
export const tableJZForm: Partial<FormProps> = {
  labelWidth: 80, //表单通用label大小
  baseColProps: { md: 12, xl: 6, xxl: 6 }, //配置子项colProps
  showAdvancedButton: false, //是否显示展开
  autoAdvancedLine: 4, //超过多少行折叠
  alwaysShowLines: 2, //折叠后始终显示的行数
  // autoSetPlaceHolder: true,
  schemas: [
    {
      field: 'name',
      label: '姓名:',
      component: 'Input',
    },
    {
      field: 'phone',
      label: '手机号:',
      component: 'Input',
    },
    {
      field: 'idCard',
      label: '身份证号:',
      component: 'Input',
    },
    {
      field: 'sex',
      label: '性别:',
      component: 'myDict',
      componentProps: {
        type: 'select',
        code: 'sex',
      },
    },

    {
      field: `liveAddress`,
      label: '居住地址:',
      component: 'Select',
      slot: 'linkage',
      colProps: {
        xl: 12,
        xxl: 12,
      },
    },
    {
      field: `bzbzId`,
      label: '政府救助类型:',
      component: 'myDict',
      componentProps: {
        api: '/health/baseData/data?dataType=13',
        type: 'select',
        labelField: 'dictValue',
        valueField: 'id',
      },
      labelWidth: 100,
      colProps: {
        xl: 6,
        xxl: 6,
      },
    },
  ],
};

// 老人中和查询
//table
export const tableZHColumns: BasicColumn[] = [
  {
    title: '老人编号',
    dataIndex: 'code',
    width: 120,
    fixed: 'left',
    // auth:'权限标识',//根据权限是否显示
    // sorter: true
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 100,
    fixed: 'left',
  },
  {
    title: '所属社区驿站',
    dataIndex: 'communityStation',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '身份证号',
    dataIndex: 'idCard',
    width: 170,
  },
  {
    title: '出生日期',
    dataIndex: 'formatBirth',
  },
  {
    title: '居住地址',
    dataIndex: 'address',
  },
];

//table 搜索
export const tableZHForm: Partial<FormProps> = {
  labelWidth: 80, //表单通用label大小
  baseColProps: { md: 12, xl: 6, xxl: 6 }, //配置子项colProps
  showAdvancedButton: false, //是否显示展开
  autoAdvancedLine: 4, //超过多少行折叠
  alwaysShowLines: 2, //折叠后始终显示的行数
  // autoSetPlaceHolder: true,
  schemas: [
    {
      field: 'name',
      label: '姓名:',
      component: 'Input',
    },
    {
      field: 'phone',
      label: '手机号:',
      component: 'Input',
    },
    {
      field: 'idCard',
      label: '身份证号:',
      component: 'Input',
    },
    {
      field: 'sex',
      label: '性别:',
      component: 'myDict',
      componentProps: {
        type: 'select',
        code: 'sex',
      },
    },

    {
      field: `liveAddress`,
      label: '居住地址:',
      component: 'Select',
      slot: 'linkage',
      colProps: {
        xl: 12,
        xxl: 12,
      },
    },
    {
      field: `communityStation`,
      label: '所属社区驿站:',
      component: 'Select',
      labelWidth: 100,
      colProps: {
        xl: 6,
        xxl: 6,
      },
    },
  ],
};
