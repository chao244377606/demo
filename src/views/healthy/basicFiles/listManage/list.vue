<template>
  <div :class="{ hide_table_list: hideTableList }">
    <BasicTable @register="registerTable">
      <!-- 搜索-自定义组件 -->
      <template #form-linkage="{ model, field }">
        <fourLinkAge v-model="model[field]" />
      </template>
      <!-- 操作栏-工具栏 -->
      <template #toolbar>
        <a-button type="primary" @click="actionType()">新增</a-button>
        <a-button
          type="primary"
          @click="$fn.export('/health/base/oldManExport', getForm, { type: 1 })"
          >导出
        </a-button>

        <div class="check_right">
          <div :class="{ check_active: !hideTableList }" @click="showDataList">
            <svg viewBox="0 0 1024 1024">
              <path
                d="M213.333333 426.666667h170.666667v170.666666H213.333333v-170.666666z m0-213.333334h170.666667v170.666667H213.333333V213.333333z m213.333334 0h170.666666v170.666667h-170.666666V213.333333z m0 213.333334h170.666666v170.666666h-170.666666v-170.666666z m213.333333-213.333334h170.666667v170.666667h-170.666667V213.333333z m0 213.333334h170.666667v170.666666h-170.666667v-170.666666z m0 213.333333h170.666667v170.666667h-170.666667v-170.666667z m-213.333333 0h170.666666v170.666667h-170.666666v-170.666667z m-213.333334 0h170.666667v170.666667H213.333333v-170.666667z"
                p-id="6083"
              />
            </svg>
          </div>

          <div :class="{ check_active: hideTableList }" @click="showShiTu">
            <svg class="icon" viewBox="0 0 1024 1024">
              <path
                d="M545 793.6H243.8c-11 0-20-9-20-20V250.4c0-11 9-20 20-20h432.4c11 0 20 9 20 20v131.8c0 11 9 20 20 20s20-9 20-20V250.4c0-33.1-26.9-60-60-60H243.8c-33.1 0-60 26.9-60 60v523.2c0 33.1 26.9 60 60 60H545c11 0 20-9 20-20s-8.9-20-20-20z"
                p-id="4685"
              />
              <path
                d="M834.6 789.8l-88.8-91.7c23.4-28.7 37.5-65.4 37.5-105.3 0-92.1-74.9-167-167-167s-167 74.9-167 167 74.9 167 167 167c37.8 0 72.7-12.6 100.7-33.9l89 91.8c3.9 4 9.1 6 14.3 6 5 0 10.1-1.9 14-5.7 7.8-7.6 8-20.3 0.3-28.2z m-218.4-69.9c-70 0-127-57-127-127s57-127 127-127 127 57 127 127-57 127-127 127zM565 382.2c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9 20 20 20H545c11.1 0 20-9 20-20zM443.5 493.5c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9 20 20 20h114.8c11.1 0 20-8.9 20-20zM308.7 584.8c-11 0-20 9-20 20s9 20 20 20h61.7c11 0 20-9 20-20s-9-20-20-20h-61.7z"
                p-id="4686"
              />
            </svg>
          </div>
        </div>
      </template>
      <!-- 操作列渲染  -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '查看',
                onClick: actionType.bind(null, record, 'show'),
              },
              {
                label: '修改',
                onClick: actionType.bind(null, record, 'edit'),
              },
              {
                label: '删除',
                onClick: handleDelete.bind(null, record, 'edit'),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>

    <!-- 视图形式 -->
    <div class="show_shi_tu">
      <div class="dataList clearfix">
        <!-- pageInfo.shiTuData  cmpShiTuData-->
        <div class="items fl" v-for="item in pageInfo.shiTuData" :key="item.id">
          <div class="top">
            <div class="img">
              <img :src="item.images" alt="" />
            </div>

            <div class="top1">
              <div class="left"
                >{{ item.name }}
                <span style="margin-left: 14px">{{ $fn.dict('sex', item.sex) }}</span>
              </div>
              <div class="right">
                <tip title="查看">
                  <Icon
                    @click="actionType(item, 'show')"
                    class="cur"
                    icon="ic:round-preview"
                    :size="20"
                  />
                </tip>

                <tip title="编辑"
                  ><Icon
                    @click="actionType(item, 'edit')"
                    class="cur"
                    icon="ri:edit-box-line"
                    :size="20"
                  />
                </tip>
                <tip title="删除">
                  <Icon @click="handleDelete(item)" class="cur" icon="mi:delete" :size="20"
                /></tip>
              </div>
            </div>
            <div class="top1">
              <div class="left">{{ $fn.pubVerify.idCardInfo(item.idCard).age }}岁</div>
              <div class="right"> 老人编号: {{ item.code }} </div>
            </div>
          </div>
          <div class="bottom">
            <div
              >所属驿站:<span>{{ item.communityStation }}</span></div
            >
            <div
              >联系方式:<span>{{ item.phone }}</span></div
            >
          </div>
        </div>
      </div>

      <!-- <Pagination
        size="small"
        :total="pageInfo.total"
        :current="pageInfo.current"
        :pageSize="pageInfo.pageSize"
        :pageSizeOptions="pageInfo.pageSizeOptions"
        :show-total="(total) => `共 ${total} 条数据 `"
        show-size-changer
        show-quick-jumper
        @change="pageChange"
      /> -->
    </div>
    <listModal @register="registerModal" @ok="reload" />
  </div>
</template>

<script setup lang="ts">
  import { Icon } from '/@/components/Icon';
  import fourLinkAge from '/@/coms/fourLinkAge/fourLinkAge.vue';
  import listModal from './listModal.vue';
  //api接口
  import { tableColumns, tableForm } from './list.data';
  import { listApi } from './api';
  // import { Pagination } from 'ant-design-vue';

  //========通用组件 start
  import { ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  const [registerModal, { openModal }] = useModal();

  let hideTableList = ref(false);
  let pageInfo: any = ref({
    pageSize: 10,
    total: 0,
    current: 1,
    pageSizeOptions: [],
    shiTuData: [],
  });
  // function pageChange(current, pageSize) {
  //   pageInfo.value.pageSize = pageSize;
  //   pageInfo.value.current = current;

  //   setPagination({
  //     pageSize,
  //     current,
  //   });
  //   reload();
  // }
  function showDataList() {
    hideTableList.value = false;
    $fn.cleanScroll('.ant-table-body');
  }
  function showShiTu() {
    let page: any = getPaginationRef();
    pageInfo.value.pageSize = page.pageSize;
    pageInfo.value.total = page.total;
    pageInfo.value.current = page.current;
    pageInfo.value.pageSizeOptions = page.pageSizeOptions;

    hideTableList.value = true;
  }

  //使用基础表格
  const [registerTable, { reload, getForm, setPagination, getPaginationRef }] = useTable({
    useSearchForm: true,
    formConfig: tableForm,
    api: listApi,
    columns: tableColumns,
    actionColumn: {
      width: 200,
      title: '操作',
      dataIndex: 'action',
    },
    afterFetch: (data) => {
      // console.log(data, '的士速递是');
      pageInfo.value.shiTuData = data;
      return data;
    },
    // clickToRowSelect: false,
    // showTableSetting: false,
  });
  //========通用组件 end

  // 打开方法
  function actionType(record = {}, type = 'add') {
    openModal(true, { record, type });
  }
  async function handleDelete(record) {
    if (!(await $fn.modal.open('您确认删除该老人的记录吗？'))) return;
    let res = await $fn.post('/health/base/oldManDelete', { id: record.id });
    if (res.success) {
      $fn.message.success('删除成功');
      reload();
    } else {
      $fn.modal.info('禁止删除老人信息');
    }
  }
</script>

<style lang="less" scoped>
  .check_right {
    display: flex;
    position: absolute;
    right: 0px;
    top: 4px;
    > div {
      width: 30px;
      height: 30px;
      border: 1px solid #ddd;
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        width: 22px;
        height: 22px;
        color: #666;
      }
    }
    .check_active {
      background-color: #1890ff;
      border: 1px solid #1890ff;
      svg {
        fill: #fff;
      }
    }
  }
  .show_shi_tu {
    display: none;
  }
  .hide_table_list {
    :deep(.ant-table-container) {
      display: none;
    }
    :deep(.ant-pagination) {
      display: none;
    }

    .show_shi_tu {
      display: block;
      margin: -20px 11px 10px 11px;
      padding: 10px;
      background-color: #fff;

      .dataList {
        margin-bottom: 5px;
        padding-left: 12px;
        .items {
          margin-right: 15px;
          margin-bottom: 15px;
          width: 330px;
          height: 165px;
          box-shadow: 0 0 10px 2px #ddd;
          padding: 10px;
          color: #f2f2f2;
          padding: 8px;
          font-size: 16px;

          .top {
            background-color: @button-primary-color;
            position: relative;
            height: 76px;
            overflow: hidden;
            padding-left: 66px;
            padding-right: 10px;
            padding-top: 8px;
            border: 1px solid #888;
            .img {
              width: 50px;
              height: 50px;
              position: absolute;
              top: 10px;
              left: 10px;
              border-radius: 50%;
              // border: 1px solid rgb(198, 196, 196);
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .top1 {
              overflow: hidden;
              .left {
                float: left;
              }
              .right {
                float: right;
                .cur {
                  margin-left: 4px;
                }
              }
            }
          }
          .bottom {
            color: #222;
            border: 1px solid #ddd;
            // padding-top: 10px;
            padding: 10px 15px;
            span {
              margin-left: 15px;
            }
          }
        }
      }

      :deep(.ant-pagination) {
        display: block;
        text-align: right;
      }
    }
  }
</style>
