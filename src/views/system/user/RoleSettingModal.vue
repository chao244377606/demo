<template>
  <BasicModal
    v-bind="$attrs"
    @register="roleSettingModal"
    :title="getTitle"
    width="400"
    :height="800"
    @ok="handleSubmit"
  >
    <BasicTree
      :treeData="roleData"
      v-model:value="roleSelect"
      :checkedKeys="roleSelect"
      :fieldNames="{ key: 'id' }"
      checkable
      toolbar
    />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { getAllRoleList } from '/@/api/system/system';
  import { submitUserGrant } from '/@/api/system/user';
  const emit = defineEmits(['success', 'register']);

  const userIds = ref('');
  const roleData = ref<TreeItem[]>([]);
  const roleSelect = ref<[]>([]);
  //权限弹窗
  const [roleSettingModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    userIds.value = data.recordIds.join(',');
    const roleTree = await getAllRoleList();
    if (data.records.length === 1) {
      roleSelect.value = data.records[0].roleId.split(',');
    }
    roleData.value = roleTree;
  });

  const getTitle = computed(() => {
    return '编辑权限';
  });

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      await submitUserGrant({ userIds: userIds.value, roleIds: roleSelect.value.join(',') });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
