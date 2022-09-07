import { BasicDetailResult, BasicSubmitResult } from '/@/api/model/baseModel';

export type DetailParams = {
  id?: string;
};

export type ParamParams = {
  tenantId?: string;
};

export type DataSourceParams = {
  id?: string;
  menuId?: string;
  scopeName?: string;
  resourceCode?: string;
};

export type SaveDataSourceParams = {
  id?: string;
  name: string;
  path: string;
  parentId: string;
  code: string;
  sort: number;
  category: number;
  source: string;
};

export interface DataSourceListItem {
  id: string;
  scopeName: string;
  scopePath: string;
  resourceCode: string;
  scopeType: string;
  scopeTypeName: number;
  remark: string;
}

export interface DataSourceDetail {
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

export type DataSourceListGetResultModel = DataSourceListItem[];

export type DataSourceSubmitPostResultModel = BasicSubmitResult;

export type DataSourceDetailGetResultModel = BasicDetailResult<DataSourceDetail>;
