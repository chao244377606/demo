import {
  UserParams,
  AddUserParams,
  UserGrantParams,
  UpdatePasswordParams,
  ResetPasswordParams,
  UserDetailGetResultModel,
  UserListGetResultModel,
  UploadParams,
} from './model/userModel';
import { UploadApiResult } from '../sys/model/uploadModel';
import { BasicRemoveParams } from '/@/api/model/baseModel';

import { defHttp } from '/@/utils/http/axios';

enum Api {
  UserList = '/blade-user/page',
  UserDetail = '/blade-user/detail',
  UserUpdate = '/blade-user/update',
  UserAdd = '/blade-user/submit',
  UserRemove = '/blade-user/remove',
  ResetPassword = '/blade-user/reset-password',
  SubmitUserGrant = '/blade-user/grant',
  ImportUser = '/api/blade-user/import-user',
  UserDict = '/blade-user/user-list',
  UpdatePassword = '/blade-user/update-password',
  UpdateInfo = '/blade-user/update-info',
  UnLock = '/blade-user/unlock',
}

//获取用户列表
export const getUserList = (params: UserParams) =>
  defHttp.get<UserListGetResultModel>({ url: Api.UserList, params });

//获取用户详情
export const getUserDetail = (params: UserParams) =>
  defHttp.get<UserDetailGetResultModel>({ url: Api.UserDetail, params });

//用户新增
export const addUser = (params?: AddUserParams) => defHttp.post({ url: Api.UserAdd, params });

//用户修改
export const updateUser = (params?: AddUserParams) => defHttp.post({ url: Api.UserUpdate, params });

//用户设置角色
export const submitUserGrant = (params?: UserGrantParams) =>
  defHttp.post({ url: Api.SubmitUserGrant, params }, { joinParamsToUrl: true });

//用户删除
export const removeUser = (params?: BasicRemoveParams) =>
  defHttp.post({ url: Api.UserRemove, params }, { joinParamsToUrl: true });

//用户解封
export const unLockUser = (params?: object) =>
  defHttp.post({ url: Api.UnLock, params }, { joinParamsToUrl: true });

//重置密码
export const resetPassword = (params?: ResetPasswordParams) =>
  defHttp.post({ url: Api.ResetPassword, params }, { joinParamsToUrl: true });

//修改密码
export const updatePassword = (params?: UpdatePasswordParams) =>
  defHttp.post({ url: Api.UpdatePassword, params }, { joinParamsToUrl: true, joinTime: false });

//更新个人信息
export function updateUserInfo(params?: object) {
  return defHttp.post({ url: Api.UpdateInfo, params: params });
}

export function UserDict() {
  return defHttp.get({ url: Api.UserDict }, { joinParamsToUrl: true, joinTime: false });
}

//oss上传
export const importUser = (params: UploadParams) => {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: Api.ImportUser,
      params: { isCovered: params.isCovered },
    },
    params,
  );
};
