import {
  PostParams,
  PostPageParams,
  DetailParams,
  AddPostParams,
  PostListGetResultModel,
} from './model/postModel';

import { BasicRemoveParams } from '/@/api/model/baseModel';

import { defHttp } from '/@/utils/http/axios';

enum Api {
  PostList = '/blade-system/post/select',
  PostPageList = '/blade-system/post/list',
  PostDetail = '/blade-system/post/detail',
  PostRemove = '/blade-system/post/remove',
  PostSubmit = '/blade-system/post/submit',
}

//获取岗位列表
export const getPostList = (params?: PostParams) =>
  defHttp.get<PostListGetResultModel>({ url: Api.PostList, params });

//获取岗位分页
export const getPostPageList = (params?: PostPageParams) =>
  defHttp.get<PostListGetResultModel>({ url: Api.PostPageList, params });

//获取岗位详情
export const getPostDetail = (params: DetailParams) => defHttp.get({ url: Api.PostDetail, params });

//岗位新增或修改
export const submitPost = (params: AddPostParams) => defHttp.post({ url: Api.PostSubmit, params });

//岗位删除
export const removePost = (params?: BasicRemoveParams) =>
  defHttp.post({ url: Api.PostRemove, params }, { joinParamsToUrl: true });
