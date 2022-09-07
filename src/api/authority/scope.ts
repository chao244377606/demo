import {
  ApiScopeParams,
  SaveApiScopeParams,
  ApiscopeSubmitPostResultModel,
  ApiscopeListGetResultModel,
} from './model/scopeModel';
import { BasicRemoveParams } from '/@/api/model/baseModel';

import { defHttp } from '/@/utils/http/axios';

enum Api {
  ApiScopeList = '/blade-system/api-scope/list',
  SaveApiScope = '/blade-system/api-scope/submit',
  ApiScopeDetail = '/blade-system/api-scope/detail',
  ApiScopeRemove = '/blade-system/api-scope/remove',
  DataScopeList = '/blade-system/data-scope/list',
  SaveDataScope = '/blade-system/data-scope/submit',
  DataScopeDetail = '/blade-system/data-scope/detail',
  DataScopeRemove = '/blade-system/data-scope/remove',
}

//获取接口权限列表
export const getApiScopeList = (params?: ApiScopeParams) =>
  defHttp.get<ApiscopeListGetResultModel>(
    { url: Api.ApiScopeList, params },
    { joinParamsToUrl: true, joinTime: false },
  );

//接口权限提交
export const submitApiScope = (params?: SaveApiScopeParams) =>
  defHttp.post<ApiscopeSubmitPostResultModel>(
    { url: Api.SaveApiScope, params },
    { isReturnNativeResponse: true },
  );

//接口权限详情
export const getApiScopeDetail = (params?: ApiScopeParams) =>
  defHttp.get<ApiscopeListGetResultModel>({ url: Api.ApiScopeDetail, params });

//接口权限删除
export const removeApiScope = (params?: BasicRemoveParams) =>
  defHttp.post({ url: Api.ApiScopeRemove, params }, { joinParamsToUrl: true });

//获取数据权限列表
export const getDataScopeList = (params?: ApiScopeParams) =>
  defHttp.get<ApiscopeListGetResultModel>(
    { url: Api.DataScopeList, params },
    { joinParamsToUrl: true, joinTime: false },
  );

//数据权限提交
export const submitDataScope = (params?: SaveApiScopeParams) =>
  defHttp.post<ApiscopeSubmitPostResultModel>(
    { url: Api.SaveDataScope, params },
    { isReturnNativeResponse: true },
  );

//数据权限详情
export const getDataScopeDetail = (params?: ApiScopeParams) =>
  defHttp.get<ApiscopeListGetResultModel>({ url: Api.DataScopeDetail, params });

//数据权限删除
export const removeDataScope = (params?: BasicRemoveParams) =>
  defHttp.post({ url: Api.DataScopeRemove, params }, { joinParamsToUrl: true });
