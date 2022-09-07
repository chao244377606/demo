import {
  ClientPageParams,
  DetailParams,
  AddClientParams,
  ClientListGetResultModel,
} from './model/clientModel';

import { BasicRemoveParams } from '/@/api/model/baseModel';

import { defHttp } from '/@/utils/http/axios';

enum Api {
  ClientPageList = '/blade-system/client/list',
  ClientDetail = '/blade-system/client/detail',
  ClientSubmit = '/blade-system/client/submit',
  ClientRemove = '/blade-system/client/remove',
}
//获取应用分页
export const getClientPageList = (params?: ClientPageParams) =>
  defHttp.get<ClientListGetResultModel>({ url: Api.ClientPageList, params }, { joinTime: false });

//获取应用详情
export const getClientDetail = (params: DetailParams) =>
  defHttp.get({ url: Api.ClientDetail, params });

//应用新增或修改
export const submitClient = (params: AddClientParams) =>
  defHttp.post({ url: Api.ClientSubmit, params });

//应用删除
export const removeClient = (params?: BasicRemoveParams) =>
  defHttp.post({ url: Api.ClientRemove, params }, { joinParamsToUrl: true });
