<template>
  <div class="m-4 mr-0 overflow-hidden bg-white">
    <Tree
      :clickRowToExpand="false"
      :treeData="treeData"
      :load-data="onLoadData"
      :fieldNames="replaceFields"
      v-model:expandedKeys="expandedKeys"
      v-model:selectedKeys="selectedKeys"
      @select="handleSelect"
    />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';

  import { TreeDataItem } from 'ant-design-vue/es/tree/Tree';
  import { Tree } from 'ant-design-vue';

  import { lazyTree } from '/@/api/system/region';
  const treeData = ref<TreeDataItem[]>([]);
  const emit = defineEmits(['select']);
  const expandedKeys = ref<string[]>([]);
  const selectedKeys = ref<string[]>([]);
  async function initTree() {
    const data = await lazyTree({ parentCode: '00' });
    treeData.value = data.map((item) => {
      return {
        ...item,
        isLeaf: !item.hasChildren,
      };
    });
  }
  const replaceFields = {
    isLeaf: 'hasChildren',
  };

  function handleSelect(keys: string) {
    emit('select', keys[0]);
  }

  onMounted(() => {
    initTree();
  });

  const onLoadData = (treeNode: any) => {
    return new Promise(async (resolve: (value?: unknown) => void) => {
      if (!treeNode.dataRef.hasChildren) {
        resolve();
        return;
      }
      const chilrenData = await lazyTree({ parentCode: treeNode.eventKey });
      treeNode.dataRef.children = chilrenData.map((item) => {
        return {
          ...item,
          isLeaf: !item.hasChildren,
        };
      });
      treeData.value = [...treeData.value];
      resolve();
    });
  };
</script>
