// Google Apps Script để xử lý form và lưu vào Google Sheets
// Deploy làm Web App để nhận dữ liệu từ frontend

function doGet(e) {
  return HtmlService.createHtmlOutput(`
    <h1>Form Handler</h1>
    <p>Deploy this script as Web App to handle form submissions.</p>
  `);
}

function doPost(e) {
  try {
    // Lấy dữ liệu từ form
    const data = e.parameter;
    
    // Tạo hoặc lấy Google Sheet
    const spreadsheetId = 'YOUR_SPREADSHEET_ID'; // Bạn sẽ cần tạo Google Sheet và lấy ID
    const sheetName = 'Form Responses';
    
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    let sheet = spreadsheet.getSheetByName(sheetName);
    
    // Nếu sheet chưa tồn tại, tạo mới với headers
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      const headers = ['Timestamp', 'Name', 'Memory', 'Topic', 'Goal', 'Style', 'Struggle'];
      sheet.appendRow(headers);
      sheet.getRange('A1:G1').setFontWeight('bold');
    }
    
    // Thêm dữ liệu mới
    const timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    const rowData = [
      timestamp,
      data.name || '',
      data.memory || '',
      data.topic || '',
      data.goal || '',
      data.style || '',
      data.struggle || ''
    ];
    
    sheet.appendRow(rowData);
    
    // Trả về response thành công
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Dữ liệu đã được lưu thành công!'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Lỗi: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Hàm để tạo Google Sheet tự động
function createSpreadsheet() {
  const spreadsheet = SpreadsheetApp.create('Landing Page Form Responses');
  const sheet = spreadsheet.getActiveSheet();
  sheet.setName('Form Responses');
  
  // Thêm headers
  const headers = ['Timestamp', 'Name', 'Memory', 'Topic', 'Goal', 'Style', 'Struggle'];
  sheet.appendRow(headers);
  sheet.getRange('A1:G1').setFontWeight('bold');
  
  // Format columns
  sheet.autoResizeColumn(1); // Timestamp
  sheet.setColumnWidth(2, 200); // Name
  sheet.setColumnWidth(3, 300); // Memory
  sheet.setColumnWidth(4, 150); // Topic
  sheet.setColumnWidth(5, 150); // Goal
  sheet.setColumnWidth(6, 150); // Style
  sheet.setColumnWidth(7, 200); // Struggle
  
  // Share với người tạo (bạn)
  spreadsheet.addEditor(Session.getEffectiveUser());
  
  return spreadsheet.getId();
}
