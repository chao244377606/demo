import { LAYOUT } from '/@/router/constant';

const myRouters = [
  {
    path: '/basicFiles',
    name: 'basicFiles',
    component: LAYOUT,
    redirect: '/basicFiles/list',
    meta: {
      icon: 'bi:search-heart',
      title: '老人基础档案',
    },
    children: [
      {
        path: '/basicFiles/list',
        name: 'basicFilesList',
        component: () => import('/@/views/healthy/basicFiles/listManage/list.vue'),
        meta: {
          title: '基础档案管理',
        },
      },
      {
        path: '/basicFiles/queryJZList',
        name: 'queryJZList',
        component: () => import('/@/views/healthy/basicFiles/queryList/queryJZList.vue'),
        meta: {
          title: '政府救助老人查询',
        },
      },
      {
        path: '/basicFiles/queryZHList',
        name: 'queryZHList',
        component: () => import('/@/views/healthy/basicFiles/queryList/queryZHList.vue'),
        meta: {
          title: '老人综合查询',
        },
      },
      {
        path: '/basicFiles/baseDataSet/list',
        name: 'baseDataSetList',
        component: () => import('/@/views/healthy/baseDataSet/list.vue'),
        meta: {
          title: '基础数据设置',
        },
      },
    ],
  },
  {
    path: '/cs',
    name: 'cs',
    component: LAYOUT,
    redirect: '/cs/cs1',
    meta: {
      icon: 'bi:search-heart',
      title: '测试菜单',
    },
    children: [
      {
        path: 'cs1',
        name: 'cs1',
        component: () => import('/@/views/healthy/cs/cs.vue'),
        meta: {
          title: '测试子级',
        },
      },
      {
        path: 'cs2',
        name: 'cs2',
        component: () => import('/@/views/healthy/cs/cs2.vue'),
        meta: {
          title: '测试子级22',
        },
      },
    ],
  },
];

export const myRouter = myRouters;
