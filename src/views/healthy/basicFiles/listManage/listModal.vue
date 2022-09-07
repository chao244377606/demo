<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="title"
    @ok="handleSubmit"
    @cancel="check_active = 1"
    :showOkBtn="!isDetail && check_active !== 2"
  >
    <div class="chao_form_warp">
      <div class="left w150">
        <div
          v-for="item in checkTypeData"
          class="list"
          :class="{ check_active: check_active === item.id }"
          :key="item.id"
          @click="checkType(item.id)"
          >{{ item.name }}</div
        >
      </div>
      <div class="right">
        <BasicForm v-show="check_active === 1" :disabled="isDetail" @register="userBasicForm">
          <template #orgName="{ model, field }">
            <div>{{ model[field] }}</div>
          </template>
          <!-- 四级联动 -->
          <template #linkage="{ model, field }">
            <fourLinkAge
              class="link_mb_20"
              :disabled="isDetail"
              v-model="model[field]"
              v-if="link_show"
            />
          </template>
          <template #linkage1="{ model, field }">
            <fourLinkAge
              @changeOk="changeOk"
              class="link_mb_20"
              :disabled="isDetail"
              v-model="model[field]"
              v-if="link_show"
            />
          </template>

          <!-- 图片上传 -->
          <template #img="{ model, field }">
            <div class="img_file_box">
              <div class="img_pre"> <img v-if="model[field]" :src="model[field]" alt="" /> </div>
              <div v-if="!isDetail" @click="upfiles.click()" class="img_up">上传老人照片</div>
              <input @change="fileChange" type="file" ref="upfiles" :multiple="false" hidden />
            </div>
          </template>
        </BasicForm>

        <jiashu ref="jiashuRef" @ok="childOk" v-if="check_active === 2" />
        <juzhu ref="juzhuRef" @ok="childOk" v-if="check_active === 3" />
        <buzhu ref="buzhuRef" @ok="childOk" v-if="check_active === 4" />
        <xuqiu ref="xuqiuRef" @ok="childOk" v-if="check_active === 5" />
        <jiankang ref="jiankangRef" @ok="childOk" v-if="check_active === 6" />
      </div>
    </div>
  </BasicModal>
</template>

<script lang="ts" setup>
  import fourLinkAge from '/@/coms/fourLinkAge/fourLinkAge.vue';

  import jiashu from './otherInfo/jiashu.vue';
  import juzhu from './otherInfo/juzhu.vue';
  import buzhu from './otherInfo/buzhu.vue';
  import xuqiu from './otherInfo/xuqiu.vue';
  import jiankang from './otherInfo/jiankang.vue';

  let jiashuRef = ref();
  let juzhuRef = ref();
  let buzhuRef = ref();
  let xuqiuRef = ref();
  let jiankangRef = ref();

  import { ref, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './list.data';

  import { upFile } from '/@/coms/api';

  const emit = defineEmits(['ok']);
  let isDetail = ref(false);
  let title = ref('新增');
  // 四级联动更新数据
  let link_show = ref(false);
  let upfiles = ref();
  //新增id
  let addId = ref('');
  //类型切换
  let check_active = ref(1);
  let checkTypeData = [
    {
      id: 1,
      name: '基本信息',
      edit: '/health/base/oldManUpdate',
      add: '/health/base/oldManAdd',
      show: '/health/base/oldManDetail',
    },
    {
      id: 2,
      name: '家属资料',
      edit: '/health/base/oldManUpdate',
      add: '/health/base/oldManAdd',
      show: '/health/base/oldManDetail',
    },
    {
      id: 3,
      name: '居住信息',
      edit: '/health/base/oldManUpdate',
      add: '/health/base/oldManAdd',
      show: '/health/base/oldManDetail',
    },
    {
      id: 4,
      name: '补助信息',
      edit: '/health/base/oldManUpdate',
      add: '/health/base/oldManAdd',
      show: '/health/base/oldManDetail',
    },
    {
      id: 5,
      name: '需求信息',
      edit: '/health/base/oldManUpdate',
      add: '/health/base/oldManAdd',
      show: '/health/base/oldManDetail',
    },
    {
      id: 6,
      name: '健康信息',
      edit: '/health/base/oldManUpdate',
      add: '/health/base/oldManAdd',
      show: '/health/base/oldManDetail',
    },
  ];
  function initType() {
    let type = check_active.value;
    if (type === 2) return jiashuRef.value;
    if (type === 3) return juzhuRef.value;
    if (type === 4) return buzhuRef.value;
    if (type === 5) return xuqiuRef.value;
    if (type === 6) return jiankangRef.value;
  }
  function checkType(type) {
    if (check_active.value === type) return;
    check_active.value = type;
    if (type === 1) {
      console.log('基本信息');
    } else {
      nextTick(() => {
        initType().init(addId.value, isDetail.value);
      });
    }
    //
    $fn.cleanScroll('.chao_form_warp .right');
  }

  async function fileChange(e) {
    let fileList = e.target.files;
    if (!fileList) return $fn.message.info('未选择任何文件');
    let file = fileList[0];
    if (file.type.indexOf('image') < 0) return $fn.message.info('请选择正确的图片格式');

    $fn.store.setLoad(true, '上传中...');
    let res: any = await upFile(file);
    $fn.store.setLoad(false, '上传中...');
    upfiles.value.value = '';
    if (!res.success) return $fn.message.info('文件上传失败');
    setFieldsValue({ images: res.data });
  }

  //处理逻辑 start
  async function getDataDetail(oldmanId) {
    $fn.store.setLoad(true);
    let res = await $fn.get('/health/base/oldManDetail', { id: oldmanId });
    if (res.success && res.data) {
      setFieldsValue({ ...res.data });
      clearValidate();
    }
    $fn.store.setLoad(false);
    link_show.value = true;
  }
  function childOk() {
    // $fn.ok(res, '保存成功');
    emit('ok');
  }

  //联动-回显验证必填项
  async function changeOk(str) {
    let res = await validateFields(['liveAddress']);
    console.log(str, res);
  }
  async function handleSubmit() {
    if (check_active.value === 1) {
      await Promise.all([validate()]);
      let form = getFieldsValue();
      form.id = addId.value;
      // console.log(form, 'form');
      if (form && form.birth) {
        form.birth = form.birth.split(' ')[0];
      }
      let res = await $fn.post('/health/base/oldManAdd', form);
      $fn.ok(res, '保存成功');
      emit('ok');
    } else {
      initType().handleSubmit();
    }
  }
  //处理逻辑 end

  //表单信息
  const [
    userBasicForm,
    { clearValidate, setFieldsValue, validate, validateFields, resetFields, getFieldsValue },
  ] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    isDetail.value = false;
    link_show.value = false;
    // 新增需要获取id
    let record = data.record || {};
    if (!record.id) {
      let res = await $fn.post('/health/base/oldManId');
      if (!res.success) return $fn.modal.info('获取新增信息失败');
      record.oldmanId = res.data;
    } else {
      record.oldmanId = record.id;
    }
    addId.value = record.oldmanId || record.id;
    // 新增需要获取id end
    title.value = (data && data.title) || '新增';
    if (data) {
      let type = data.type || 'add';
      if (type === 'edit' || type === 'show') {
        title.value = data.title || '修改';
        if (type === 'show') {
          title.value = data.title || '查看';
          isDetail.value = true;
        }
      }
    }
    getDataDetail(record.oldmanId);
    $fn.cleanScroll('.chao_form_warp .right');
  });
</script>

<style lang="less" scoped>
  .img_file_box {
    position: absolute;
    width: 100%;
    text-align: center;
    .img_pre {
      position: relative;
      left: 50%;
      margin-left: -60px;
      width: 120px;
      height: 140px;

      border-radius: 4px;
      border: 1px solid #ddd;
      padding: 5px;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .img_up {
      position: relative;
      font-size: 13px;
      left: 50%;
      margin-left: -50px;
      width: 100px;
      padding: 4px 5px;
      border: 1px solid @button-primary-color;
      // height: 40px;
      border-radius: 4px;
      margin-top: 5px;
      background-color: @button-primary-color;
      color: #fff;
      cursor: pointer;
    }
  }
</style>
