// 获取字典的值---回显
export const getDictValue = (code: string, key: any) => {
  const keys = key + '';
  let val = '';
  if (codeList[code]) {
    const co = codeList[code];
    const len = codeList[code].length;
    for (let i = 0; i < len; i++) {
      if (co[i].key === keys) {
        val = co[i].value;
        break;
      }
    }
  }
  return val;
};

// 根据code获取列表
export const getDictList = (code: string) => {
  if (codeList[code]) return codeList[code];
  return [];
};

// 本地化字典
const codeList = {
  sex: [
    { key: '0', value: '女' },
    { key: '1', value: '男' },
  ],
  //是或否
  yesno: [
    { key: '1', value: '是' },
    { key: '0', value: '否' },
  ],
  // 婚姻状态
  marriage: [
    { key: '0', value: '未婚' },
    { key: '1', value: '已婚' },
  ],
  // 政府补助
  buzhu: [
    { key: '0', value: '无' },
    { key: '1', value: '100-300' },
    { key: '2', value: '300-1000' },
    { key: '3', value: '1000-3000' },
    { key: '4', value: '3000以上' },
  ],
  // 血型：
  xuexing: [
    { key: '0', value: '未知' },
    { key: '1', value: 'A型' },
    { key: '2', value: 'B型' },
    { key: '3', value: 'O型' },
    { key: '4', value: 'AB型' },
  ],
};
