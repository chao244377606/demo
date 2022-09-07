import { pubFn } from './globFn/pubFn';
type mPubFn = typeof pubFn;

// 全局对象,指定windiw可挂载属性
declare global {
  const $fn: mPubFn;
  interface Window {
    $fn: mPubFn;
  }
}
// <template>中使用需要声明
declare module 'vue' {
  interface ComponentCustomProperties {
    $fn: mPubFn;
  }
}

//全局组件
// import mModal from './modal/index.vue';
import tip from './toolTip/tip.vue';
//全局组件

// template中使用
export function globFns(app) {
  app.config.globalProperties.$fn = pubFn;
  app.component('Tip', tip);
}
//script中使用
window.$fn = pubFn;

export const globFn = globFns;
