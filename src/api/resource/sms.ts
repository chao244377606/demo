import {
  ParamPageParams,
  SaveSmsParams,
  SmsSubmitPostResultModel,
  SmsListGetResultModel,
} from './model/smsModel';
import { BasicRemoveParams, BasicDetailParams } from '/@/api/model/baseModel';

import { defHttp } from '/@/utils/http/axios';

enum Api {
  SmsList = '/blade-resource/sms/list',
  SubmitSms = '/blade-resource/sms/submit',
  SmsDetail = '/blade-resource/sms/detail',
  SmsRemove = '/blade-resource/sms/remove',
  SmsSend = '/blade-resource/sms/endpoint/send-message',
}

//oss列表
export const getSmsList = (params?: ParamPageParams) =>
  defHttp.get<SmsListGetResultModel>(
    { url: Api.SmsList, params },
    { joinParamsToUrl: true, joinTime: false },
  );

//oss提交
export const submitSms = (params?: SaveSmsParams) =>
  defHttp.post<SmsSubmitPostResultModel>({ url: Api.SubmitSms, params });

//短信发送
export const smsSend = (params?: SaveSmsParams) =>
  defHttp.post<SmsSubmitPostResultModel>({ url: Api.SmsSend, params });

//oss详情
export const getSmsDetail = (params?: BasicDetailParams) =>
  defHttp.get<SmsSubmitPostResultModel>({ url: Api.SmsDetail, params });

//oss删除
export const removeSms = (params?: BasicRemoveParams) =>
  defHttp.post({ url: Api.SmsRemove, params }, { joinParamsToUrl: true });
