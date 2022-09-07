<template>
  <BasicModal
    v-bind="$attrs"
    @register="apiScopeModal"
    :title="getTitle"
    :width="400"
    :height="800"
    @ok="handleSubmit"
  >
    <Tabs v-model:activeKey="activeKey">
      <TabPane key="1" tab="菜单权限">
        <BasicTree
          v-model:value="menuSelect"
          :treeData="menuData"
          :checkedKeys="menuSelect"
          :fieldNames="{ key: 'id' }"
          checkable
          toolbar
        />
      </TabPane>
      <TabPane key="2" tab="数据权限" force-render>
        <BasicTree
          v-model:value="dataSelect"
          :treeData="dataScopeData"
          :checkedKeys="dataSelect"
          :fieldNames="{ key: 'id' }"
          checkable
          toolbar
        />
      </TabPane>
      <TabPane key="3" tab="接口权限">
        <BasicTree
          v-model:value="apiSelect"
          :treeData="apiScopeData"
          :checkedKeys="apiSelect"
          :fieldNames="{ key: 'id' }"
          checkable
          toolbar
        />
      </TabPane>
    </Tabs>
  </BasicModal>
</template>
<script lang="ts">
  import { Tabs } from 'ant-design-vue';
  import { defineComponent, ref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { getGrantTree, getRoleTreeKeys, submitRoleGrant } from '/@/api/system/menu';

  export default defineComponent({
    name: 'RoleSettingModal',
    components: { BasicModal, BasicTree, Tabs, TabPane: Tabs.TabPane },
    emits: ['success', 'register', 'error'],
    setup(_, { emit }) {
      const id = ref('');
      const menuData = ref<TreeItem[]>([]);
      const dataScopeData = ref<TreeItem[]>([]);
      const apiScopeData = ref<TreeItem[]>([]);
      const apiSelect = ref<[]>([]);
      const menuSelect = ref<[]>([]);
      const dataSelect = ref<[]>([]);
      const activeKey = ref('1');
      //权限弹窗
      const [apiScopeModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        id.value = data?.id[0];
        const grantTree = await getGrantTree();
        menuData.value = grantTree.menu;
        dataScopeData.value = grantTree.dataScope;
        apiScopeData.value = grantTree.apiScope;
        const treeSelect = await getRoleTreeKeys({ roleIds: id.value });
        menuSelect.value = treeSelect.menu;
        apiSelect.value = treeSelect.apiScope;
        dataSelect.value = treeSelect.dataScope;
      });

      const getTitle = computed(() => {
        return '编辑权限';
      });

      async function handleSubmit() {
        try {
          setModalProps({ confirmLoading: true });
          await submitRoleGrant({
            apiScopeIds: apiSelect.value,
            dataScopeIds: dataSelect.value,
            menuIds: menuSelect.value,
            roleIds: [id.value],
          });
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return {
        handleSubmit,
        apiSelect,
        menuSelect,
        dataSelect,
        activeKey,
        apiScopeData,
        menuData,
        dataScopeData,
        apiScopeModal,
        getTitle,
      };
    },
  });
</script>
