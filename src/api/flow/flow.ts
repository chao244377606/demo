import { defHttp } from '/@/utils/http/axios';
import { UploadApiResult } from '../sys/model/uploadModel';
import { UploadParams } from '/@/api/resource/model/ossModel';
enum Api {
  modelList = '/blade-flow/model/list',
  managerList = '/blade-flow/manager/list',
  followList = '/blade-flow/follow/list',
  removeModel = '/blade-flow/model/remove',
  deployModel = '/blade-flow/model/deploy',
  changeState = '/blade-flow/manager/change-state',
  deleteDeployment = '/blade-flow/manager/delete-deployment',
  deleteProcessInstance = '/blade-flow/follow/delete-process-instance',
  flowUpload = '/api/blade-flow/manager/check-upload',
}

//模型列表
export function modelList(params?: object) {
  return defHttp.get(
    { url: Api.modelList, params: params },
    { joinParamsToUrl: true, joinTime: false },
  );
}

//流程列表
export function managerList(params?: object) {
  return defHttp.get(
    { url: Api.managerList, params: params },
    { joinParamsToUrl: true, joinTime: false },
  );
}

//流程跟踪列表
export function followList(params?: object) {
  return defHttp.get(
    { url: Api.followList, params: params },
    { joinParamsToUrl: true, joinTime: false },
  );
}

//删除流程列表
export function deleteProcessInstance(params?: object) {
  defHttp.post({ url: Api.deleteProcessInstance, params }, { joinParamsToUrl: true });
}

//部署模型
export function deployModel(params?: object) {
  return defHttp.post({ url: Api.deployModel, params: params }, { joinParamsToUrl: true });
}

//变更状态
export function changeState(params?: object) {
  return defHttp.post({ url: Api.changeState, params: params }, { joinParamsToUrl: true });
}

//删除模型
export function removeModel(params?: object) {
  defHttp.post({ url: Api.removeModel, params }, { joinParamsToUrl: true });
}
//删除流程
export function deleteDeployment(params?: object) {
  defHttp.post({ url: Api.deleteDeployment, params }, { joinParamsToUrl: true });
}

//oss上传
export function flowUpload(params: UploadParams) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: Api.flowUpload,
    },
    params,
  );
}
