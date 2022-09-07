import { defHttp } from '/@/utils/http/axios';
enum Api {
  historyFlowList = '/blade-flow/process/history-flow-list',
  leaveProcess = '/blade-desk/process/leave/start-process',
  leaveDetail = '/blade-desk/process/leave/detail',
  CompleteTask = '/blade-flow/work/complete-task',
}

export function historyFlowList(params?: object) {
  return defHttp.get(
    { url: Api.historyFlowList, params: params },
    { joinParamsToUrl: true, joinTime: false },
  );
}

export function leaveProcess(params?: object) {
  defHttp.post({ url: Api.leaveProcess, params }, { joinParamsToUrl: true });
}

export function leaveDetail(params?: object) {
  return defHttp.get(
    { url: Api.leaveDetail, params: params },
    { joinParamsToUrl: true, joinTime: false },
  );
}

export function completeTask(params?: object) {
  return defHttp.post(
    { url: Api.CompleteTask, params: params },
    { joinParamsToUrl: true, joinTime: false, isTransformResponse: false },
  );
}
