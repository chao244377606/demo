import { BasicPageParams, BasicSubmitResult } from '/@/api/model/baseModel';

export type DetailParams = {
  id?: string;
};

export type AddPostParams = {
  id?: string;
  category: string;
  postCode: string;
  postName: string;
  deptCategory: string;
  sort: number;
  remark: string;
};

export type PostPageParams = BasicPageParams & ParamParams;

export type ParamPageParams = BasicPageParams & PostParams;

export type ParamParams = {
  tenantId?: string;
};

export type PostParams = {
  tenantId?: string;
};

export interface PostListItem {
  id: string;
  postName: string;
}

/**
 * @description: Request list return value
 */

export type MenuSubmitPostResultModel = BasicSubmitResult;

export type PostListGetResultModel = PostListItem[];
