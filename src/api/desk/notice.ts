import { defHttp } from '/@/utils/http/axios';

enum Api {
  noticeList = '/blade-desk/notice/list',
  Submitnotice = '/blade-desk/notice/submit',
  noticeDetail = '/blade-desk/notice/detail',
  noticeRemove = '/blade-desk/notice/remove',
}

//列表
export const getnoticeList = (params?: object) => defHttp.get({ url: Api.noticeList, params });

//提交
export const submitnotice = (params?: object) => defHttp.post({ url: Api.Submitnotice, params });

//详情
export const getnoticeDetail = (params?: object) => defHttp.get({ url: Api.noticeDetail, params });

//删除
export const removenotice = (params?: object) =>
  defHttp.post({ url: Api.noticeRemove, params }, { joinParamsToUrl: true });
