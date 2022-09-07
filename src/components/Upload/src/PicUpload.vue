<template>
  <div>
    <Upload name="file" list-type="picture-card" :show-upload-list="false" :customRequest="upload">
      <img v-if="picUrlRef" :src="picUrlRef" />
      <div v-else>
        <div class="ant-upload-text">上传</div>
      </div>
    </Upload>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, watch, computed } from 'vue';

  import { uploadPicProps } from './props';
  import { omit } from 'lodash-es';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { uploadOssDefult } from '/@/api/resource/oss';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Upload } from 'ant-design-vue';

  export default defineComponent({
    name: 'PicUpload',
    components: { Upload },
    props: uploadPicProps,
    emits: ['change', 'update:value'],

    setup(props, { emit, attrs }) {
      const { t } = useI18n();

      const { createMessage } = useMessage();

      const picUrlRef = ref<string>();

      const bindValue = computed(() => {
        const value = { ...attrs, ...props };
        return omit(value, 'onChange');
      });

      watch(
        () => props.value,
        (value) => {
          picUrlRef.value = value ? value : '';
        },
        { immediate: true },
      );

      //上传接口，可根据实际情况自己修改
      const upload = async (param) => {
        const { data } = await uploadOssDefult({ file: param.file });
        picUrlRef.value = data.data.link;
        emit('update:value', picUrlRef.value);
        emit('change', picUrlRef.value);
        createMessage.success('上传成功');
      };

      return {
        picUrlRef,
        upload,
        bindValue,
        t,
      };
    },
  });
</script>
