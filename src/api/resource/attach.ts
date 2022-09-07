import { UploadApiResult } from '../sys/model/uploadModel';
import {
  ParamPageParams,
  SaveOssParams,
  UploadParams,
  OssSubmitPostResultModel,
  OssListGetResultModel,
} from './model/ossModel';
import { BasicRemoveParams, BasicDetailParams } from '/@/api/model/baseModel';

import { defHttp } from '/@/utils/http/axios';

enum Api {
  AttachList = '/blade-resource/attach/list',
  SubmitAttach = '/blade-resource/attach/submit',
  AttachDetail = '/blade-resource/attach/detail',
  AttachRemove = '/blade-resource/attach/remove',
  AttachUpload = '/api/blade-resource/oss/endpoint/put-file-attach',
}

//列表
export const getAttachList = (params?: ParamPageParams) =>
  defHttp.get<OssListGetResultModel>(
    { url: Api.AttachList, params },
    { joinParamsToUrl: true, joinTime: false },
  );

//提交
export const submitAttach = (params?: SaveOssParams) =>
  defHttp.post<OssSubmitPostResultModel>({ url: Api.SubmitAttach, params });

//上传
export const uploadAttach = (params: UploadParams) => {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: Api.AttachUpload,
    },
    params,
  );
};

//oss详情
export const getAttachDetail = (params?: BasicDetailParams) =>
  defHttp.get<OssSubmitPostResultModel>({ url: Api.AttachDetail, params });

//oss删除
export const removeAttach = (params?: BasicRemoveParams) =>
  defHttp.post({ url: Api.AttachRemove, params }, { joinParamsToUrl: true });
