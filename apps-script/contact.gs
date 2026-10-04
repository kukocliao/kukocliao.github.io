// 貼進 Google 試算表的「擴充功能 > Apps Script」，部署成網頁應用程式。
// 收到表單 → 寫進「聯絡表單」分頁 → 寄信通知部署者本人（回覆會直接回給對方）。

const SHEET_NAME = '聯絡表單';

function doPost(e) {
  const p = e.parameter;
  if (p.website) return json({ ok: true }); // 隱藏欄位有填 = 機器人，假裝成功

  const name = clean(p.name, 100);
  const email = clean(p.email, 200);
  const message = clean(p.message, 3000);
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'invalid' });
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(['時間', '姓名 / 機構', 'Email', '內容']);
  sheet.appendRow([new Date(), safe(name), safe(email), safe(message)]);

  MailApp.sendEmail({
    to: Session.getEffectiveUser().getEmail(),
    replyTo: email,
    subject: '【網站來信】' + name,
    body: '姓名 / 機構：' + name + '\nEmail：' + email + '\n\n' + message +
      '\n\n（直接按回覆就會寄給對方。全部紀錄在試算表「' + SHEET_NAME + '」分頁）',
  });

  return json({ ok: true });
}

function clean(v, max) {
  return String(v || '').trim().slice(0, max);
}

// 開頭是 = + - @ 的字串會被試算表當公式執行，前面加 ' 讓它變純文字
function safe(s) {
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// 部署前先在編輯器選這個函式按「執行」：會跳授權，跑完試算表多一列、信箱收到一封測試信
function testDoPost() {
  const res = doPost({ parameter: { name: '測試', email: 'test@example.com', message: '這是測試訊息' } });
  Logger.log(res.getContent());
}
