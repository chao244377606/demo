import { BasicSubmitResult, BasicPageParams, BasicDetailResult } from '/@/api/model/baseModel';

export type DetailParams = {
  id?: string;
};

export type ParamParams = {
  tenantId?: string;
};

export type ParamPageParams = BasicPageParams & SmsParams;

export type SmsParams = {
  serviceId?: string;
  serverHost?: string;
};

export type SaveSmsParams = {
  id?: string;
};

export type UploadParams = {
  code?: string;
  file: File;
};

export interface SmsListItem {
  id: string;
}

export interface SmsDetail {
  id: string;
}

/**
 * @description: Request list return value
 */

export type SmsListGetResultModel = SmsListItem[];

export type SmsSubmitPostResultModel = BasicSubmitResult;

export type SmsDetailGetResultModel = BasicDetailResult<SmsDetail>;
