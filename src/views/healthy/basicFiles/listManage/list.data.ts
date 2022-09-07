import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

// 弹窗表单数据
import dayjs, { Dayjs } from 'dayjs';
export const formSchema: FormSchema[] = [
  {
    field: 'divider-base',
    component: 'Divider',
    label: '基础信息',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'stationId',
    label: '所属社区驿站',
    component: 'ApiSelect',
    colProps: { span: 8 },
  },
  {
    field: 'orgName',
    label: '所属机构',
    component: 'Input',
    slot: 'orgName',
    colProps: { span: 8 },
  },
  {
    field: 'images',
    label: '',
    component: 'Upload',
    slot: 'img',
    colProps: { span: 8 },
  },

  {
    field: 'name',
    label: '姓名',
    component: 'Input',
    componentProps: () => {
      return {
        maxLength: 64,
      };
    },
    required: true,
    colProps: { span: 8 },
  },
  {
    field: 'code',
    label: '老人编号',
    component: 'Input',
    componentProps: () => {
      return {
        placeholder: '系统自动生成',
        disabled: true,
      };
    },
    colProps: { span: 8 },
  },
  {
    field: 'xxxxx1',
    label: '',
    component: 'Input',
    slot: 'xxxxx1',
    colProps: { span: 8 },
  },
  {
    field: 'sex',
    label: '性别',
    required: true,
    component: 'myDict',
    componentProps: {
      type: 'radio',
      code: 'sex',
    },
    colProps: { span: 8 },
  },
  {
    field: 'idCard',
    label: '身份证号码',
    component: 'Input',
    rules: [
      {
        required: true,
        validator: async (_, value) => {
          if (!value) return Promise.reject('请输入身份证号');
          if (!$fn.pubVerify.idCard(value)) return Promise.reject('格式不正确');
          return Promise.resolve();
        },
      },
    ],
    colProps: { span: 8 },
  },
  {
    field: 'xxxxx2',
    label: '',
    component: 'Input',
    slot: 'xxxxx2',
    colProps: { span: 8 },
  },
  {
    field: 'birth',
    label: '出生日期',
    component: 'DatePicker',
    componentProps: {
      // format: 'YYYY-MM',
      // showTime: false,
      disabledDate: (current: Dayjs) => {
        return current && current > dayjs().endOf('day');
      },
    },
    required: true,
    colProps: { span: 8 },
  },
  {
    field: 'phone',
    label: '联系方式',
    component: 'Input',
    componentProps: () => {
      return {
        maxLength: 64,
      };
    },
    colProps: { span: 8 },
  },
  {
    field: 'censusAddress',
    label: '户籍地址',
    component: 'Input',
    slot: 'linkage',
    colProps: { span: 14 },
  },
  {
    field: 'censusDetailAddress',
    label: '',
    component: 'Input',
    componentProps: () => {
      return {
        placeholder: '请输入详细地址',
      };
    },
    colProps: { span: 10 },
  },
  {
    field: 'liveAddress',
    label: '居住地址',
    component: 'Input',
    slot: 'linkage1',
    rules: [
      {
        required: true,
        validator: async (_, value) => {
          if (!value) return Promise.reject('请选择居住地址');
          const valsarr = value.split(',');
          // console.log(valsarr);
          if (!valsarr[0]) return Promise.reject('请选择省份');
          if (!valsarr[1]) return Promise.reject('请选择省市');
          if (!valsarr[2]) return Promise.reject('请选择区县');
          if (!valsarr[3]) return Promise.reject('请选择街道');
          return Promise.resolve();
        },
      },
    ],
    colProps: { span: 14 },
  },
  {
    field: 'liveDetailAddress',
    label: '',
    component: 'Input',
    rules: [
      {
        validator: async (_, value) => {
          if (!value) return Promise.reject('请输入详细地址');
          return Promise.resolve();
        },
      },
    ],
    componentProps: () => {
      return {
        placeholder: '请输入详细地址',
      };
    },
    colProps: { span: 10 },
  },
  {
    field: 'divider-other',
    component: 'Divider',
    label: '其他信息',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'nationId',
    label: '民族',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/mzList',
      type: 'select',
      labelField: 'mzName',
      valueField: 'id',
      // code: 'marriage',
    },
    colProps: { span: 8 },
  },
  {
    field: 'marriageState',
    label: '婚姻状况',
    component: 'myDict',
    componentProps: {
      type: 'select',
      code: 'marriage',
    },
    colProps: { span: 8 },
  },
  {
    field: 'educationId',
    label: '文化程度',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=1',
      type: 'select',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 8 },
  },
  {
    field: 'isRetire',
    label: '退休',
    component: 'myDict',
    componentProps: {
      type: 'radio',
      code: 'yesno',
    },
    colProps: { span: 8 },
  },
  {
    field: 'children',
    label: '子女数',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      precision: 0,
    },
    colProps: { span: 8 },
  },
  {
    field: 'isAlive',
    label: '是否健在',
    component: 'myDict',
    componentProps: {
      type: 'radio',
      code: 'yesno',
    },
    colProps: { span: 8 },
  },
  {
    field: 'occupationId',
    label: '职业类型',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=2',
      type: 'select',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 8 },
  },
  {
    field: 'nature',
    label: '性格类型',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=3',
      type: 'select',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 8 },
  },
  {
    field: 'hobby',
    label: '兴趣爱好',
    component: 'Input',
    colProps: { span: 24 },
  },
];

//列表table列配置
export const tableColumns: BasicColumn[] = [
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

//table 搜索区域配置
export const tableForm: Partial<FormProps> = {
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
      component: 'Select',
      componentProps: () => {
        return {
          options: [
            { label: '男', value: '1' },
            { label: '女', value: '0' },
          ],
        };
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
