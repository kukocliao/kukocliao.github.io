# kukocliao.github.io — Claude 工作索引

廖書毅職能治療師的個人簡介頁。GitHub Pages 靜態網站，**只有一個 `index.html`**
（Tailwind CDN + Google Fonts，無 package.json、無建置流程、無測試）。

## 鐵律（就這 4 條）

1. **push 到 `main` = 立即公開上線**（https://kukocliao.github.io）。
   所有修改一律開分支＋PR，不直接 push main。
2. **完成 = 視覺驗過**：沒有 lint/build 可跑。改完用瀏覽器（或 Playwright 截圖）
   實際打開 index.html 確認版面沒壞，回報時附「看到了什麼」。手機版（RWD）也要看。
3. **內容是本人的專業形象**：文字為繁體中文（zh-TW），語氣專業。
   不要自行改寫個人經歷、專業領域描述——那是本人的話，錯字以外的內容修改先問使用者。
4. **聯絡表單目前是展示用**（onsubmit 只跳 alert，未串後端）。不要宣稱它能收信；
   若使用者要求串接，方案先問過再做。

## 速查

- 結構：`index.html` 單檔（nav / about / specialty 三卡片 / contact 表單 / footer），
  樣式為 claymorphism（`.clay-*` class 定義在 `<head>` 的 `<style>`）。
- 相依外部資源：cdn.tailwindcss.com、fonts.googleapis.com——離線環境下開啟會沒有樣式，屬正常。
- 圖片授權：README 有來源標注與非商業使用聲明，新增圖片要照做。
- commit 慣例：繁中一句話（見 git log）。
- 同帳號的 OTscheduleV3 repo 有完整的 agent-os 工作制度（subagent 調度、完成判準等）；
  若同一 session 掛載了兩個 repo，可參照 `OTscheduleV3/docs/agent-os/` 的精神行事，
  但本 repo 太小，不必照搬全套流程。
