import type { MenuModule } from '/@/router/types';
const basicFiles: MenuModule = {
  orderNo: 0,
  menu: {
    name: '老人基础档案',
    path: '/basicFiles',
    icon: 'aa',
    children: [
      {
        name: '基础档案管理',
        icon: 'aa',
        path: 'list',
      },
      {
        name: '政府救助老人查询',
        icon: 'aa',
        path: 'queryJZList',
      },
      {
        name: '老人综合查询',
        icon: 'aa',
        path: 'queryZHList',
      },
      {
        name: '基础数据设置',
        icon: 'aa',
        path: 'baseDataSet/list',
      },
    ],
  },
};
export default basicFiles;
