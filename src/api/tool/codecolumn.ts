import { defHttp } from '/@/utils/http/axios';

enum Api {
  List = '/blade-develop/codeColumn/list',
  Submit = '/blade-develop/codeColumn/submit',
  Detail = '/blade-develop/codeColumn/detail',
  Remove = '/blade-develop/codeColumn/remove',
  Update = '/blade-develop/codeColumn/update',
}

//列表
export function getList(params?: object) {
  return defHttp.get({ url: Api.List, params: params }, { joinParamsToUrl: true, joinTime: false });
}

//提交
export function submitObj(params?: object) {
  return defHttp.post({ url: Api.Submit, params: params });
}

//提交
export function update(params?: object) {
  return defHttp.post({ url: Api.Update, params: params });
}

//详情
export function getDetail(params?: object) {
  return defHttp.get({ url: Api.Detail, params });
}

//删除
export function remove(params?: object) {
  defHttp.post({ url: Api.Remove, params }, { joinParamsToUrl: true });
}
