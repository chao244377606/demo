import { BasicDetailResult, BasicSubmitResult } from '/@/api/model/baseModel';

export type DetailParams = {
  id?: string;
};

export type ParamParams = {
  tenantId?: string;
};

export type LazyMenuParams = {
  parentId: number;
};

export type ApiScopeParams = {
  id?: string;
  menuId?: string;
  scopeName?: string;
  resourceCode?: string;
};

export type SaveApiScopeParams = {
  id?: string;
  name: string;
  path: string;
  parentId: string;
  code: string;
  sort: number;
  category: number;
  source: string;
};

export interface ApiscopeListItem {
  id: string;
  scopeName: string;
  scopePath: string;
  resourceCode: string;
  scopeType: string;
  scopeTypeName: number;
  remark: string;
}

export interface ApiscopeDetail {
  id: string;
  scopeName: string;
  scopePath: string;
  resourceCode: string;
  scopeType: string;
  scopeTypeName: number;
  remark: string;
}

/**
 * @description: Request list return value
 */

export type ApiscopeListGetResultModel = ApiscopeListItem[];

export type ApiscopeSubmitPostResultModel = BasicSubmitResult;

export type ApiscopeDetailGetResultModel = BasicDetailResult<ApiscopeDetail>;
