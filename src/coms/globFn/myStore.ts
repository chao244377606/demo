import { defineStore } from 'pinia';
import { store } from '/@/store';

export const myStore = defineStore({
  id: 'myStore',
  state: () => ({
    loading: false, //是否正在加载
    loadingTip: '', //加载提示
    dictCodeNum: '', //--老人基础档案更新字典
  }),
  actions: {
    setLoad(status = false, tip = '数据请求中,请稍后...') {
      this.loading = status;
      this.loadingTip = tip;
    },
    // 字典编号需要
    setDictCode(status) {
      this.dictCodeNum = status;
    },
  },
});

// Need to be used outside the setup
export function useMyStore() {
  return myStore(store);
}
