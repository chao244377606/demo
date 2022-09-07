import { BasicPageParams } from '/@/api/model/baseModel';

export type DetailParams = {
  id?: string;
};

export type AddTenantParams = {
  id?: string;
  tenantName: string;
  linkman: string;
  contactNumber?: string;
  address?: string;
  domain?: string;
  backgroundUrl?: string;
};

export type TenantPageParams = BasicPageParams & ParamParams;

export type ParamParams = {
  tenantId?: string;
  tenantName?: string;
  linkman?: string;
};

export interface TenantListItem {
  id: string;
  tenantName: string;
}

/**
 * @description: Request list return value
 */

export type TenantListGetResultModel = TenantListItem[];
