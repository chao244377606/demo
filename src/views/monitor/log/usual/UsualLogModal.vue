<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="详情"
    :width="900"
    :showOkBtn="false"
  >
    <Description size="middle" @register="registerDetail" :column="2" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { detailSchema } from './usual.data';
  import { getUsualDetail } from '/@/api/monitor/log/log';
  import { Description, useDescription } from '/@/components/Description/index';

  export default defineComponent({
    name: 'UsualLogModal',
    components: { BasicModal, Description },
    emits: ['success', 'register'],
    setup(_) {
      //详情
      const [registerDetail, { setDescProps }] = useDescription({
        schema: detailSchema,
      });

      const [registerModal, { setModalProps }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        const detail = await getUsualDetail({ id: data.record.id });
        setDescProps({
          data: detail,
        });
      });

      return { registerModal, registerDetail };
    },
  });
</script>
