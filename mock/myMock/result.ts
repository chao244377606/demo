//假数据列表
function ranId(len = 6) {
  const strs = 'qwertyuioasdfg1234567890hjklzxcvbnm';
  let str = '';
  const strlen = strs.length;
  for (let i = 0; i < len; i++) {
    str += strs[Math.floor(Math.random() * strlen)];
  }
  return str;
}
function getName(len = 3) {
  const strs = 'QWERTYUIOPASDFGHJK赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔金魏三四五六';
  let str = '';
  const strlen = strs.length;
  for (let i = 0; i < len; i++) {
    str += strs[Math.floor(Math.random() * strlen)];
  }
  return str;
}
function getDetail() {
  return {
    id: ranId(6),
    address: getName(10),
    age: 23,
    birth: '2022-02-01',
    bzbzId: null,
    bzbzName: '',
    censusAddress: null,
    censusDetailAddress: null,
    children: null,
    code: ranId(6),
    createBy: null,
    createByUserId: null,
    createTime: '2022-02-01',
    educationId: null,
    formatBirth: '2021-02-01',
    hobby: null,
    idCard: '370983199007165313',
    images: null,
    isAlive: null,
    isDeleted: 0,
    isRetire: null,
    liveAddress: '110000,110100,110105,110105008',
    liveDetailAddress: getName(8),
    marriageState: null,
    name: getName(3),
    nationId: null,
    nature: null,
    occupationId: null,
    organizaId: null,
    phone: null,
    sex: 1,
    stationId: null,
    updateBy: null,
    updateByUserId: null,
    updateTime: '2021-02-01',
  };
}

function getDataList(size = 10) {
  const dataList: any = [];
  for (let i = 0; i < size; i++) {
    dataList.push(getDetail());
  }
  return dataList;
}

export function ok() {
  return {
    code: 200,
    data: null,
    msg: '请求成功',
    success: true,
  };
}
export function error() {
  return {
    code: 4000,
    data: null,
    msg: '操作失败',
    success: false,
  };
}

export function listArr() {
  return {
    code: 200,
    data: getDataList(3),
    msg: '请求成功',
    success: true,
  };
}
export function list(current = 1, size = 10, total = 24) {
  return {
    code: 200,
    data: {
      current: current,
      pages: 1,
      records: getDataList(size),
      size: size,
      total: total,
    },
    msg: '成功',
    success: true,
  };
}
export function detail() {
  return {
    code: 200,
    data: getDetail(),
    msg: '请求成功',
    success: true,
  };
}

export interface requestParams {
  method: string;
  body: any;
  headers?: { authorization?: string };
  query: any;
}

export function getRequestToken({ headers }: requestParams): string | undefined {
  return headers?.authorization;
}
