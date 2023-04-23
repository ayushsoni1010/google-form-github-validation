// validate more than two entries in google form for github username validation

function validateAndUpdateData() {
  const spreadsheetId = 'SPREADSHEET_ID';
  const range = 'D2:W';
  try {
    let values = Sheets.Spreadsheets.Values.get(spreadsheetId, range).values;
    if (!values) {
      console.log('No data found.');
      return;
    }
    // console.log(values)
    for (const row in values) {
      for(let col=0;col<=20;col++){
        if(values[row][col]){
          var isValid = validateUsername(values[row][col]);
          values[row][col] = isValid ? values[row][col] : "";          
        }
      }
    }
    console.log("values update ho gyi");
    values = values.map(function(r) {
      return r.length == 20 ? r : r.concat(Array(20 - r.length).fill(""));
    });
    updateSheet(values);
  } catch (err) {
    console.log(err.message);
  }
}

function updateSheet(values) {
  const spreadsheetId = 'SPREADSHEET_ID';
  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName("SHEET_NAME");
  let numRows = values.length;
  let numCols = values[0].length;
  // console.log(values[1].length);
  console.log(numRows, numCols);
  // values = values.map(function(r) {
  //   return r.length == 20 ? r : r.concat(Array(20 - r.length).fill(""));
  // });

  let range = sheet.getRange(2, 4, numRows, 20); // Start at row 2, column 4 (D2)
  range.setValues(values);
  console.log("done");
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
