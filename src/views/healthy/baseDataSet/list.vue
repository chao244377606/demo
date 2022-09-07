<template>
  <div class="chao_form_warp">
    <div class="left f170">
      <div
        v-for="item in checkTypeData"
        class="list"
        :class="{ check_active: check_active === item.id }"
        :key="item.id"
        @click="checkType(item)"
      >
        <img v-if="check_active !== item.id" src="./img/base_set0.png" alt="" />
        <img v-if="check_active === item.id" src="./img/base_set.png" alt="" />
        {{ item.dictTypeName }}</div
      >
    </div>
    <div class="right rule_pre_fix">
      <BasicTable @register="registerTable">
        <template #toolbar>
          <a-button type="primary" @click="actionType()">新增</a-button>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <TableAction :actions="createActions(record, column)" />
          </template>
        </template>
      </BasicTable>
    </div>
  </div>
  <useFormModal @register="registerModal" />
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { tableColumns, numAdd } from './data';
  import { listApi } from './api';
  import { useModal } from '/@/components/Modal';
  const [registerModal, { openModal }] = useModal();

  import useFormModal from './useModal.vue';

  //类型切换
  let check_active = ref(-1);
  let check_active_name = ref('');
  // 获取字典数据
  let checkTypeData: any = ref([]);
  async function getDataList() {
    let res = await $fn.get('/health/baseData/dataType');
    if (res.success) {
      checkTypeData.value = res.data;
      check_active.value = res.data[0].id;
      check_active_name.value = res.data[0].dictTypeName;
      $fn.store.setDictCode(res.data[0].dictTypeCode);
      reload();
    }
  }
  getDataList();

  async function checkType(data) {
    $fn.cleanScroll('.ant-table-body');

    // console.log(dom);
    // if (currentEditKeyRef.value) {
    //   if (!(await $fn.message.modal('数据未保存,是否确定离开'))) return;
    // }
    currentEditKeyRef.value = '';
    check_active.value = data.id;
    check_active_name.value = data.dictTypeName;
    $fn.store.setDictCode(data.dictTypeCode);
    reload();
  }

  //编辑行=====================
  const currentEditKeyRef = ref(''); //正则编辑的key
  async function handleSave(record) {
    // 校验

    const valid = await record.onValid?.();
    if (valid) {
      $fn.store.setLoad(true, '正在保存...');
      const data = $fn.clone(record.editValueRefs);
      //TODO 此处将数据提交给服务器保存
      let url = '/health/baseData/dataAdd';
      if (record.id) {
        url = '/health/baseData/dataUpdate';
      }
      let res = await $fn.post(url, {
        id: record.id,
        dataType: check_active.value,
        dictCode: record.dictCode,
        dictValue: data.dictValue,
      });
      $fn.store.setLoad(false, '正在保存...');
      if (!res.success) return $fn.message.error(res.msg || '操作失败');
      // 保存之后提交编辑状态
      const pass = await record.onEdit?.(false, true);
      if (pass) {
        currentEditKeyRef.value = '';
      }
      $fn.message.success('操作成功');
      reload();
    }
  }

  function actionType() {
    if (currentEditKeyRef.value) return $fn.message.info('请先保存数据后再新增');

    let da = getDataSource();
    da.push({
      dataType: check_active.value,
      dictCode: numAdd(da.length + 1, $fn.store.dictCodeNum),
      dictValue: '',
    });
    // 设置编辑key,进进入编辑状态
    currentEditKeyRef.value = 'xxxx';
    setTimeout(() => {
      da[da.length - 1].onEdit(true);
    }, 60);
  }
  function handleEdit(record) {
    // console.log(record);
    currentEditKeyRef.value = record.key;
    record.onEdit?.(true);
  }
  // function handleCancel(record) {
  //   currentEditKeyRef.value = '';
  //   record.onEdit?.(false, false);
  // }
  async function handleDelete(record) {
    let res = await $fn.post('/health/baseData/dataDelete', {
      id: record.id,
      dictTypeId: check_active.value,
    });
    if (res.success) {
      $fn.message.success('删除成功');
      reload();
    } else {
      if (res.data && res.data.length) {
        return openModal(true, {
          record: res.data,
          type: check_active_name.value,
          dictVal: record.dictValue,
        });
      }
      $fn.message.info(res.msg || '删除失败');
    }
  }
  function createActions(record) {
    if (!record.editable) {
      return [
        {
          label: '修改',
          ifShow: record.isEdit !== 0,
          disabled: currentEditKeyRef.value ? currentEditKeyRef.value !== record.key : false,
          onClick: handleEdit.bind(null, record),
        },
        {
          label: '删除',
          ifShow: record.isEdit !== 0,
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
      // {
      //   label: '取消',
      //   popConfirm: {
      //     title: '是否取消编辑',
      //     confirm: handleCancel.bind(null, record),
      //   },
      // },
    ];
  }

  const [registerTable, { reload, getDataSource }] = useTable({
    // 常用属性
    api: listApi,
    immediate: false,
    columns: tableColumns(), //表格列配置
    actionColumn: {
      width: 200,
      title: '操作',
      dataIndex: 'action',
    },
    pagination: false,

    // 可选
    clickToRowSelect: false, //点击是否选中复选框
    showTableSetting: false, //显示表格设置工具

    // searchInfo: {}, //额外的请求参数--任何类型
    // 请求之前/后对参数处理 afterFetch
    beforeFetch: (param) => {
      param.dataType = check_active.value;
      return param;
    },
  });
</script>
<style lang="less" scoped>
  .chao_form_warp .left .list {
    text-align: left;
    padding-left: 5px;
  }
</style>
