//全局公用方法 $fn.xxx
/*
已存在方法 详情见 globFn/pubFn.ts
$fn.setLoad()
$fn.clone
$fn.cleanScroll
$fn.message
$fn.modal
$fn.dict
$fn.dictList
$fn.export(url,getForm)

  if (await $fn.modal.open('数据未保存,是否确定离开')) {
    // 点击确定后执行逻辑
  }
*/

/**
   //表格中获取本地字典
  customRender({ text, record }) {
    text = text + '';
    if (!text) return '';
    if (record.dictInitVal) return record.dictInitVal;
    const val = $fn.dict('sex', text);
    record.dictInitVal = val;
    return val;
  },
*/
