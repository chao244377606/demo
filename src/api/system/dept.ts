import {
  DeptParams,
  AddDeptParams,
  DeptTreeGetResultModel,
  DeptListGetResultModel,
} from './model/deptModel';

import { BasicRemoveParams } from '/@/api/model/baseModel';

import { defHttp } from '/@/utils/http/axios';

enum Api {
  DeptList = '/blade-system/dept/list',
  DeptUpdate = '/blade-system/dept/submit',
  DeptTree = '/blade-system/dept/tree',
  DeptLazyList = '/blade-system/dept/lazy-list',
  DeptDetail = '/blade-system/dept/detail',
  DeptRemove = '/blade-system/dept/remove',
  DeptSelect = '/blade-system/dept/select',
}

//获取部门懒加载列表树
export const getDeptLazyTree = (params?: DeptParams) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptLazyList, params }, { joinTime: false });

//获取部门列表
export const getDeptList = (params?: DeptParams) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params }, { joinTime: false });

//获取部门详情
export const getDeptDetail = (params?: DeptParams) =>
  defHttp.get({ url: Api.DeptDetail, params }, { joinTime: false });

//部门新增或修改
export const updateDept = (params: AddDeptParams) => defHttp.post({ url: Api.DeptUpdate, params });

//获取部门列表树
export const getDeptTree = (params?: DeptParams) =>
  defHttp.get<DeptTreeGetResultModel>({ url: Api.DeptTree, params }, { joinTime: false });

//用户删除
export const removeDept = (params?: BasicRemoveParams) =>
  defHttp.post({ url: Api.DeptRemove, params }, { joinParamsToUrl: true });

//获取部门下拉列表
export const getDeptSelect = (params?: object) =>
  defHttp.get({ url: Api.DeptSelect, params }, { joinTime: false });
