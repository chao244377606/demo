<template>
  <BasicModal
    v-bind="$attrs"
    @register="noticeModal"
    :title="getTitle"
    @ok="handleSubmit"
    :showOkBtn="!isDetail"
    :width="900"
  >
    <div v-show="isDetail">
      <Description show="isDetail" size="middle" @register="noticeDetail" :column="2" />
    </div>
    <div v-show="!isDetail">
      <BasicForm @register="noticeForm">
        <template #content="{ model, field }">
          <Tinymce v-model="model[field]" width="100%" />
        </template>
      </BasicForm>
    </div>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema, detailSchema } from './notice.data';
  import { getnoticeDetail, submitnotice } from '/@/api/desk/notice';
  import { Description, useDescription } from '/@/components/Description/index';
  import { Tinymce } from '/@/components/Tinymce/index';
  import { select } from '/@/api/system/region';

  export default defineComponent({
    name: 'NoticeModal',
    components: { BasicModal, BasicForm, Description, Tinymce },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isDetail = ref(true);
      const isUpdate = ref(true);
      const rowId = ref('');
      //级联选择器数据
      const options = ref();
      //详情
      const [noticeDetail, { setDescProps }] = useDescription({
        schema: detailSchema,
      });

      const [noticeForm, { setFieldsValue, resetFields, validate, updateSchema }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: {
          span: 12,
        },
        actionColOptions: {
          span: 23,
        },
      });

      const [noticeModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        isDetail.value = !!data?.isDetail;
        if (unref(isDetail)) {
          const detail = await getnoticeDetail({ id: data.record.id });
          setDescProps({
            data: detail,
          });
        } else {
          //打开弹框时初始化级联选择器数据
          const selectData = await select();
          selectData.forEach((item) => {
            //由于bladex接口没有这个字段，手动增加增加展示下级选项
            (item as any).isLeaf = false;
          });
          options.value = selectData;
          //更新表单参数
          updateSchema({
            field: 'province',
            //更新级联选择器组件的参数
            componentProps: {
              options: unref(options),
              changeOnSelect: true,
              //使用 loadData 实现动态加载选项
              loadData: async (selectedOptions) => {
                const targetOption = selectedOptions[selectedOptions.length - 1];
                const childData = await select({ code: targetOption.code });
                childData.forEach((item) => {
                  //如果三级不展示下级，根据自己实际需求修改
                  if (item.regionLevel != 3) {
                    (item as any).isLeaf = false;
                  }
                });
                targetOption.children = childData;
                options.value = [...options.value];
              },
            },
          });
          if (unref(isUpdate)) {
            rowId.value = data.record.id;
            const detailData = await getnoticeDetail({ id: data.record.id });
            setFieldsValue({
              ...detailData,
              title: detailData.title ? [detailData.title] : [],
            });
          }
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          if (unref(isUpdate)) {
            values.id = rowId.value;
          }
          await submitnotice(values);
          closeModal();
          emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return {
        noticeModal,
        noticeForm,
        noticeDetail,
        getTitle,
        handleSubmit,
        isUpdate,
        isDetail,
      };
    },
  });
</script>
