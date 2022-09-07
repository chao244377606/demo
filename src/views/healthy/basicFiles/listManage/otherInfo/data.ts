import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

// 居住信息
export const juZhuForm: FormSchema[] = [
  {
    field: 'jzqkId',
    label: '居住情况:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=5',
      type: 'radio',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },
  {
    field: 'ylfsId',
    label: '养老方式:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=6',
      type: 'radio',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },
  {
    field: 'rllxId',
    label: '燃料类型:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=7',
      type: 'radio',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },
  {
    field: 'yslxId',
    label: '饮水类型:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=8',
      type: 'radio',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },
  {
    field: 'lrflId',
    label: '老人分类:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=9',
      type: 'radio',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },
  {
    field: 'pfssId',
    label: '厨房设施:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=10',
      type: 'radio',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },
  {
    field: 'petId',
    label: '宠物:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=11',
      type: 'radio',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },
];

//补助信息
export const buZhuForm: FormSchema[] = [
  {
    field: 'bcId',
    label: '补偿:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=12',
      type: 'radio',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },
  {
    field: 'zfbzId',
    label: '政府补助',
    component: 'myDict',
    componentProps: {
      // api: '/health/baseData/data?dataType=13',
      type: 'radio',
      code: 'buzhu',
      // labelField: 'dictValue',
      // valueField: 'id',
    },
    colProps: { span: 24 },
  },
  {
    field: 'bzbzId',
    label: '政府补助(救助)标准',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=13',
      type: 'checkbox',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },
];

//需求信息
export const xuQiuForm: FormSchema[] = [
  {
    field: 'shxqId',
    label: '生活需求:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=14',
      type: 'checkbox',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },
  {
    field: 'jzxqId',
    label: '家政需求:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=15',
      type: 'checkbox',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },
  {
    field: 'ylxqId',
    label: '医疗需求:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=16',
      type: 'checkbox',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },
  {
    field: 'jsxqId',
    label: '精神需求:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=17',
      type: 'checkbox',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },
  {
    field: 'isNeeds	',
    label: '是否需要电话关怀:',
    component: 'myDict',
    componentProps: {
      type: 'radio',
      code: 'yesno',
    },
    colProps: { span: 24 },
  },
  {
    field: 'analysis',
    label: '分析总结:',
    component: 'myTextArea',
    colProps: { span: 24 },
  },
  {
    field: 'remark',
    label: '备注:',
    component: 'myTextArea',
    colProps: { span: 24 },
  },
];

//健康信息
export const jianKangForm: FormSchema[] = [
  {
    field: 'divider-base',
    component: 'Divider',
    label: '基本情况',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'height',
    label: '身高(CM):',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      precision: 2,
      step: 0.01,
    },
    colProps: { span: 8 },
  },
  {
    field: 'weight',
    label: '体重(KG):',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      precision: 2,
      step: 0.01,
    },
    colProps: { span: 8 },
  },
  {
    field: 'circumference',
    label: '腰围(CM):',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      precision: 2,
      step: 0.01,
    },
    colProps: { span: 8 },
  },
  {
    field: 'bloodType',
    label: '血型',
    component: 'myDict',
    componentProps: {
      type: 'radio',
      code: 'xuexing',
    },
    colProps: { span: 24 },
  },

  //病史
  {
    field: 'divider-base1',
    component: 'Divider',
    label: '病史',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'sysPressure',
    label: '收缩压(mmHg):',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      precision: 2,
      step: 0.01,
    },
    colProps: { span: 8 },
  },
  {
    field: 'diaPressure',
    label: '舒张压(mmHg):',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      precision: 2,
      step: 0.01,
    },
    colProps: { span: 8 },
  },
  {
    field: 'pulseRate',
    label: '脉率(分钟/次):',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      precision: 2,
      step: 0.01,
    },
    colProps: { span: 8 },
  },
  {
    field: 'glucose',
    label: '餐前血糖(mmol/L):',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      precision: 2,
      step: 0.01,
    },
    colProps: { span: 8 },
  },
  {
    field: 'genHistory',
    label: '遗传病史:',
    component: 'myTextArea',
    colProps: { span: 24 },
  },
  {
    field: 'pastHistory',
    label: '既往病史:',
    component: 'myTextArea',
    colProps: { span: 24 },
  },
  {
    field: 'drugHistoryId',
    label: '药物过敏史:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=18',
      type: 'checkbox',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },
  {
    field: 'familyHistoryId',
    label: '家族病史:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=19',
      type: 'checkbox',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },
  {
    field: 'slowMalumId',
    label: '慢性病:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=20',
      type: 'checkbox',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },
  {
    field: 'payType',
    label: '医疗费支付方式:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=21',
      type: 'checkbox',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },

  //当前身体状况 ===============
  {
    field: 'divider-base2',
    component: 'Divider',
    label: '当前身体状况',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'jkzk',
    label: '健康状况自评:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=22',
      type: 'radio',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },
  {
    field: 'zlnl',
    label: '自理能力自评:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=23',
      type: 'radio',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },
  {
    field: 'stzk',
    label: '身体状况:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=24',
      type: 'checkbox',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },
  {
    field: 'xltz',
    label: '心理特征:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=25',
      type: 'checkbox',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },
  {
    field: 'cdqz',
    label: '痴呆前兆:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=26',
      type: 'checkbox',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },
  //生活习惯
  {
    field: 'divider-base3',
    component: 'Divider',
    label: '生活习惯',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'ysxg',
    label: '饮食习惯:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=27',
      type: 'radio',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },
  {
    field: 'yjqk',
    label: '饮酒情况:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=28',
      type: 'radio',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },
  {
    field: 'xyqk',
    label: '吸烟情况:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=29',
      type: 'radio',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },
  {
    field: 'tydl',
    label: '体育锻炼:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=30',
      type: 'checkbox',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },

  {
    field: 'smqk',
    label: '睡眠情况:',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=31',
      type: 'radio',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 24 },
  },
  {
    field: 'isDrug',
    label: '是否长期用药:',
    component: 'myDict',
    componentProps: {
      type: 'radio',
      code: 'yesno',
    },
    colProps: { span: 24 },
  },
];

// 亲属信息--
//表格
export const jiashuTableColumns: BasicColumn[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 200,
    fixed: 'left',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    customRender({ text, record }) {
      text = text + '';
      if (!text) return '';
      if (record.sexInitVal) return record.sexInitVal;
      const val = $fn.dict('sex', text);
      record.sexInitVal = val;
      return val;
    },
  },
  {
    title: '与老人关系',
    dataIndex: 'relationId',
    // width: 200,
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
    // width: 200,
  },
  {
    title: '身份证号',
    dataIndex: 'idCard',
    width: 170,
  },
  {
    title: '居住地址',
    dataIndex: 'address',
    // width: 200,
  },
];
//表单
export const jiashuForm: FormSchema[] = [
  {
    field: 'id',
    label: 'id:',
    component: 'Input',
    ifShow: false,
    required: true,
    colProps: { span: 12 },
  },
  {
    field: 'name',
    label: '姓名:',
    component: 'Input',
    required: true,
    colProps: { span: 12 },
  },
  {
    field: 'sex',
    label: '性别:',
    component: 'myDict',
    required: true,
    componentProps: () => {
      return {
        type: 'radio',
        code: 'sex',
      };
    },
    colProps: { span: 12 },
  },
  {
    field: 'relationId',
    label: '与老人关系:',
    required: true,
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/data?dataType=4',
      type: 'select',
      labelField: 'dictValue',
      valueField: 'id',
    },
    colProps: { span: 12 },
  },
  {
    field: 'phone',
    label: '联系方式:',
    rules: [
      {
        required: true,
        validator: async (_, value) => {
          if (!value) return Promise.reject('请输入联系方式');
          if (!$fn.pubVerify.isMobile(value)) return Promise.reject('手机号格式不正确');
          return Promise.resolve();
        },
      },
    ],
    componentProps: {
      maxLength: 64,
    },
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'idCard',
    label: '身份证号:',
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
    colProps: { span: 12 },
  },
  {
    field: 'liveAddress',
    label: '居住地址:',
    component: 'Input',
    slot: 'linkage',
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
          // if(!valsarr[3]) return Promise.reject('请选择街道');
          return Promise.resolve();
        },
      },
    ],
    colProps: { span: 16 },
  },
  {
    field: 'liveDetailAddress',
    label: '',
    component: 'Input',
    componentProps: () => {
      return {
        placeholder: '请输入详细地址',
      };
    },
    rules: [
      {
        validator: async (_, value) => {
          if (!value) return Promise.reject('请输入详细地址');
          return Promise.resolve();
        },
      },
    ],
    colProps: { span: 8 },
  },
];
