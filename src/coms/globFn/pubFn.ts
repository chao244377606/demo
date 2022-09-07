import { message, Modal } from 'ant-design-vue';
message.config({ top: `150px`, duration: 2.5 });

import { cloneDeep } from 'lodash-es';
//本地字典信息
import { getDictValue, getDictList } from '../dict/dict';
// pina 状态管理
import { useMyStore } from './myStore';

import { get, post } from '/@/coms/api';

import { pubVerify } from './pubVerify';

//公用方法
export const pubFn = {
  // pina 状态管理
  store: useMyStore(),
  // 信息校验
  pubVerify: pubVerify,
  // 深克隆
  clone: (data) => cloneDeep(data),
  // 全局api
  get: (url: string, params = {}, headers = {}) => {
    return get(url, params, headers);
  },
  post: (url: string, params = {}, headers = {}) => {
    return post(url, params, headers);
  },
  ok: (res, tip = '操作成功') => {
    if (!res) {
      pubFn.message.error('数据操作失败');
      return false;
    }
    if (res.success) {
      pubFn.message.success(tip);
      return true;
    }
    pubFn.message.error(res.msg || '操作失败');
    return false;
  },

  // 重置滚动条
  cleanScroll: (dom = '.ant-table-body') => {
    setTimeout(() => {
      const hasDom = document.querySelector(dom);
      if (hasDom) {
        hasDom.scrollLeft = 0;
        hasDom.scrollTop = 0;
      }
    }, 100);
  },
  //消息提示
  message: {
    info: (msg: string, duration = 2.5) => {
      return message.info({ content: msg, duration });
    },
    success: (msg = '操作成功', duration = 2.5) => {
      return message.success(msg, duration);
    },
    error: (msg = '操作失败', duration = 2.5) => {
      return message.error({ content: msg, duration });
    },
  },
  // 确定/取消消息提示
  modal: {
    open: async (msg: string, title = '提示') => {
      return new Promise((resolve) => {
        Modal.confirm({
          content: msg,
          title: title,
          onOk() {
            return resolve(true);
          },
          cancelText: '取消',
          onCancel() {
            return resolve(false);
          },
        });
      });
    },
    info: (msg: string, title = '提示') => {
      return Modal.info({
        content: msg,
        title: title,
      });
    },
  },
  //获取本地字典val
  dict: (code: string, key: string | Number) => {
    return getDictValue(code, key);
  },
  // 根据字典获取列表
  dictList: (code: string) => {
    return getDictList(code);
  },

  //导出
  export: (url: string, form, otherParam = {}) => {
    let params = {};
    if (form && form() && form().getFieldsValue) {
      params = form().getFieldsValue();
    }
    if (otherParam) {
      params = { ...params, ...otherParam };
    }

    let urls = import.meta.env.VITE_GLOB_API_URL + url + '?';
    let str = '';
    for (const Key in params) {
      str += Key + '=' + params[Key] + '&';
    }
    urls = urls + str;
    console.log(urls, '文件导出..');
    window.open(urls);
  },

  //导入
  import: () => {},
};
