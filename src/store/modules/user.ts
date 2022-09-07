import type { UserInfo } from '/#/store';
import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { RoleEnum } from '/@/enums/roleEnum';
import { PageEnum } from '/@/enums/pageEnum';
import {
  ROLES_KEY,
  TOKEN_KEY,
  USER_INFO_KEY,
  REFRESH_TOKEN_KEY,
  TOKEN_TIME,
} from '/@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import { GetUserInfoModel, LoginParams } from '/@/api/sys/model/userModel';
import { loginApi, refreshTokenApi } from '/@/api/sys/user';
import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import { router } from '/@/router';
import { usePermissionStore } from '/@/store/modules/permission';
import { RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';
import { h } from 'vue';
import website from '/@/settings/website';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  tokenTime?: number;
  refreshToken?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    tokenTime: undefined,
    // refreshToken
    refreshToken: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    getRefreshToken(): string {
      return this.refreshToken || getAuthCache<string>(REFRESH_TOKEN_KEY);
    },
    getTokenTime(): number {
      return this.tokenTime || getAuthCache<number>(TOKEN_TIME);
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      setAuthCache(TOKEN_KEY, info);
      const time = new Date().getTime();
      this.tokenTime = time;
      setAuthCache(TOKEN_TIME, time);
    },
    setRefreshToken(info: string | undefined) {
      this.refreshToken = info;
      setAuthCache(REFRESH_TOKEN_KEY, info);
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    //刷新token
    async refreshTokens(deptId, roleId) {
      const userInfo = this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY);
      const data = await refreshTokenApi({
        grant_type: 'refresh_token',
        scope: 'all',
        deptId: deptId ? deptId : userInfo.dept_id,
        roleId: roleId ? roleId : userInfo.role_id,
        tenantId: userInfo.tenant_id,
        refresh_token: this.refreshToken || getAuthCache<string>(REFRESH_TOKEN_KEY),
      });
      const { access_token, refresh_token } = data;
      const newUserInfo = data as any as UserInfo;
      this.setUserInfo(newUserInfo);
      // save token
      this.setToken(access_token);
      this.setRefreshToken(refresh_token);
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.refreshToken = '';
      this.tokenTime = undefined;
      this.roleList = [];
      this.sessionTimeout = false;
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { mode, ...loginParams } = params;
        const { goHome = true } = params;
        const data = await loginApi(loginParams, mode);
        const { error_code, error_description, access_token, refresh_token } = data;

        if (error_code) {
          return Promise.reject({ response: { data: { msg: error_description } } });
        }
        // save token
        this.setToken(access_token);
        this.setRefreshToken(refresh_token);
        // get user info
        const userInfo = data as any as UserInfo;
        this.setUserInfo(userInfo);
        if (website.switchMode) {
          const deptId = userInfo.dept_id;
          const roleId = userInfo.role_id;
          if (deptId.includes(',') || roleId.includes(',')) {
            return Promise.reject({ code: 888 });
          }
        }
        const sessionTimeout = this.sessionTimeout;
        if (sessionTimeout) {
          this.setSessionTimeout(false);
        } else if (goHome) {
          const permissionStore = usePermissionStore();
          if (!permissionStore.isDynamicAddedRoute) {
            const routes = await permissionStore.buildRoutesAction();
            routes.forEach((route) => {
              router.addRoute(route as unknown as RouteRecordRaw);
            });
            router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
            permissionStore.setDynamicAddedRoute(true);
          }
          await router.replace(userInfo.homePath || PageEnum.BASE_HOME);
        }
        return userInfo;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
