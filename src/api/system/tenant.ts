import {
  TenantPageParams,
  DetailParams,
  AddTenantParams,
  TenantListGetResultModel,
} from './model/tenantModel';

import { BasicRemoveParams } from '/@/api/model/baseModel';

import { defHttp } from '/@/utils/http/axios';

enum Api {
  TenantPageList = '/blade-system/tenant/list',
  TenantDetail = '/blade-system/tenant/detail',
  TenantSubmit = '/blade-system/tenant/submit',
  TenantRemove = '/blade-system/tenant/remove',
  TenantSetting = '/blade-system/tenant/setting',
  TenantDataSource = '/blade-system/tenant/datasource',
  TenantPackageDetail = '/blade-system/tenant/package-detail',
  TenantPackageSetting = '/blade-system/tenant/package-setting',
}
//获取租户分页
export const getTenantPageList = (params?: TenantPageParams) =>
  defHttp.get<TenantListGetResultModel>({ url: Api.TenantPageList, params }, { joinTime: false });

//获取租户详情
export const getTenantDetail = (params: DetailParams) =>
  defHttp.get({ url: Api.TenantDetail, params });

//租户新增或修改
export const submitTenant = (params: AddTenantParams) =>
  defHttp.post({ url: Api.TenantSubmit, params });

//租户删除
export const removeTenant = (params?: BasicRemoveParams) =>
  defHttp.post({ url: Api.TenantRemove, params }, { joinParamsToUrl: true });

//租户配置
export const settingTenant = (params?: object) =>
  defHttp.post({ url: Api.TenantSetting, params }, { joinParamsToUrl: true });

//租户数据源配置
export const dataSource = (params?: object) =>
  defHttp.post({ url: Api.TenantDataSource, params }, { joinParamsToUrl: true });

//获取租户包详情
export const getTenantPackageDetail = (params: object) =>
  defHttp.get({ url: Api.TenantPackageDetail, params });

export const submitTenantSetting = (params: object) =>
  defHttp.post({ url: Api.TenantPackageSetting, params }, { joinParamsToUrl: true });
