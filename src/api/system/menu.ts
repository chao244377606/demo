import {
  MenuParams,
  SaveMenuParams,
  LazyMenuParams,
  RoleTreeKeysParams,
  MenuSubmitPostResultModel,
  MenuListGetResultModel,
  SaveRoleGrantParams,
} from './model/menuModel';
import { BasicRemoveParams } from '/@/api/model/baseModel';

import { defHttp } from '/@/utils/http/axios';

enum Api {
  MenuList = '/blade-system/menu/tree',
  SaveMenu = '/blade-system/menu/submit',
  MenuDetail = '/blade-system/menu/detail',
  MenuRemove = '/blade-system/menu/remove',
  LazyMenuList = '/blade-system/menu/lazy-menu-list',
  LazyList = '/blade-system/menu/lazy-list',
  GrantTree = '/blade-system/menu/grant-tree',
  RoleTreeKeys = '/blade-system/menu/role-tree-keys',
  RoleGrant = '/blade-system/role/grant',
}

//获取菜单列表
export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });

//菜单提交
export const submitMenu = (params?: SaveMenuParams) =>
  defHttp.post<MenuSubmitPostResultModel>(
    { url: Api.SaveMenu, params },
    { isReturnNativeResponse: true },
  );

export const getMenuDetail = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuDetail, params });

//菜单删除
export const removeMenu = (params?: BasicRemoveParams) =>
  defHttp.post({ url: Api.MenuRemove, params }, { joinParamsToUrl: true });

export const getLazyList = (params?: LazyMenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.LazyList, params });

export const getLazyMenuList = (params?: LazyMenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.LazyMenuList, params });

export const getGrantTree = () => defHttp.get({ url: Api.GrantTree });

export const getRoleTreeKeys = (params: RoleTreeKeysParams) =>
  defHttp.get({ url: Api.RoleTreeKeys, params }, { joinTime: false, joinParamsToUrl: true });

//权限
export const submitRoleGrant = (params?: SaveRoleGrantParams) =>
  defHttp.post({ url: Api.RoleGrant, params });
