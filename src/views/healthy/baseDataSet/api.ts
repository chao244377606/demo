import { defHttp } from '/@/utils/http/axios';

//老人基础档案--list
export const listApi = (params) => defHttp.get({ url: '/health/baseData/data', params });

// 正在被使用的老人信息
export const useListApi = () => defHttp.get({ url: '/blade-system/post/list' });
