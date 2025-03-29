// 配置常數
const SPREADSHEET_ID = '1HTf7tccUHE0b8Nt9z9AqM6si_R2_JjMIs-ZMelnM384';
const SHEET_NAME = 'test1';
const DATA_RANGE = 'B3:G999';

function doGet(e) {
  try {
    const data = getDataFromSpreadsheet();
    const template = HtmlService.createTemplateFromFile('index');
    template.serverData = JSON.stringify(data);
    
    return template.evaluate()
      .setTitle('羽球穿線價目表'); // 設定分頁標題
  } catch (error) {
    return HtmlService.createHtmlOutput(`<h1>Error:</h1><p>${error.message}</p>`);
  }
}

// 读取试算表特定范围的数据并过滤空白行
function getDataFromSpreadsheet() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      throw new Error(`工作表 ${SHEET_NAME} 不存在`);
    }
    
    const data = sheet.getRange(DATA_RANGE).getValues();
    
    // 过滤掉完全为空的行
    const filteredData = data.filter(row => 
      row.some(cell => cell !== "")
    );
    
    return filteredData;
  } catch (error) {
    console.error('讀取試算表時發生錯誤:', error);
    throw error; // 重新拋出錯誤以便上層處理
  }
}
