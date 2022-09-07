<template>
  <BasicModal
    v-bind="$attrs"
    cancelText="关闭"
    okText="保存"
    @register="registerModal"
    :title="title"
    @ok="handleSubmit"
    :showOkBtn="!isDetail"
  >
    <div class="chao_form_warp">
      <div class="right">
        <BasicForm :disabled="isDetail" @register="userBasicForm">
          <!-- 四级联动 -->
          <template #linkage="{ model, field }">
            <fourLinkAge
              v-if="linkOk"
              class="link_mb_20"
              @changeOk="changeOk"
              :disabled="isDetail"
              v-model="model[field]"
            />
          </template>
        </BasicForm>
      </div>
    </div>
  </BasicModal>
</template>

<script lang="ts" setup>
  import fourLinkAge from '/@/coms/fourLinkAge/fourLinkAge.vue';

  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { jiashuForm } from './data';

  const emit = defineEmits(['ok']);
  let isDetail = ref(false);
  let title = ref('新增');
  let addId = ref('');
  let linkOk = ref(false);

  //查看编辑获取数据
  async function getData(record) {
    console.log(record);
    let res = await $fn.get('/health/base/familyInfoOne', { id: record.id });
    if (res.success) {
      setFieldsValue({
        ...res.data,
      });
    }
    linkOk.value = true;
  }

  async function handleSubmit() {
    await Promise.all([validate()]);
    $fn.store.setLoad(true);
    let form = getFieldsValue();
    console.log(form, 'formform');
    let url = form.id ? '/health/base/familyInfoUpdate' : '/health/base/familyInfoAdd';
    form.oldmanId = addId.value;
    let res = await $fn.post(url, form);
    if ($fn.ok(res, '保存成功')) {
      closeModal();
      emit('ok');
    }
    $fn.store.setLoad(false);
  }
  //处理逻辑 end

  async function changeOk() {
    await validateFields(['liveAddress']);
    // console.log(str);
  }
  //表单信息
  const [userBasicForm, { getFieldsValue, validateFields, setFieldsValue, validate, resetFields }] =
    useForm({
      labelWidth: 100,
      schemas: jiashuForm,
      showActionButtonGroup: false,
    });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    linkOk.value = false;
    //打开逻辑 s
    isDetail.value = false;
    title.value = (data && data.title) || '新增';
    addId.value = data.record.oldmanId;
    let type = data.type || 'add';
    if (type === 'edit' || type === 'show') {
      title.value = data.title || '修改';
      if (type === 'show') {
        title.value = data.title || '查看';
        isDetail.value = true;
      }
      getData(data.record);
    } else {
      linkOk.value = true;
    }
  });
</script>

<style lang="less" scoped></style>
