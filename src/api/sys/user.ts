import { defHttp } from '/@/utils/http/axios';
import {
  LoginParams,
  RefreshTokenParams,
  LoginResultModel,
  GetUserInfoModel,
  GetButtonsModel,
} from './model/userModel';

import { ErrorMessageMode } from '/#/axios';
import website from '/@/settings/website';

enum Api {
  Login = '/blade-auth/oauth/token',
  GetUserInfo = '/getUserInfo',
  GetButtons = '/blade-system/menu/buttons',
  RefreshToken = '/blade-auth/oauth/token',
  GetCaptcha = '/blade-auth/oauth/captcha',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
      headers: {
        'Tenant-Id': params.tenantId,
        'Dept-Id': website.switchMode ? params.deptId : '',
        'Role-Id': website.switchMode ? params.roleId : '',
        'Captcha-Key': params.key,
        'Captcha-Code': params.code,
      },
    },
    {
      isTransformResponse: false,
      joinParamsToUrl: true,
      errorMessageMode: mode,
    },
  );
}

export function getCaptcha() {
  return defHttp.get(
    { url: Api.GetCaptcha },
    { isTransformResponse: false, joinParamsToUrl: true, joinTime: false },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo });
}

/**
 * @description: getButtons
 */
export function getButtons() {
  return defHttp.get<GetButtonsModel>({ url: Api.GetButtons });
}
/**
 * @description: 刷新token
 */
export function refreshTokenApi(params: RefreshTokenParams) {
  return defHttp.post(
    {
      url: Api.RefreshToken,
      params,
      headers: {
        'Tenant-Id': params.tenantId,
        'Dept-Id': website.switchMode ? params.deptId : '',
        'Role-Id': website.switchMode ? params.roleId : '',
      },
    },
    {
      isTransformResponse: false,
      joinParamsToUrl: true,
    },
  );
}
