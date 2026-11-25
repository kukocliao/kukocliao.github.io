// 獨立的 Apps Script 專案，部署成網頁應用程式。收件試算表：「共通職能 IDP 收件」
const SS_ID = '1sPLSUs5Us4_uiR3uAidiYk5pkdXNmjifhE-EDUftY7I';
// 每種表單寫進自己的工作表（自評與IDP／IDP檢核表／學習成效回饋／主管回饋），第一次送出時自動建表頭。
const SHEETS = ['自評與IDP', 'IDP檢核表', '學習成效回饋', '主管回饋'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // ponytail: 全域鎖，幾百人同時送才需要更細
  try {
    const d = JSON.parse(e.postData.contents);
    const name = d._sheet;
    if (!SHEETS.includes(name)) return ContentService.createTextOutput('bad sheet');
    delete d._sheet;
    const ss = SpreadsheetApp.openById(SS_ID);
    const sh = ss.getSheetByName(name) || ss.insertSheet(name);
    if (sh.getLastRow() === 0) sh.appendRow(['送出時間', ...Object.keys(d)]);
    let head = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
    // 之後表單加了新欄位，就補在表頭最後
    const extra = Object.keys(d).filter(k => !head.includes(k));
    if (extra.length) { sh.getRange(1, head.length + 1, 1, extra.length).setValues([extra]); head = head.concat(extra); }
    // 前面加單引號，避免有人輸入 = 開頭被當成公式
    sh.appendRow(head.map(h => h === '送出時間' ? new Date() : (d[h] == null ? '' : "'" + String(d[h]))));
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}
