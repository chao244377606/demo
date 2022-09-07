<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" :showOkBtn="!isDetail">
    <div class="pb-2">
      {{ dataList.type }}
      [ <span class="red">{{ dataList.dictVal }}</span> ] 已经被使用在以下老人的基础档案中，不能删除
    </div>

    <BasicTable :dataSource="dataList.list" @register="registerTable" />
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '/@/components/Modal';
  //api接口
  import { useTableColumns } from './data';

  //========通用组件 start
  import { ref, reactive } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';

  let isDetail = ref(true);
  let title = ref('新增');
  let dataList = reactive({
    list: [],
    type: '',
    dictVal: '',
  });

  const [registerModal] = useModalInner(async (data) => {
    title.value = (data && data.title) || '提示';
    dataList.list = data.record;
    dataList.type = data.type;
    dataList.dictVal = data.dictVal;

    console.log(dataList.list);

    // reload();
  });

  //使用基础表格
  const [registerTable] = useTable({
    // api: useListApi,
    immediate: false, //立即请求接口
    // dataSource: dataList.list,
    columns: useTableColumns,
    canResize: false,
    pagination: false,
    // 可选
    clickToRowSelect: false, //点击是否选中复选框
    showTableSetting: false, //显示表格设置工具
  });
</script>
