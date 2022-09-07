<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <RegionTree class="w-2/4 xl:w-2/5" @select="handleSelect" />
    <div class="m-4 mr-0 bg-white">
      <Space direction="vertical" size="small">
        <Card>
          <a-button type="primary" v-auth="'region_add'" @click="addChildren">新增下级</a-button>
          <a-button type="primary" v-auth="'region_delete'" @click="handleDelete" danger
            >删除</a-button
          >
          <a-button v-auth="'region_export'" @click="handleExport">导出</a-button>
          <a-button type="primary" v-auth="'region_debug'" @click="handleDebugger">调试</a-button>
        </Card>
        <BasicForm @register="registerForm" class="w-2/4 xl:w-3/5">
          <template #codeSlot="{ model, field }">
            <Input :addon-before="model.parentCode" v-model:value="model[field]" />
          </template>
          <template #levelSlot="{ model, field }">
            <RadioGroup v-model:value="model[field]">
              <template v-for="item in levelOption" :key="`${item.dictKey}`">
                <Radio :value="item.dictKey">
                  {{ item.dictValue }}
                </Radio>
              </template>
            </RadioGroup>
          </template>
        </BasicForm>
      </Space>
    </div>
    <RegionSelectModal @register="debuggerModal" />
  </PageWrapper>
</template>
<script lang="ts" setup name="Region">
  import { ref, h } from 'vue';

  import { detail, remove, submit } from '/@/api/system/region';
  import { PageWrapper } from '/@/components/Page';
  import RegionTree from './RegionTree.vue';
  import RegionSelectModal from './RegionSelectModal.vue';
  import { useUserStore } from '/@/store/modules/user';

  import { Input, Radio, Card, Space } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useModal } from '/@/components/Modal';
  import website from '/@/settings/website';

  import { formSchema } from './region.data';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { getDictList } from '/@/api/system/system';
  const levelOption = ref();
  const { createMessage, createConfirm } = useMessage();
  const RadioGroup = Radio.Group;

  const [debuggerModal, { openModal }] = useModal();

  const [registerForm, { setFieldsValue, validate, getFieldsValue }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: true,
    submitFunc: handleSubmit,
    submitButtonOptions: { text: '提交' },
    baseColProps: {
      span: 24,
    },
    actionColOptions: {
      span: 23,
    },
  });
  async function initDict() {
    const data = await getDictList({ code: 'region' });
    levelOption.value = data;
  }

  initDict();
  async function handleSelect(code = '00') {
    const data = await detail({ code: code });
    setFieldsValue({
      ...data,
      subCode: data.code.replace(data.parentCode, ''),
    });
  }

  function addChildren() {
    const values = getFieldsValue();
    if (!values.code || !values.name) {
      createMessage.error('请先选择一项区划');
      return;
    }
    setFieldsValue({
      parentCode: values.code,
      parentName: values.name,
      code: '',
      subCode: '',
      name: '',
      regionLevel: values.regionLevel === 5 ? 5 : values.regionLevel + 1,
    });
  }

  function handleDebugger() {
    openModal(true);
  }
  function handleExport() {
    createConfirm({
      iconType: 'warning',
      title: () => h('span', '确认'),
      content: () => h('span', '是否导出行政区划数据?'),
      onOk: () => {
        window.open(
          `/api/blade-system/region/export-region?${website.tokenHeader}=${
            useUserStore().getToken
          }`,
        );
      },
    });
  }

  async function handleSubmit() {
    const values = await validate();
    const parentCode = values.parentCode === '00' ? '' : values.parentCode;
    values.code = parentCode + values.subCode;
    await submit(values);
    createMessage.success('添加成功');
  }

  async function handleDelete() {
    const values = getFieldsValue();
    if (!values.code) {
      createMessage.error('请先选择一项区划');
      return;
    }
    createConfirm({
      iconType: 'warning',
      title: () => h('span', `确认`),
      content: () => h('span', `确定将 [${values.name}] 数据删除?`),
      onOk: async () => {
        await remove({ id: values.id });
        createMessage.success('操作成功');
      },
    });
  }
</script>
