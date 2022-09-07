<template>
  <div>
    <PageWrapper title="处理请假">
      <template #rightFooter>
        <Space>
          <Button type="primary" @click="handleAgree">同意</Button>
          <Button type="primary" danger @click="handleDisagree">驳回</Button>
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
  import { handleForm } from './leave.data';
  import { useRouter } from 'vue-router';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { leaveDetail, historyFlowList, completeTask } from '/@/api/work/process';
  import { Card, Timeline, Button, Space } from 'ant-design-vue';

  import { useGo } from '/@/hooks/web/usePage';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { router } from '/@/router';
  import { ref } from 'vue';

  const TimelineItem = Timeline.Item;
  const { createMessage } = useMessage();
  const go = useGo();
  const { currentRoute } = useRouter();
  const flowList = ref([]);
  const src = ref();
  const [registerForm, { validate, setFieldsValue }] = useForm({
    labelWidth: 100,
    baseColProps: {
      span: 23,
    },
    actionColOptions: {
      span: 23,
    },
    schemas: handleForm,
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
  async function handleAgree() {
    const values = await validate();
    const params = {
      taskId: currentRoute.value.params.taskId,
      processInstanceId: currentRoute.value.params.processInstanceId,
      flag: 'ok',
      comment: values.comment,
    };
    await completeTask(params);
    createMessage.success('处理成功');
    useTabs(router).close(currentRoute.value);
    go(`/work/start`, true);
  }

  async function handleDisagree() {
    const values = await validate();
    const params = {
      taskId: currentRoute.value.params.taskId,
      processInstanceId: currentRoute.value.params.processInstanceId,
      comment: values.comment,
    };
    await completeTask(params);
    createMessage.success('处理成功');
    useTabs(router).close(currentRoute.value);
    go(`/work/start`, true);
  }

  function handleClose() {
    useTabs(router).close(currentRoute.value);
    go(`/work/start`, true);
  }
</script>
