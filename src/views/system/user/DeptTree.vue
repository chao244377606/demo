<template>
  <div class="m-3 mr-0 overflow-hidden bg-white">
    <BasicTree
      title="部门列表"
      toolbar
      search
      :clickRowToExpand="false"
      :treeData="treeData"
      :fieldNames="{ key: 'id', title: 'deptName' }"
      @select="handleSelect"
    />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';

  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { getDeptList } from '/@/api/system/dept';
  const treeData = ref<TreeItem[]>([]);
  const emit = defineEmits(['select']);

  async function fetch() {
    treeData.value = (await getDeptList()) as unknown as TreeItem[];
  }

  function handleSelect(keys: string) {
    emit('select', keys[0]);
  }

  onMounted(() => {
    fetch();
  });
</script>
