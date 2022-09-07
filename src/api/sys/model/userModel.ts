/**
 * @description: 登录接口参数
 */
export interface LoginParams {
  tenantId: string;
  username: string;
  password: string;
  grant_type: string;
  scope: string;
  type: string;
  key: string;
  code: string;
  deptId: string;
  roleId: string;
}

export interface RefreshTokenParams {
  tenantId: string;
  refresh_token?: string;
  grant_type: string;
  scope: string;
  deptId: string;
  roleId: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: 登录接口返回值
 */
export interface LoginResultModel {
  access_token: string;
  user_id: string;
  avatar: string;
  dept_id: string;
  nick_name: string;
  post_id: string;
  refresh_token: string;
  expires_in: number;
  tenant_id: string;
  token_type: string;
  role_id: string;
  role_name: string;
  error_code?: number;
  error_description?: string;
}

/**
 * @description: 获取用户信息返回值
 */
export interface GetUserInfoModel {
  // 用户id
  user_id: string | number;
  // 用户名
  user_name: string;
  // 真实名字
  nick_name: string;
  // 头像
  avatar: string;
  // 角色id，逗号分隔
  role_id: string;
  tenant_id: string;
}

/**
 * 获取系统按钮权限
 */
export interface ButtonItem {
  id: string | number;
  code: string;
  hasChildren: boolean;
  children: ButtonItem[];
}

export type GetButtonsModel = ButtonItem[];
