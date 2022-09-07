<template>
  <div>
    <PageWrapper title="发起请假">
      <CollapseContainer>
        <BasicForm @register="registerForm" />
      </CollapseContainer>
    </PageWrapper>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container/index';
  import { PageWrapper } from '/@/components/Page';
  import { basicFrom } from './leave.data';
  import { useRouter } from 'vue-router';
  import { leaveProcess } from '/@/api/work/process';
  import { useGo } from '/@/hooks/web/usePage';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { router } from '/@/router';

  export default defineComponent({
    name: 'LeaveFrom',
    components: { CollapseContainer, BasicForm, PageWrapper },
    setup() {
      const go = useGo();
      const { currentRoute } = useRouter();
      const [registerForm, { validate }] = useForm({
        labelWidth: 200,
        schemas: basicFrom,
        showActionButtonGroup: true,
        showResetButton: false,
        submitFunc: handleSubmit,
        submitButtonOptions: { text: '提交' },
        baseColProps: {
          span: 23,
        },
      });

      async function handleSubmit() {
        const values = await validate();
        values.processDefinitionId = currentRoute.value.params.processDefinitionId;
        await leaveProcess(values);
        useTabs(router).close(currentRoute.value);
        go(`/work/start`, true);
      }

      return {
        currentRoute,
        registerForm,
        handleSubmit,
      };
    },
  });
</script>
