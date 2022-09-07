import {
  DataSourceParams,
  SaveDataSourceParams,
  DataSourceSubmitPostResultModel,
  DataSourceListGetResultModel,
} from './model/datasourceModel';
import { BasicRemoveParams } from '/@/api/model/baseModel';

import { defHttp } from '/@/utils/http/axios';

enum Api {
  DataSourceList = '/blade-develop/datasource/list',
  SubmitDataSource = '/blade-develop/datasource/submit',
  DataSourceDetail = '/blade-develop/datasource/detail',
  DataSourceRemove = '/blade-develop/datasource/remove',
  DataSourceSelect = '/blade-develop/datasource/select',
}

//获取列表
export const getDataSourceList = (params?: DataSourceParams) =>
  defHttp.get<DataSourceListGetResultModel>(
    { url: Api.DataSourceList, params },
    { joinParamsToUrl: true, joinTime: false },
  );

//提交
export const submitDataSource = (params?: SaveDataSourceParams) =>
  defHttp.post<DataSourceSubmitPostResultModel>(
    { url: Api.SubmitDataSource, params },
    { isReturnNativeResponse: true },
  );

//详情
export const getDataSourceDetail = (params?: DataSourceParams) =>
  defHttp.get<DataSourceSubmitPostResultModel>({ url: Api.DataSourceDetail, params });

//删除
export const removeDataSource = (params?: BasicRemoveParams) =>
  defHttp.post({ url: Api.DataSourceRemove, params }, { joinParamsToUrl: true });

export const getDataSourceSelect = () =>
  defHttp.get({ url: Api.DataSourceSelect }, { joinParamsToUrl: true, joinTime: false });
