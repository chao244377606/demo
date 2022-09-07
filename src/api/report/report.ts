import { defHttp } from '/@/utils/http/axios';
enum Api {
  List = '/blade-report/report/rest/list',
  Remove = '/blade-report/report/rest/remove',
}

//列表
export function list(params?: object) {
  return defHttp.get({ url: Api.List, params: params }, { joinParamsToUrl: true, joinTime: false });
}

//删除
export function remove(params?: object) {
  return defHttp.post(
    { url: Api.Remove, params: params },
    { joinParamsToUrl: true, joinTime: false },
  );
}
