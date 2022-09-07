import { BasicPageParams } from '/@/api/model/baseModel';

export type DetailParams = {
  id?: string;
};

export type AddClientParams = {
  id?: string;
  tenantName: string;
  linkman: string;
  contactNumber?: string;
  address?: string;
  domain?: string;
  backgroundUrl?: string;
};

export type ClientPageParams = BasicPageParams & ParamParams;

export type ParamParams = {
  tenantId?: string;
  tenantName?: string;
  linkman?: string;
};

export interface ClientListItem {
  id: string;
  tenantName: string;
}

/**
 * @description: Request list return value
 */

export type ClientListGetResultModel = ClientListItem[];
