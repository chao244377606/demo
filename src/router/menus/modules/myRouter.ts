import type { MenuModule } from '/@/router/types';
const myRouterMenu: MenuModule = {
  orderNo: 1,
  menu: {
    name: '测试菜单',
    path: '/cs',
    icon: 'aa',
    children: [
      {
        path: 'cs1',
        name: '测试功能',
        icon: 'aa',
      },
      {
        path: 'cs2',
        name: '测试功能22',
        icon: 'aa1',
      },
    ],
  },
};
export default myRouterMenu;
