import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel, GetButtonsModel } from './model/menuModel';

enum Api {
  GetMenuList = '/blade-system/menu/routes',
  GetButtons = '/blade-system/menu/buttons',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
};

/**
 * @description: getButtons
 */
export function getButtons() {
  return defHttp.get<GetButtonsModel>({ url: Api.GetButtons });
}
