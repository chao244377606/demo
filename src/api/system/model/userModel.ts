import { BasicDataResult } from '/@/api/model/baseModel';

export type DetailParams = {
  id?: string;
};

export type UserParams = {
  id?: string;
  account?: string;
  name?: string;
};

export type ResetPasswordParams = {
  userIds: unknown[];
};

export type UpdatePasswordParams = {
  oldPassword: string;
  newPassword: string;
  newPassword1: string;
};

export type UserGrantParams = {
  userIds: string;
  roleIds: string;
};

export type AddUserParams = {
  id?: string;
  tenantId: string;
  userType: number;
  name: string;
  account: string;
  password: string;
  password2: string;
  email?: string;
  phone?: string;
  sex?: string;
  birthday?: string;
  realName: string;
  roleId: string | string[];
  deptId: string | string[];
  postId: string | string[];
};

export type ParamParams = {
  tenantId?: string;
};

export type LazyMenuParams = {
  parentId: number;
};

export interface UserListItem {
  id: string;
  account: string;
  email: string;
  name: string;
  realName: string;
  roleId: string;
  roleName: string;
  deptName: string;
  userTypeName: string;
}

export interface UserDetail {
  id: string;
  tenantId: string;
  tenantName: string;
  userType: number;
  name: string;
  account: string;
  email: string;
  realName: string;
  roleId: string | string[];
  deptId: string | string[];
  postId: string | string[];
  roleName: string;
  deptName: string;
  userTypeName: string;
}

/**
 * @description: Request list return value
 */
export type UserListGetResultModel = BasicDataResult<UserListItem>;

export type UserDetailGetResultModel = UserDetail;

export type UploadParams = {
  isCovered?: string;
  file: File;
};
