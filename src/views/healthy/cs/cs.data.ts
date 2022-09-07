import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

// 表单页面
export const formSchema: FormSchema[] = [
  // 基础组件
  {
    colProps: { span: 10 },
    field: 'postName',
    label: '姓名',
    component: 'Input',
  },
  // 字典 存在-code则走本地字典
  {
    field: 'nationId',
    label: '民族',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/mzList',
      type: 'select',
      labelField: 'mzName',
      valueField: 'id',
    },
    colProps: { span: 8 },
  },
  {
    field: 'nationId',
    label: '民族',
    component: 'myDict',
    componentProps: {
      api: '/health/baseData/mzList', //查询字典
      params: {}, //查询参数
      labelField: 'mzName', //字典渲染的name,默认:value
      valueField: 'id', //字典渲染的 key,默认:key
      resultField: '', //d
      showSearch: false, //可以搜索,默认false
      type: 'select', //类型, select | radio | checkbox 默认: select
      code: 'sex', //本地字典, code优先级高于api
    },
    colProps: { span: 8 },
  },
  {
    field: 'id',
    label: '字典查询',
    component: 'myDict',

    componentProps: ({ formModel }) => {
      return {
        placeholder: '字典配置',
        type: 'select',
        api: '/health/baseData/mzList',
        params: {
          code: 'sex',
        },
        labelField: 'mzName',
        valueField: 'id',
        onChange: (e) => {
          console.log(formModel);
        },
      };
    },
    colProps: { span: 12 },
  },
];

//除 参考官方 Column 配置外，扩展
export const getTableColumns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    fixed: 'left',
    width: 100,
  },
  {
    title: '姓名',
    dataIndex: 'postName',
    width: 200,
    fixed: 'left',

    // auth:'权限标识',//根据权限是否显示

    // 开启过滤
    // filters: [
    //   { text: '人力经理', value: '人力经理' },
    //   { text: 'Female', value: 'female' },
    // ],

    // editable:false,//否处于编辑状态
    // edit: true, //开启单元格编辑--配合clomun使用
    editRow: true, //行编辑开启
    //校验规则
    editRule: async (text, record) => {
      if (text == '2') {
        return '不能输入该值';
      }
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

    // sorter: true, //开启排序
    // defaultHidden: true, //默认隐藏列
    // helpMessage: '测试', //列在右侧-显示帮助

    // ifShow: false, //动态是否显示列
    // ifShow: (action) => {
    //   console.log(action);
    //   return false;
    // },
  },

  {
    title: '类型11',
    dataIndex: 'createUser',
  },
  {
    title: '类型',
    dataIndex: 'createTime',
    fixed: 'right',
    width: 200,
  },
];

export const getFormConfig: Partial<FormProps> = {
  labelWidth: 100, //表单通用label大小
  baseColProps: { md: 12, xl: 8, xxl: 6 }, //配置子项colProps
  disabled: false,
  showAdvancedButton: false, //是否显示展开
  autoAdvancedLine: 4, //超过多少行折叠
  alwaysShowLines: 2, //折叠后始终显示的行数
  schemas: [
    {
      field: 'categoryName',
      label: '类型',
      component: 'Input',
      // componentProps: {
      //   placeholder: '自定义placeholder',
      // },
      componentProps: ({ tableAction, formActionType, formModel }) => {
        return {
          placeholder: '自定义placeholder',
          onChange: (e) => {
            // const { reload } = tableAction;

            // formActionType.updateSchema({ field: 'categoe', componentProps: { disabled: true } });
            // updateSchema([
            //   { field: 'filed', componentProps: { disabled: true } },
            //   { field: 'filed1', componentProps: { disabled: false } },
            // ]);

            // console.log(schema);
            console.log(tableAction);
            console.log(formActionType);
            console.log(formModel);
            // reload()
            // or
            // formModel.xxx = '123';
          },
        };
      },
      // required: true, //简化rules配置
      // rules:[],
      //动态判断是否显示或禁用
      // ifShow: true, //移除dom
      // show: true, //css控制
      // dynamicDisabled: (r) => {
      //   console.log(r, 'd sd sd ');
      //   return false;
      // },
    },
    {
      field: 'categoe',
      label: '多少 是',
      component: 'Input',
    },
    {
      field: `linkage`,
      label: '居住地址',
      component: 'Select',
      slot: 'linkage',
      colProps: {
        xl: 14,
        xxl: 14,
      },
    },
    {
      field: `linkageDetail`,
      label: '',
      component: 'Input',
      componentProps: {
        placeholder: '详细地址',
        maxlength: 5,
      },
      colProps: {
        xl: 8,
        xxl: 8,
      },
    },
  ],
};
