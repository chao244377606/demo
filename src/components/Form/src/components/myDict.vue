<template>
  <Select
    v-if="type === 'select'"
    v-bind="$attrs"
    @change="handleChange"
    :options="getOptions"
    :showSearch="showSearch"
    :filterOption="filterOption"
    v-model:value="state"
  />

  <!-- 单选 -->
  <RadioGroup v-if="type == 'radio'" @change="handleChange" v-model:value="state" v-bind="$attrs">
    <Radio v-for="item in getOptions" :key="item.value" :value="item.value">
      {{ item.label }}
    </Radio>
  </RadioGroup>

  <!-- 复选框 -->
  <CheckboxGroup
    v-model:value="state"
    v-bind="$attrs"
    @change="handleChange"
    v-if="type == 'checkbox'"
  >
    <Checkbox name="Checkbox" v-for="item in getOptions" :key="item.value" :value="item.value">
      {{ item.label }}
    </Checkbox>
  </CheckboxGroup>
</template>
<script lang="ts">
  import { defineComponent, PropType, ref, watchEffect, computed, unref, watch } from 'vue';
  import { Select, RadioGroup, Radio, CheckboxGroup, Checkbox } from 'ant-design-vue';
  import { get, omit } from 'lodash-es';
  import { propTypes } from '/@/utils/propTypes';

  type OptionsItem = { label: string; value: string; disabled?: boolean };

  export default defineComponent({
    name: 'MyDict',
    components: {
      Select,
      RadioGroup,
      Radio,
      Checkbox,
      CheckboxGroup,
    },
    props: {
      showSearch: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: 'select',
      },
      code: {
        type: String,
        default: '',
      },
      value: [Array, Object, String, Number],
      api: {
        type: String,
        default: null,
      },
      params: {
        type: Object as PropType<Recordable>,
        default: () => ({}),
      },
      // 额外配置
      resultField: propTypes.string.def(''),
      labelField: propTypes.string.def('value'),
      valueField: propTypes.string.def('key'),
      immediate: propTypes.bool.def(true),
      alwaysLoad: propTypes.bool.def(true),
    },
    emits: ['options-change', 'change'],
    setup(props, { emit }) {
      const options = ref<OptionsItem[]>([]);

      const type = ref(props.type);
      let state = ref();

      const getOptions = computed(() => {
        const { labelField, valueField, code } = props;
        let key = valueField;
        let val = labelField;
        // 有code 则走本地化字典
        if (code) {
          key = 'key';
          val = 'value';
        }
        return unref(options).reduce((prev, next: Recordable) => {
          if (next) {
            const value = next[key];
            prev.push({
              ...omit(next, [val, key]),
              label: next[val],
              value: value + '',
            });
          }
          return prev;
        }, [] as OptionsItem[]);
      });

      watchEffect(() => {
        props.immediate && props.alwaysLoad && fetch();
      });

      watch(
        () => props.value,
        (val) => {
          let neVal: any = '';
          if (val === 0) {
            state.value = '0';
          } else if (val) {
            neVal = val.toString();
            if (type.value === 'checkbox') {
              neVal = neVal.split(',');
            }
            state.value = neVal;
          } else {
            state.value = undefined;
          }
        },
        { deep: true },
      );

      async function fetch() {
        options.value = [];
        //查询本地字典
        if (props.code) {
          return (options.value = $fn.dictList(props.code));
        }
        if (props.api) {
          const res = await $fn.get(props.api, props.params);
          if (Array.isArray(res.data)) {
            return (options.value = res.data);
          }
          if (props.resultField) {
            options.value = get(res.data, props.resultField) || [];
          }
        } else {
          //假数据
          let aa: any = [
            { dictValue: '朱雀', dictCode: '1' },
            { dictValue: '玄武', dictCode: '2' },
            { dictValue: '青龙', dictCode: '3' },
            { dictValue: '白虎', dictCode: '4' },
          ];
          options.value = aa;
        }
      }

      function handleChange() {
        let nval: any = '';
        if (state.value) {
          nval = JSON.parse(JSON.stringify(state.value));
          if (type.value === 'checkbox') {
            if (state.value.length) {
              nval = nval.join(',');
            }
          }
        }
        emit('change', nval);
      }
      //过滤搜索项
      const filterOption = (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      };
      return { state, getOptions, handleChange, filterOption };
    },
  });
</script>
