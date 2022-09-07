import { defHttp } from '/@/utils/http/axios';
enum Api {
  startList = '/blade-flow/work/start-list',
  claimList = '/blade-flow/work/claim-list',
  todoList = '/blade-flow/work/todo-list',
  sendList = '/blade-flow/work/send-list',
  doneList = '/blade-flow/work/done-list',
  claimTask = '/blade-flow/work/claim-task',
  completeTask = '/blade-flow/work/complete-task',
}

//发起列表
export function startList(params?: object) {
  return defHttp.get(
    { url: Api.startList, params: params },
    { joinParamsToUrl: true, joinTime: false },
  );
}

export function claimList(params?: object) {
  return defHttp.get(
    { url: Api.claimList, params: params },
    { joinParamsToUrl: true, joinTime: false },
  );
}

export function todoList(params?: object) {
  return defHttp.get(
    { url: Api.todoList, params: params },
    { joinParamsToUrl: true, joinTime: false },
  );
}

export function sendList(params?: object) {
  return defHttp.get(
    { url: Api.sendList, params: params },
    { joinParamsToUrl: true, joinTime: false },
  );
}

export function doneList(params?: object) {
  return defHttp.get(
    { url: Api.doneList, params: params },
    { joinParamsToUrl: true, joinTime: false },
  );
}

export function claimTask(params?: object) {
  defHttp.post({ url: Api.claimTask, params }, { joinParamsToUrl: true });
}

export function completeTask(params?: object) {
  defHttp.post({ url: Api.completeTask, params }, { joinParamsToUrl: true });
}
