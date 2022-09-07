import {
  DataSourceParams,
  SaveDataSourceParams,
  DataSourceSubmitPostResultModel,
  DataSourceListGetResultModel,
} from './model/codeModel';
import { BasicRemoveParams } from '/@/api/model/baseModel';

import { defHttp } from '/@/utils/http/axios';

enum Api {
  CodeList = '/blade-develop/code/list',
  SubmitCode = '/blade-develop/code/submit',
  CodeDetail = '/blade-develop/code/detail',
  CodeRemove = '/blade-develop/code/remove',
  GenCode = '/blade-develop/code/gen-code',
  CopyCode = '/blade-develop/code/copy',
  ViewCode = '/blade-develop/code/view-code',
}

//获取列表
export const getCodeList = (params?: DataSourceParams) =>
  defHttp.get<DataSourceListGetResultModel>(
    { url: Api.CodeList, params },
    { joinParamsToUrl: true, joinTime: false },
  );

//提交
export const submitCode = (params?: SaveDataSourceParams) =>
  defHttp.post<DataSourceSubmitPostResultModel>(
    { url: Api.SubmitCode, params },
    { isReturnNativeResponse: true },
  );

//详情
export const getCodeDetail = (params?: DataSourceParams) =>
  defHttp.get<DataSourceSubmitPostResultModel>({ url: Api.CodeDetail, params });

//删除
export const removeCode = (params?: BasicRemoveParams) =>
  defHttp.post({ url: Api.CodeRemove, params }, { joinParamsToUrl: true });

//生成
export const genCode = (params?: object) =>
  defHttp.post({ url: Api.GenCode, params }, { joinParamsToUrl: true });

//复制
export const copyCode = (params?: object) =>
  defHttp.post({ url: Api.CopyCode, params }, { joinParamsToUrl: true });

//预览
export const viewCode = (params?: object) =>
  defHttp.get({ url: Api.ViewCode, params }, { joinParamsToUrl: true });
