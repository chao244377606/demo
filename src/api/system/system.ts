import {
  RoleParams,
  RolePageParams,
  DictParams,
  ParamPageParams,
  AddDictParams,
  TenantListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
} from './model/systemModel';

import { BasicRemoveParams } from '/@/api/model/baseModel';

import { defHttp } from '/@/utils/http/axios';

enum Api {
  TenantList = '/blade-system/tenant/select',
  GetAllRoleList = '/blade-system/role/tree',
  setRoleStatus = '/system/setRoleStatus',
  RolePageList = '/blade-system/role/list',
  // DictList = '/blade-system/dict/dictionary',
  DictList = '/health/baseData/data?dataType=4',
  ParamPageList = '/blade-system/param/list',
  ParamSubmit = '/blade-system/param/submit',
  ParamDetail = '/blade-system/param/detail',
  ParamRemove = '/blade-system/param/remove',
  DictParentPage = '/blade-system/dict/parent-list',
  DictChildrenPage = '/blade-system/dict/child-list',
  DictDetail = '/blade-system/dict/detail',
  DictBizDetail = '/blade-system/dict-biz/detail',
  DictBizParentPage = '/blade-system/dict-biz/parent-list',
  DictBizChildrenPage = '/blade-system/dict-biz/child-list',
  DictSubmit = '/blade-system/dict/submit',
  DictBizSubmit = '/blade-system/dict-biz/submit',
  DictRemove = '/blade-system/dict/remove',
  DictBizRemove = '/blade-system/dict-biz/remove',
  AllDictList = '/blade-system/dict/list',
}

//获取租户列表
export const getTenantList = () =>
  defHttp.get<TenantListGetResultModel>({ url: Api.TenantList }, { joinTime: false });

//获取角色分页列表
export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params }, { joinTime: false });

//获取所有角色
export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

//获取参数管理分页
export const getParamPageList = (params?: ParamPageParams) =>
  defHttp.get({ url: Api.ParamPageList, params }, { joinTime: false });

//获取字典
export const getDictList = (params?: DictParams) => defHttp.get({ url: Api.DictList, params });

//获取所有字典
export const getAllDictList = (params?: DictParams) =>
  defHttp.get({ url: Api.AllDictList, params });

//获取系统字典父级分页
export const getDictParentPage = (params?: ParamPageParams) =>
  defHttp.get({ url: Api.DictParentPage, params }, { joinTime: false });

//获取系统字典详情分页
export const getDictChildrenPage = (params?: DictParams) =>
  defHttp.get({ url: Api.DictChildrenPage, params }, { joinTime: false });

//获取业务字典父级分页
export const getDictBizParentPage = (params?: ParamPageParams) =>
  defHttp.get({ url: Api.DictBizParentPage, params }, { joinTime: false });

//获取业务字典子级分页
export const getDictBizChildrenPage = (params?: DictParams) =>
  defHttp.get({ url: Api.DictBizChildrenPage, params }, { joinTime: false });

//获取系统字典详情
export const getDictDetail = (params?: DictParams) =>
  defHttp.get({ url: Api.DictDetail, params }, { joinTime: false });

//获取业务字典详情
export const getBizDictDetail = (params?: DictParams) =>
  defHttp.get({ url: Api.DictBizDetail, params }, { joinTime: false });

//系统字典提交
export const submitDict = (params?: AddDictParams) => defHttp.post({ url: Api.DictSubmit, params });

//业务字典提交
export const submitBizDict = (params?: AddDictParams) =>
  defHttp.post({ url: Api.DictBizSubmit, params });

//系统字典删除
export const removeDict = (params?: BasicRemoveParams) =>
  defHttp.post({ url: Api.DictRemove, params }, { joinParamsToUrl: true });

//业务字典删除
export const removeBizDict = (params?: BasicRemoveParams) =>
  defHttp.post({ url: Api.DictBizRemove, params }, { joinParamsToUrl: true });

//系统参数删除
export const removeParam = (params?: object) =>
  defHttp.post({ url: Api.ParamRemove, params }, { joinParamsToUrl: true });

//系统参数提交
export const submitParam = (params?: object) => defHttp.post({ url: Api.ParamSubmit, params });

//获取系统参数详情
export const getParamDetail = (params?: object) =>
  defHttp.get({ url: Api.ParamDetail, params }, { joinTime: false });
