import { DetailParams, ParamPageParams } from './model/logModel';

import { defHttp } from '/@/utils/http/axios';

enum Api {
  UsualList = '/blade-log/usual/list',
  ApiList = '/blade-log/api/list',
  ErrorList = '/blade-log/error/list',
  UsualDetail = '/blade-log/usual/detail',
  ApiDetail = '/blade-log/api/detail',
  ErrorDetail = '/blade-log/error/detail',
}

//获取通用日志列表
export const getUsualList = (params?: ParamPageParams) =>
  defHttp.get({ url: Api.UsualList, params }, { joinParamsToUrl: true, joinTime: false });

//获取接口日志列表
export const getApiList = (params?: ParamPageParams) =>
  defHttp.get({ url: Api.ApiList, params }, { joinParamsToUrl: true, joinTime: false });

//获取错误日志列表
export const getErrorList = (params?: ParamPageParams) =>
  defHttp.get({ url: Api.ErrorList, params }, { joinParamsToUrl: true, joinTime: false });

//通用日志详情
export const getUsualDetail = (params: DetailParams) =>
  defHttp.get({ url: Api.UsualDetail, params });

//接口日志详情
export const getApiDetail = (params: DetailParams) => defHttp.get({ url: Api.ApiDetail, params });

//错误日志详情
export const getErrorDetail = (params: DetailParams) =>
  defHttp.get({ url: Api.ErrorDetail, params });
