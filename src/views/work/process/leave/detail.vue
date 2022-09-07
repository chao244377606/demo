<template>
  <div>
    <PageWrapper title="请假流程详情">
      <template #rightFooter>
        <Space>
          <Button @click="handleClose">关闭</Button>
        </Space>
      </template>
      <CollapseContainer title="审批信息">
        <BasicForm @register="registerForm" />
      </CollapseContainer>
      <CollapseContainer title="流程信息">
        <Timeline mode="left">
          <template v-for="flow in flowList" :key="`${flow.historyActivityId}`">
            <TimelineItem>
              <Card :title="flow.createTime">
                <p
                  >{{ flow.assigneeName }} 在 [{{ flow.createTime }}] 开始处理 [{{
                    flow.historyActivityName
                  }}] 环节</p
                >
                <p v-if="flow.historyActivityDurationTime !== ''"
                  >任务历时 [{{ flow.historyActivityDurationTime }}]</p
                >
                <p v-if="flow.comment !== ''">批复意见: [{{ flow.comment }}]</p>
                <p v-if="flow.endTime !== ''">结束时间: [{{ flow.endTime }}]</p>
              </Card>
            </TimelineItem>
          </template>
        </Timeline>
      </CollapseContainer>
      <CollapseContainer title="流程跟踪">
        <img :src="src" alt="design" />
      </CollapseContainer>
    </PageWrapper>
  </div>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container/index';
  import { PageWrapper } from '/@/components/Page';
  import { detailForm } from './leave.data';
  import { useRouter } from 'vue-router';

  import { leaveDetail, historyFlowList } from '/@/api/work/process';
  import { Card, Timeline, Button, Space } from 'ant-design-vue';

  import { useGo } from '/@/hooks/web/usePage';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { router } from '/@/router';
  import { ref } from 'vue';
  const TimelineItem = Timeline.Item;
  const go = useGo();
  const { currentRoute } = useRouter();
  const flowList = ref([]);
  const src = ref('');
  const [registerForm, { setFieldsValue }] = useForm({
    labelWidth: 100,
    baseColProps: {
      span: 24,
    },
    schemas: detailForm,
    showActionButtonGroup: false,
    showResetButton: false,
    submitButtonOptions: { text: '提交' },
  });

  async function init() {
    src.value = `/api/blade-flow/process/diagram-view?processInstanceId=${
      currentRoute.value.params.processInstanceId
    }&t=${new Date().getTime()}`;

    const data = await leaveDetail({ businessId: currentRoute.value.params.businessId });
    const assigneeName = data.flow.assigneeName;
    setFieldsValue({
      ...data,
      assigneeName,
    });
    const flowData = await historyFlowList({
      processInstanceId: currentRoute.value.params.processInstanceId,
    });
    flowList.value = flowData;
  }
  init();

  function handleClose() {
    useTabs(router).close(currentRoute.value);
    go(`/work/start`, true);
  }
</script>
