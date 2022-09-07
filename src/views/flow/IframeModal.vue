<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    @ok="handleSubmit"
    :defaultFullscreen="true"
  >
    <iframe
      :src="url"
      width="100%"
      height="700"
      title="流程设计器"
      frameBorder="no"
      border="0"
      marginWidth="0"
      marginHeight="0"
      scrolling="no"
      allowTransparency="yes"
    >
    </iframe>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  export default defineComponent({
    name: 'OssModal',
    components: { BasicModal },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const url = ref('');
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        url.value = data.url;
      });

      function handleSubmit() {
        closeModal();
        emit('success');
      }

      return {
        registerModal,
        url,
        handleSubmit,
      };
    },
  });
</script>
