import type { AppRouteRecordRaw } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';
import {
  REDIRECT_NAME,
  LAYOUT,
  EXCEPTION_COMPONENT,
  PAGE_NOT_FOUND_NAME,
} from '/@/router/constant';

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  code: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: PAGE_NOT_FOUND_NAME,
      code: PAGE_NOT_FOUND_NAME,
      component: EXCEPTION_COMPONENT,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true,
      },
    },
  ],
};

export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: '/redirect',
  component: LAYOUT,
  name: 'RedirectTo',
  code: 'RedirectTo',
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: REDIRECT_NAME,
      code: REDIRECT_NAME,
      component: () => import('/@/views/sys/redirect/index.vue'),
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true,
      },
    },
  ],
};

export const ERROR_LOG_ROUTE: AppRouteRecordRaw = {
  path: '/error-log',
  name: 'ErrorLog',
  code: 'ErrorLog',
  component: LAYOUT,
  redirect: '/error-log/list',
  meta: {
    title: 'ErrorLog',
    hideBreadcrumb: true,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'list',
      name: 'ErrorLogList',
      code: 'ErrorLogList',
      component: () => import('/@/views/sys/error-log/index.vue'),
      meta: {
        title: t('routes.basic.errorLogList'),
        hideBreadcrumb: true,
        currentActiveMenu: '/error-log',
      },
    },
  ],
};

export const USER_SETTING: AppRouteRecordRaw = {
  path: '/info',
  name: 'info',
  code: 'info',
  component: LAYOUT,
  meta: {
    title: '个人信息',
    hideBreadcrumb: true,
  },
  children: [
    {
      code: 'UserSetting',
      path: 'index',
      name: 'userSetting',
      component: () => import('/@/views/system/userSetting/index.vue'),
      meta: {
        title: t('routes.basic.userSetting'),
        hideBreadcrumb: true,
      },
    },
  ],
};

export const DASHBOARD: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  code: 'Dashboard',
  component: LAYOUT,
  meta: {
    title: '首页',
    hideBreadcrumb: true,
  },
  children: [
    {
      path: 'workbench',
      name: 'Workbench',
      code: 'Workbench',
      component: () => import('/@/views/dashboard/workbench/index.vue'),
      meta: {
        affix: true,
        title: t('routes.basic.home'),
        hideBreadcrumb: true,
      },
    },
  ],
};

export const WORK: AppRouteRecordRaw = {
  path: '/work/process',
  name: 'Process',
  code: 'Process',
  component: LAYOUT,
  meta: {
    title: '工作流程',
    hideBreadcrumb: true,
  },
  children: [
    {
      path: 'leave/form/:processDefinitionId',
      name: 'LeaveForm',
      code: 'LeaveForm',
      component: () => import('/@/views/work/process/leave/form.vue'),
      meta: {
        title: '请假流程',
        hideBreadcrumb: true,
      },
    },
    {
      path: 'leave/handle/:taskId/:processInstanceId/:businessId',
      name: 'LeaveHandle',
      code: 'LeaveHandle',
      component: () => import('../../views/work/process/leave/handles.vue'),
      meta: {
        title: '处理请假流程',
        hideBreadcrumb: true,
      },
    },
    {
      path: 'leave/detail/:processInstanceId/:businessId',
      name: 'LeaveDetail',
      code: 'LeaveDetail',
      component: () => import('/@/views/work/process/leave/detail.vue'),
      meta: {
        title: '请假流程详情',
        hideBreadcrumb: true,
      },
    },
  ],
};
