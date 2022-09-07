import { defHttp } from '/@/utils/http/axios';

enum Api {
  Detail = '/blade-system/role/tree-by-id',
  Submit = '/blade-system/role/submit',
  Remove = '/blade-system/role/remove',
  RoleSelect = '/blade-system/role/select',
}

//提交
export function submitObj(params?: object) {
  return defHttp.post({ url: Api.Submit, params: params });
}

//详情
export function getDetail(params?: object) {
  return defHttp.get({ url: Api.Detail, params });
}

//删除
export function remove(params?: object) {
  defHttp.post({ url: Api.Remove, params }, { joinParamsToUrl: true });
}
//角色下拉选择
export function getRoleSelect(params?: object) {
  return defHttp.get({ url: Api.RoleSelect, params });
}
