import { defHttp } from '/@/utils/http/axios';
enum Api {
  LazyTree = '/blade-system/region/lazy-tree',
  Detail = '/blade-system/region/detail',
  Remove = '/blade-system/region/remove',
  Submit = '/blade-system/region/submit',
  Select = '/blade-system/region/select',
}

//列表
export function lazyTree(params?: object) {
  return defHttp.get(
    { url: Api.LazyTree, params: params },
    { joinParamsToUrl: true, joinTime: false },
  );
}

//详情
export function detail(params?: object) {
  return defHttp.get(
    { url: Api.Detail, params: params },
    { joinParamsToUrl: true, joinTime: false },
  );
}

export function submit(params?: object) {
  return defHttp.post(
    { url: Api.Submit, params: params },
    { joinParamsToUrl: true, joinTime: false },
  );
}

export function remove(params?: object) {
  return defHttp.post(
    { url: Api.Remove, params: params },
    { joinParamsToUrl: true, joinTime: false },
  );
}
export function select(params?: object) {
  return defHttp.get(
    { url: Api.Select, params: params },
    { joinParamsToUrl: true, joinTime: false },
  );
}
