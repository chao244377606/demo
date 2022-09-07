<template>
  <div>
    <BasicTable @register="registerTable">
      <template #form-linkage="{ model, field }">
        <fourLinkAge v-model="model[field]" />
      </template>
      <template #toolbar>
        <a-button type="primary" @click="optionType({}, 'add')">新增</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction :actions="createActions(record)" />
        </template>
      </template>
    </BasicTable>
    <csModal @register="registerModal" @ok="reload" />
  </div>
</template>

<script setup lang="ts">
  import fourLinkAge from '/@/coms/fourLinkAge/fourLinkAge.vue';
  import csModal from './csModal.vue';
  import { ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { getTableColumns, getFormConfig } from './cs.data';
  import { listApi } from './api';

  const [registerModal, { openModal }] = useModal();

  //编辑行=====================
  const currentEditKeyRef = ref(''); //正则编辑的key
  async function handleSave(record) {
    // 校验
    $fn.store.setLoad(true, '保存中...');
    const valid = await record.onValid?.();
    if (valid) {
      try {
        const data = $fn.clone(record.editValueRefs);
        console.log(data);
        //TODO 此处将数据提交给服务器保存
        // ...
        // 保存之后提交编辑状态
        const pass = await record.onEdit?.(false, true);
        if (pass) {
          currentEditKeyRef.value = '';
        }
        $fn.message.success('保存成功..');
      } catch (error) {
        $fn.message.error('保存失败..');
      }
    } else {
      $fn.message.error('保存成失败..');
    }
    $fn.store.setLoad(false, '保存中...');
  }
  function optionType(record = {}, type = 'add') {
    openModal(true, { record, type });
  }
  function handleEdit(record) {
    currentEditKeyRef.value = record.key;
    record.onEdit?.(true);
  }
  function handleCancel(record) {
    currentEditKeyRef.value = '';
    record.onEdit?.(false, false);
  }
  function handleDelete(record) {
    console.log(record.id);
    reload();
    // currentEditKeyRef.value = '';
    // record.onEdit?.(false, false);
  }
  function createActions(record) {
    // console.log(record);
    if (!record.editable) {
      return [
        {
          label: '查看',
          onClick: optionType.bind(null, record, 'show'),
        },
        {
          label: '编辑',
          disabled: currentEditKeyRef.value ? currentEditKeyRef.value !== record.key : false,
          onClick: handleEdit.bind(null, record),
        },
        {
          label: '删除',
          disabled: currentEditKeyRef.value ? currentEditKeyRef.value !== record.key : false,
          popConfirm: {
            title: '是否删除',
            confirm: handleDelete.bind(null, record),
          },
        },
      ];
    }
    return [
      {
        label: '保存',
        onClick: handleSave.bind(null, record),
      },
      {
        label: '取消',
        popConfirm: {
          title: '是否取消编辑',
          confirm: handleCancel.bind(null, record),
        },
      },
    ];
  }

  const [registerTable, { reload }] = useTable({
    // 常用属性
    api: listApi,
    columns: getTableColumns, //表格列配置
    actionColumn: {
      width: 200,
      title: '操作',
      dataIndex: 'action',
    },
    // 选择列配置--参考antd 表格-rowSelection -注释掉则不显示
    rowSelection: {
      type: 'checkbox',
    },

    useSearchForm: true, //使用搜索表单
    formConfig: getFormConfig, //参考表单列配置

    // 请求-响应默认配置--参数见全局配置src/settings/componentSetting.ts

    // 可选
    clickToRowSelect: false, //点击是否选中复选框
    showTableSetting: false, //显示表格设置工具

    // bordered: false, //显示表格边框
    // pagination:false,分页
    // dataSource:[],表格数据-非api加载
    // loading:false,//表格加载状态
    // beforeEditSubmit: (recode) => {
    //   //编辑模式确定回调--行模式下无效
    // }

    // 可选属性

    //设置工具配置
    // tableSetting: {
    //   redo: true, // 是否显示刷新按钮
    //   size: true, // 是否显示尺寸调整按钮
    //   setting: true, // 是否显示字段调整按钮
    //   fullScreen: true, // 是否显示全屏按钮
    // },

    // title: '表格标题',
    // titleHelpMessage: '标题旁边提示',
    // showIndexColumn: false, //显示序列号
    //序列号自定义 BasicColumn[]
    // indexColumnProps: {
    //   title: '序号2',
    // },
    // immediate: false, //立即请求接口,false需要使用reload加载
    // rowKey: 'id', //表格key默认生成
    // maxHeight:600,//最大高度
    // searchInfo: {}, //额外的请求参数--任何类型
    // 请求之前/后对参数处理 afterFetch
    // beforeFetch: (param) => {
    //   return param;
    // },

    // canResize: false, //自适应高度,置于PageWrapper组件内，请勿启用

    //默认排序
    // defSort: {
    //   field: 'name',
    //   order: 'ascend',
    // },

    // onChange,
  });
</script>
