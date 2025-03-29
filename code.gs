function doGet(e) {
  const shortCode = e.parameter.code;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();

  for (let row of data) {
    if (row[0] === shortCode) {
      return jsonResponse('success', row[1]);
    }
  }

  return jsonResponse('error', 'Short URL not found');
}

function jsonResponse(status, message) {
  return ContentService.createTextOutput(
    JSON.stringify({ status, message })
  ).setMimeType(ContentService.MimeType.JSON);
}
