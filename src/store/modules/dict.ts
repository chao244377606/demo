import { defineStore } from 'pinia';
import { store } from '/@/store';
import { getDictList } from '/@/api/system/system';

export interface Flow {
  routeKey: string;
  routeValue: string;
}
interface FlowState {
  flowRoutes: Flow[];
}

export const useFlowStore = defineStore({
  id: 'flow',
  state: (): FlowState => ({
    flowRoutes: [],
  }),
  getters: {
    getFlowRouter(): Flow[] {
      return this.flowRoutes || [];
    },
  },
  actions: {
    async setflowRoutes() {
      const data = await getDictList({
        code: 'flow',
      });
      this.flowRoutes = data.map((item) => {
        return {
          routeKey: `${item.code}_${item.dictKey}`,
          routeValue: item.remark,
        };
      });
    },
  },
});

// Need to be used outside the setup
export function useFlowStoreWithOut() {
  return useFlowStore(store);
}
