import { defHttp } from '/@/utils/http/axios';

enum Api {
  TenantPageList = '/blade-system/tenant-package/list',
  TenantDetail = '/blade-system/tenant-package/detail',
  TenantSubmit = '/blade-system/tenant-package/submit',
  TenantRemove = '/blade-system/tenant-package/remove',
  TenantPageSelect = '/blade-system/tenant-package/select',
}
//获取租户产品分页
export const list = (params?: object) =>
  defHttp.get({ url: Api.TenantPageList, params }, { joinTime: false });

//获取租户产品详情
export const detail = (params: object) => defHttp.get({ url: Api.TenantDetail, params });

//租户产品新增或修改
export const submit = (params: object) => defHttp.post({ url: Api.TenantSubmit, params });

//租户产品删除
export const remove = (params?: object) =>
  defHttp.post({ url: Api.TenantRemove, params }, { joinParamsToUrl: true });

//产品包选择
export const packageSelect = (params?: object) =>
  defHttp.get({ url: Api.TenantPageSelect, params }, { joinTime: false });
