import { BasicSubmitResult, BasicPageParams, BasicDetailResult } from '/@/api/model/baseModel';

export type DetailParams = {
  id?: string;
};

export type ParamParams = {
  tenantId?: string;
};

export type ParamPageParams = BasicPageParams & OssParams;

export type OssParams = {
  serviceId?: string;
  serverHost?: string;
};

export type SaveOssParams = {
  id?: string;
  name: string;
  path: string;
  parentId: string;
  code: string;
  sort: number;
  category: number;
  source: string;
};

export type UploadParams = {
  code?: string;
  file: File;
};

export interface OssListItem {
  id: string;
  scopeName: string;
  scopePath: string;
  resourceCode: string;
  scopeType: string;
  scopeTypeName: number;
  remark: string;
}

export interface OssDetail {
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

export type OssListGetResultModel = OssListItem[];

export type OssSubmitPostResultModel = BasicSubmitResult;

export type OssDetailGetResultModel = BasicDetailResult<OssDetail>;
