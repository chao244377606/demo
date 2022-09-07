<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="详情"
    :showOkBtn="false"
    :width="1200"
  >
    <Description size="middle" @register="registerDetail" :column="2" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { detailSchema } from './error.data';
  import { getErrorDetail } from '/@/api/monitor/log/log';
  import { Description, useDescription } from '/@/components/Description/index';

  export default defineComponent({
    name: 'ErrorLogModal',
    components: { BasicModal, Description },
    emits: ['success', 'register'],
    setup(_) {
      //详情
      const [registerDetail, { setDescProps }] = useDescription({
        schema: detailSchema,
      });

      const [registerModal, { setModalProps }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        const detail = await getErrorDetail({ id: data.record.id });
        setDescProps({
          data: detail,
        });
      });

      return { registerModal, registerDetail };
    },
  });
</script>
