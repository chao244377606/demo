<template>
  <CollapseContainer title="修改密码" :canExpan="false">
    <a-row :gutter="24">
      <a-col :span="14">
        <BasicForm @register="register" />
      </a-col>
    </a-row>
    <Button type="primary" @click="handleSubmit"> 提交 </Button>
  </CollapseContainer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { CollapseContainer } from '/@/components/Container/index';
  import { Button, Row, Col } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicForm, useForm } from '/@/components/Form/index';

  import { updatePassword } from '/@/api/system/user';

  import { passwordSetting } from './data';
  import md5 from 'js-md5';

  export default defineComponent({
    components: { BasicForm, CollapseContainer, Button, [Row.name]: Row, [Col.name]: Col },
    setup() {
      const { createMessage } = useMessage();

      const [register, { validate }] = useForm({
        labelWidth: 120,
        schemas: passwordSetting,
        showActionButtonGroup: false,
      });

      async function handleSubmit() {
        const values = await validate();
        values.oldPassword = md5(values.oldPassword);
        values.newPassword = md5(values.newPassword);
        values.newPassword1 = md5(values.newPassword1);
        await updatePassword(values);
        createMessage.success('更新成功！');
      }
      return {
        register,
        handleSubmit,
      };
    },
  });
</script>
