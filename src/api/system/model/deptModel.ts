export type AddDeptParams = {
  id?: string;
  tenantId: string;
  parentId: string;
  fullName: string;
  deptCategory: string;
  sort: number;
  remark: string;
};

export type DeptParams = {
  id?: string;
  tenantId?: string;
  deptName?: string;
  parentId?: string;
};

export type ParamParams = {
  tenantId?: string;
};

export type MenuParams = {
  id?: string;
  menuName?: string;
  status?: string;
};

export type DictParams = {
  id?: string;
  code?: string;
  parentId?: string;
  dictValue?: string;
};

export interface DeptListItem {
  id?: string;
  key?: string;
  parentId?: string;
  deptName?: string;
  value?: string;
  hasChildren?: boolean;
}

export interface DeptTreeItem {
  id: string;
  key: string;
  parentId: string;
  title: string;
  value: string;
  hasChildren: boolean;
  children: DeptTreeItem[];
}
/**
 * @description: Request list return value
 */

export type DeptListGetResultModel = DeptListItem[];

export type DeptTreeGetResultModel = DeptTreeItem[];
