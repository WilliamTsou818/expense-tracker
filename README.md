# 私房錢專案

<br>

此專案可以讓使用者瀏覽、篩選支出紀錄，主要是為了練習用 node.js 搭配 express 框架開發網頁，以及透過 mongoose 操作 mongoDB。

也可透過 heroku 連結使用本專案： https://tranquil-ridge-17552.herokuapp.com/

<br>

## 專案功能

1. 使用者可以在首頁一次瀏覽所有支出的清單
2. 使用者可以在首頁看到所有支出清單的總金額
3. 使用者可以新增一筆支出
4. 使用者可以編輯支出的所有屬性 (一次只能編輯一筆)
5. 使用者可以刪除任何一筆支出 (一次只能刪除一筆)
6. 使用者可以在首頁可以根據支出「類別」篩選支出

<br>

## 畫面瀏覽
![alphacamp 2-3 A12 老爸的私房錢](https://user-images.githubusercontent.com/78346513/125745457-6c01be3f-adc2-470d-9983-751331114de0.png)

<br>

## 建置環境

<br>

* node.js : ^10.15.0
* express: ^4.17.1
* express-handlebars: ^5.3.2
* mongoose: ^5.12.0
* mongoDB: ^4.2.14

<br>

## 安裝流程

<br>

1. 藉由 git clone 將專案下載至本地
```
git clone https://github.com/WilliamTsou818/expense-tracker.git
```
2. 進入專案資料夾
```
cd expense-tracker
```
3. 安裝套件
```
npm install
```
4. 加入種子資料
```
npm run seed
```
5. 啟動網頁伺服器
```
npm run dev
```
6. 出現下列訊息，表示啟動成功，可點選連結開啟網頁

Server is running on http://localhost:3000