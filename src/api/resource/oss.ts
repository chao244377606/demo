import { UploadApiResult } from '../sys/model/uploadModel';
import {
  ParamPageParams,
  SaveOssParams,
  UploadParams,
  OssSubmitPostResultModel,
  OssListGetResultModel,
} from './model/ossModel';
import { UploadFileParams } from '/#/axios';
import { BasicRemoveParams, BasicDetailParams } from '/@/api/model/baseModel';

import { defHttp } from '/@/utils/http/axios';

enum Api {
  OssList = '/blade-resource/oss/list',
  SubmitOss = '/blade-resource/oss/submit',
  OssDetail = '/blade-resource/oss/detail',
  OssRemove = '/blade-resource/oss/remove',
  OssEnable = '/blade-resource/oss/enable',
  OssUpload = '/api/blade-resource/oss/endpoint/put-file',
}

//oss列表
export const getOssList = (params?: ParamPageParams) =>
  defHttp.get<OssListGetResultModel>(
    { url: Api.OssList, params },
    { joinParamsToUrl: true, joinTime: false },
  );

//oss提交
export const submitOss = (params?: SaveOssParams) =>
  defHttp.post<OssSubmitPostResultModel>({ url: Api.SubmitOss, params });

//oss上传
export const uploadOss = (params: UploadParams) => {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: Api.OssUpload,
      params: { code: params.code },
    },
    params,
  );
};

//oss上传
export const uploadOssDefult = (params: UploadFileParams) => {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: Api.OssUpload,
    },
    params,
  );
};

//oss启用操作
export const enableOss = (params?: Object) =>
  defHttp.post({ url: Api.OssEnable, params }, { joinParamsToUrl: true });

//oss详情
export const getOssDetail = (params?: BasicDetailParams) =>
  defHttp.get<OssSubmitPostResultModel>({ url: Api.OssDetail, params });

//oss删除
export const removeOss = (params?: BasicRemoveParams) =>
  defHttp.post({ url: Api.OssRemove, params }, { joinParamsToUrl: true });
