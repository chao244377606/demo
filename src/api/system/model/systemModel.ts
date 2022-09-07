import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type DetailParams = {
  id?: string;
};

export type AddDictParams = {
  id?: string;
  code: string;
  dictValue: string;
  sort: number;
  isSealed: number;
  remark: string;
};

export type RoleParams = {
  tenantId?: string;
  roleName?: string;
  status?: string;
};

export type RolePageParams = BasicPageParams & RoleParams;

export type ParamPageParams = BasicPageParams;

export type DictPageParams = BasicPageParams & DictParams;

export type ParamParams = {
  tenantId?: string;
};

export type LazyMenuParams = {
  parentId: number;
};

export type DictParams = {
  id?: string;
  code?: string;
  parentId?: string;
  dictValue?: string;
};

export interface TenantListItem {
  id: string;
  tenantId: string;
  tenantName: string;
}
export interface RoleListItem {
  id: string;
  title: string;
  value: string;
  hasChildren: boolean;
  parentId: string;
  key: string;
  children: RoleListItem[];
}
export interface DictListItem {
  dictValue: string;
  dictKey: number;
}

/**
 * @description: Request list return value
 */

export type TenantListGetResultModel = TenantListItem[];

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;

export type RoleListGetResultModel = RoleListItem[];

export type DictListGetResultModel = DictListItem[];
