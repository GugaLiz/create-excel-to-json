const node_xj = require('xls-to-json');
const fs = require('fs-extra');

/**
 * Excel文件转成json文件(excel文件格式包括.xls或.xlsx后缀)
 *
 * configs的相关字段说明
 *
 * input:  Excel文件存放位置
 * output: 导出的json文件位置,目前是采用重新写入一个json文件方式,所以不填写output地址
 * sheet:  Excel文件中对应的需要转的当前表
 * rowsToSkip: 要跳过转化的行数;默认值:0;
 * allowEmptyKey: 允许导出的json文件中存在空值,例如: {"": "something"}; 默认值: true
 */
(function main() {
  const configs = {
    input: 'excel-data/test.xlsx',
    output: null,
    sheet: '工作表1',
    rowsToSkip: 0,
    allowEmptyKey: false
  };
  node_xj(configs, function(err, result) {
    if (err) {
      console.error('xls2jsonError:' + err);
    } else {
      if (result) {
        //json文件生成位置
        const outputFile = 'json-data/output.json';

        (async function writeJsonFile(outputFile) {
          try {
            await fs.outputJson(outputFile, result);
            const data = await fs.readJson(outputFile, 'utf8');
            console.log(data);
          } catch (err) {
            console.error('writeJsonError:' + err);
          }
        })(outputFile);
      }
    }
  });
})();
