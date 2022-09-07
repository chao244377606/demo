import { defHttp } from '/@/utils/http/axios';

export const listApi = (params) => defHttp.get({ url: '/health/base/oldManSearch', params });
