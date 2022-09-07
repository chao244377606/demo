<template>
  <div class="liandong">
    <FormItem>
      <Select
        :disabled="disabled"
        placeholder="省"
        v-model:value="data.sheng"
        :options="options.sheng"
        :fieldNames="{ label: 'criName', value: 'criCode' }"
        @change="changeSheng"
      />
    </FormItem>
    <FormItem
      ><Select
        :fieldNames="{ label: 'criName', value: 'criCode' }"
        :disabled="disabled"
        placeholder="市"
        v-model:value="data.shi"
        :options="options.shi"
        @change="changeShi"
    /></FormItem>
    <FormItem
      ><Select
        :fieldNames="{ label: 'criName', value: 'criCode' }"
        :disabled="disabled"
        placeholder="区县"
        v-model:value="data.qu"
        :options="options.qu"
        @change="changeQu"
    /></FormItem>
    <FormItem
      ><Select
        :fieldNames="{ label: 'criName', value: 'criCode' }"
        :disabled="disabled"
        placeholder="街镇"
        v-model:value="data.jie"
        :options="options.jie"
        @change="changeJie"
    /></FormItem>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, reactive, watch, toRefs } from 'vue';
  import { Select, FormItem } from 'ant-design-vue';
  const props = defineProps({
    modelValue: {
      type: String,
      defult: '',
    },
    disabled: {
      type: Boolean,
      defult: false,
    },
  });
  let { modelValue, disabled } = toRefs(props);
  let data: any = reactive({ sheng: undefined, shi: undefined, qu: undefined, jie: undefined });
  let isFirst = true;
  let options: any = reactive({
    sheng: [],
    shi: [],
    qu: [],
    jie: [],
  });
  //监听重置操作
  watch(
    modelValue as any,
    (newData) => {
      if (!newData) {
        // 重置操作
        data.sheng = undefined;
        data.shi = undefined;
        data.qu = undefined;
        data.jie = undefined;

        options.shi = [];
        options.qu = [];
        options.jie = [];
      } else {
        // 只有第一次才去回显联动查询
        if (isFirst) {
          // 默认回显数据
          let sp_data = newData.split(',');
          if (sp_data && sp_data[0]) {
            data.sheng = sp_data[0];
            getShiList(sp_data[0]);
            //市存在则查询区数据
            if (sp_data[1]) {
              data.shi = sp_data[1];
              getQuList(sp_data[1]);
              //区存在则查询街道数据
              if (sp_data[2]) {
                data.qu = sp_data[2];
                getJieList(sp_data[2]);
                if (sp_data[3]) {
                  data.jie = sp_data[3];
                }
              }
            }
          }
          isFirst = false;
        }
      }
    },
    { immediate: true, deep: false },
  );
  getShengList(); //默认获取省级数据
  function getShengList() {
    //获取接口数据
    $fn.get('/health/baseData/region', { code: '000000' }).then((res) => {
      options.sheng = res.data;
    });
  }
  function getShiList(code) {
    $fn.get('/health/baseData/region', { code: code }).then((res) => {
      options.shi = res.data;
    });
  }
  function getQuList(code) {
    $fn.get('/health/baseData/region', { code: code }).then((res) => {
      options.qu = res.data;
    });
  }
  function getJieList(code) {
    $fn.get('/health/baseData/region', { code: code }).then((res) => {
      options.jie = res.data;
    });
  }

  //下拉改变重新请求数据
  function changeSheng(val) {
    getShiList(val);
    data.shi = undefined;
    options.shi = [];
    data.qu = undefined;
    options.qu = [];
    data.jie = undefined;
    options.jie = [];
    update();

    isFirst = false;
  }
  function changeShi(val) {
    getQuList(val);
    data.qu = undefined;
    options.qu = [];
    data.jie = undefined;
    options.jie = [];
    update();
  }
  function changeQu(val) {
    getJieList(val);
    data.jie = undefined;
    options.jie = [];
    update();
  }
  function changeJie() {
    update();
  }

  const emit = defineEmits(['update:modelValue', 'changeOk']);
  const update = () => {
    //传递给父组件
    let newArr: any = [];
    if (data.sheng) {
      newArr.push(data.sheng);
      if (data.shi) {
        newArr.push(data.shi);
        if (data.qu) {
          newArr.push(data.qu);
          if (data.jie) {
            newArr.push(data.jie);
          }
        }
      }
    }
    // console.log(newArr.join());
    emit('changeOk', newArr.join());
    emit('update:modelValue', newArr.join());
  };
</script>

<style scoped lang="less">
  .liandong {
    width: 100%;
    overflow: hidden;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    .ant-form-item {
      margin-right: 6px;
      width: 24%;
    }
  }
</style>
