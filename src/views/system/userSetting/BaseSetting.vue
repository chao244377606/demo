<template>
  <CollapseContainer title="基础信息" :canExpan="false">
    <a-row :gutter="24">
      <a-col :span="14">
        <BasicForm @register="register" />
      </a-col>
      <a-col :span="10">
        <div class="change-avatar">
          <div class="mb-2"> 头像 </div>
          <img width="140" :src="avatar" />
          <Upload :showUploadList="false" :customRequest="upload">
            <Button class="ml-5"> <Icon icon="feather:upload" />更换头像 </Button>
          </Upload>
        </div>
      </a-col>
    </a-row>
    <Button type="primary" @click="handleSubmit"> 更新基础信息 </Button>
  </CollapseContainer>
</template>
<script lang="ts">
  import { Button, Upload, Row, Col } from 'ant-design-vue';
  import { computed, defineComponent, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container/index';
  import Icon from '/@/components/Icon/index';

  import { useMessage } from '/@/hooks/web/useMessage';

  import headerImg from '/@/assets/images/header.jpg';
  import { accountInfoApi } from '/@/api/system/account';
  import { updateUserInfo } from '/@/api/system/user';

  import { baseSetschemas } from './data';
  import { useUserStore } from '/@/store/modules/user';
  import { uploadOssDefult } from '/@/api/resource/oss';

  export default defineComponent({
    components: {
      BasicForm,
      CollapseContainer,
      Button,
      Upload,
      Icon,
      [Row.name]: Row,
      [Col.name]: Col,
    },
    setup() {
      const { createMessage } = useMessage();
      const userStore = useUserStore();

      const [register, { setFieldsValue }] = useForm({
        labelWidth: 120,
        schemas: baseSetschemas,
        showActionButtonGroup: false,
      });

      onMounted(async () => {
        const data = await accountInfoApi();
        setFieldsValue(data);
      });

      function handleSubmit() {
        createMessage.success('更新成功！');
      }

      const upload = async (param) => {
        const { data } = await uploadOssDefult({ file: param.file });
        const userinfo = userStore.getUserInfo;
        userinfo.avatar = data.data.link;
        userStore.setUserInfo(userinfo);
        await updateUserInfo({ id: userinfo.user_id, avatar: data.data.link });
        createMessage.success('上传成功');
      };

      const avatar = computed(() => {
        const { avatar } = userStore.getUserInfo;
        return avatar || headerImg;
      });

      return {
        upload,
        avatar,
        register,
        handleSubmit,
      };
    },
  });
</script>

<style lang="less" scoped>
  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
</style>
