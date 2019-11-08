function doGet(e){
  const url = e.parameter.target
  const bytes = UrlFetchApp.fetch(url, {method: 'get'}).getContent()
  const ret = Utilities.base64Encode(bytes)
  return ContentService.createTextOutput(ret)
}