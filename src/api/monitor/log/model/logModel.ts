import { BasicSubmitResult, BasicPageParams } from '/@/api/model/baseModel';

export type DetailParams = {
  id: string;
};

export type ParamPageParams = BasicPageParams & LogParams;

export type LogParams = {
  serviceId?: string;
  serverHost?: string;
};

/**
 * @description: Request list return value
 */

export type DataSourceSubmitPostResultModel = BasicSubmitResult;
