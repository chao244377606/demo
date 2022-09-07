import { defHttp } from '/@/utils/http/axios';

//老人基础档案--list
export const listApi = (params) => defHttp.get({ url: '/health/base/familyInfo', params });
