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
      <Description show="isDetail" size="middle" @register="noticeDetail" :column="1" />
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
  export default defineComponent({
    name: 'NoticeModal',
    components: { BasicModal, BasicForm, Description, Tinymce },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isDetail = ref(true);
      const isUpdate = ref(true);
      const rowId = ref('');
      //详情
      const [noticeDetail, { setDescProps }] = useDescription({
        schema: detailSchema,
      });

      const [noticeForm, { setFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 70,
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
        setModalProps({ confirmLoading: true, loading: true });
        resetFields();
        isUpdate.value = !!data?.isUpdate;
        isDetail.value = !!data?.isDetail;
        if (!data?.add) {
          const detail = await getnoticeDetail({ id: data.record.id });
          detail.category = detail.category + '';
          rowId.value = data.record.id;
          if (unref(isDetail)) {
            setDescProps({
              data: detail,
            });
          } else {
            if (unref(isUpdate)) {
              setFieldsValue({
                ...detail,
              });
            }
          }
        }
        setModalProps({ confirmLoading: false, loading: false });
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
