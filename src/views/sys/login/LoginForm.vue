<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <FormItem name="tenantId" v-show="formData.tenantMode" class="enter-x">
      <Input size="large" v-model:value="formData.tenantId" :placeholder="t('sys.login.tenantId')">
        <template #prefix>
          <KeyOutlined />
        </template>
      </Input>
    </FormItem>
    <FormItem name="username" class="enter-x">
      <Input size="large" v-model:value="formData.username" :placeholder="t('sys.login.userName')">
        <template #prefix>
          <UserOutlined />
        </template>
      </Input>
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      >
        <template #prefix>
          <LockOutlined />
        </template>
      </InputPassword>
    </FormItem>
    <FormItem name="code" v-if="website.captchaMode" class="enter-x">
      <Input size="large" v-model:value="formData.code" :placeholder="t('sys.login.code')">
        <template #prefix>
          <PictureOutlined />
        </template>
        <template #suffix>
          <div class="login-code">
            <img :src="image" class="login-code-img" @click="refreshCode" />
          </div>
        </template>
      </Input>
    </FormItem>

    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <!-- No logic, you need to deal with it yourself -->
          <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <!-- No logic, you need to deal with it yourself -->
          <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            {{ t('sys.login.forgetPassword') }}
          </Button>
        </FormItem>
      </ACol>
    </ARow>

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
        {{ t('sys.login.loginButton') }}
      </Button>
      <!-- <Button size="large" class="mt-4 enter-x" block @click="handleRegister">
        {{ t('sys.login.registerButton') }}
      </Button> -->
    </FormItem>
    <Divider class="enter-x">{{ t('sys.login.otherSignIn') }}</Divider>

    <div class="flex justify-evenly enter-x" :class="`${prefixCls}-sign-in-way`">
      <GithubFilled @click="handleClick('github')" />
      <WechatFilled @click="handleClick('wechat_open')" />
      <QqOutlined @click="handleClick('qq')" />
    </div>
  </Form>
  <UserInfoSelectModal @register="registerModal" @success="handleSuccess" />
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';
  import website from '/@/settings/website';

  import { Checkbox, Form, Input, Row, Col, Button, Divider } from 'ant-design-vue';
  import {
    GithubFilled,
    WechatFilled,
    QqOutlined,
    UserOutlined,
    KeyOutlined,
    LockOutlined,
    PictureOutlined,
  } from '@ant-design/icons-vue';
  import LoginFormTitle from './LoginFormTitle.vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useUserStore } from '/@/store/modules/user';
  import { getCaptcha } from '/@/api/sys/user';
  import { useModal } from '/@/components/Modal';

  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
  import { useDesign } from '/@/hooks/web/useDesign';
  import md5 from 'js-md5';
  import UserInfoSelectModal from './UserInfoSelectModal.vue';
  import Cookies from 'js-cookie';

  const [registerModal, { openModal }] = useModal();

  const ACol = Col;
  const ARow = Row;
  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { notification, createErrorModal } = useMessage();
  const { prefixCls } = useDesign('login');
  const userStore = useUserStore();

  const { setLoginState, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);
  const rememberMe = ref(false);
  const image = ref(
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  );

  const formData = reactive({
    tenantMode: website.tenantMode,
    tenantId: '000000',
    username: 'admin',
    password: 'admin',
    //账号类型
    type: 'account',
    //验证码的值
    code: '',
    //验证码的索引
    key: '',
    //部门ID
    deptId: '',
    //角色ID
    roleId: '',
  });

  const { validForm } = useFormValid(formRef);

  //onKeyStroke('Enter', handleLogin);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

  async function refreshCode() {
    const data = await getCaptcha();
    image.value = data.image;
    formData.key = data.key;
  }
  refreshCode();
  getCookie();

  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    try {
      loading.value = true;
      const userInfo = await userStore.login({
        tenantId: data.tenantId,
        password: md5(data.password),
        username: data.username,
        grant_type: website.captchaMode ? 'captcha' : 'password',
        scope: 'all',
        deptId: formData.deptId,
        roleId: formData.roleId,
        type: formData.type,
        key: formData.key,
        code: data.code,
        mode: 'modal',
      });
      if (userInfo) {
        if (rememberMe.value) {
          Cookies.set('username', formData.username, { expires: 30 });
          Cookies.set('password', formData.password, { expires: 30 });
          Cookies.set('rememberMe', rememberMe.value, { expires: 30 });
        } else {
          Cookies.remove('username');
          Cookies.remove('password');
          Cookies.remove('rememberMe');
        }
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.nick_name}`,
          duration: 3,
        });
      }
    } catch (error) {
      console.log(error, 99999);
      if (error.code) {
        //选择部门
        openModal(true, {
          user_id: userStore.getUserInfo.user_id,
          dept_id: userStore.getUserInfo.dept_id,
          role_id: userStore.getUserInfo.role_id,
        });
      } else {
        createErrorModal({
          title: t('sys.api.errorTip'),
          content: error.response.data.msg || t('sys.api.networkExceptionMsg'),
          getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
        });
      }
    } finally {
      loading.value = false;
    }
  }

  function handleClick(source) {
    window.location.href = `${website.authUrl}/${source}`;
  }

  function getCookie() {
    const c_username = Cookies.get('username');
    const c_password = Cookies.get('password');
    const c_rememberMe = Cookies.get('rememberMe');
    formData.username = c_username === undefined ? formData.username : c_username;
    formData.password = c_password === undefined ? formData.password : c_password;
    rememberMe.value = c_rememberMe === undefined ? false : Boolean(c_rememberMe);
  }

  function handleSuccess({ values }) {
    //操作成功提示
    formData.deptId = values.deptId;
    formData.roleId = values.roleId;
    handleLogin();
  }
</script>
<style lang="less" scoped>
  .login-code {
    // display: flex;
    // align-items: center;
    // margin: 0 0 0 10px;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 1px;
    z-index: 100;
  }

  .login-code-img {
    margin-top: 1px;
    width: 100px;
    height: 100%;
    background-color: #fdfdfd;
    border-left: 1px solid #f0f0f0;
    color: #333;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 5px;
    line-height: 35px;
    text-indent: 1px;
    text-align: center;
    cursor: pointer !important;
  }
</style>
