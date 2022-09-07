<template>
  <BasicModal
    v-bind="$attrs"
    destroyOnClose
    @register="registerModal"
    title="编辑"
    @ok="handleSubmit"
    width="720px"
  >
    <Tinymce v-model="content" width="100%" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Tinymce } from '/@/components/Tinymce/index';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  export default defineComponent({
    name: 'EditorModal',
    components: { Tinymce, BasicModal },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const content = ref('');
      const filed = ref('');
      const type = ref('');
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        content.value = data.content;
        filed.value = data.filed;
        type.value = data.type;
      });
      function handleSubmit() {
        try {
          closeModal();
          emit('success', { content: content.value, filed: filed.value, type: type.value });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }
      return { content, registerModal, handleSubmit };
    },
  });
</script>
