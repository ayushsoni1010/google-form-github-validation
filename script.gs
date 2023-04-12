function validateAndUpdateData() {
  const spreadsheetId = 'SPREADSHEET_ID'; // Replace with the spreadsheet id which is in the URL after https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit?resourcekey....
  const sheetName = 'SPREADSHEET_NAME'; // Replace with the spreadsheet form name created 
  const range = 'C2:C'; // github username cell

  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  const values = sheet.getRange(range).getValues();

  for (let i = 0; i < values.length; i++) {
    const userName = values[i][0];
    
    if (userName && validateUsername(userName)) {
      console.log("validate")
      sheet.getRange(i + 2, 3).setValue(userName);
    }else{
      sheet.getRange(i + 2, 3).setValue("");
    }
  }
}

function validateUsername(userName)  {
  const url = `https://api.github.com/users/${userName}`;
  try{
    const response =  UrlFetchApp.fetch(url);
    if (response.getResponseCode() == 200){
      var data = response.getContentText("utf-8");
      try{
        data = JSON.parse(data);
        if (data.login) {
          return true
        }
        else {
          return false
        }
      }
      catch{
        return false
      }
    }  
    else {
      return false;
    }
  }
  catch{
    return false;
  }
}
