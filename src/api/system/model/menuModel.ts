import { BasicFetchResult, BasicDetailResult, BasicSubmitResult } from '/@/api/model/baseModel';

export type DetailParams = {
  id?: string;
};

export type ParamParams = {
  tenantId?: string;
};

export type LazyMenuParams = {
  parentId: number;
};

export type RoleTreeKeysParams = {
  roleIds: string;
};

export type SaveRoleGrantParams = {
  apiScopeIds: string[];
  dataScopeIds: string[];
  menuIds: string[];
  roleIds: string[];
};

export type MenuParams = {
  id?: string;
  menuName?: string;
  status?: string;
};

export type SaveMenuParams = {
  id?: string;
  name: string;
  path: string;
  parentId: string;
  code: string;
  sort: number;
  category: number;
  source: string;
};

export interface MenuListItem {
  id: string;
  name: string;
  path: string;
  parentId: string;
  code: string;
  sort: number;
  source: string;
}

export interface MenuDetail {
  id: string;
  name: string;
  path: string;
  parentId: string;
  code: string;
  sort: number;
  //菜单图标
  source: string;
  //菜单类型
  category: number;
}

/**
 * @description: Request list return value
 */

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;

export type MenuSubmitPostResultModel = BasicSubmitResult;

export type MenuDetailGetResultModel = BasicDetailResult<MenuDetail>;
