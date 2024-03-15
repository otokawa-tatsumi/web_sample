const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;

// CORSミドルウェアを使用してすべてのリクエストに対してCORSを有効にする
app.use(cors());

// GETリクエストの処理
app.get('/', (req, res) => {
  res.json({message: 'Hello, GET request!'});
});

// POSTリクエストの処理
app.post('/', (req, res) => {
  res.json({message: 'Hello, POST request!'});
});

// サーバーを起動
app.listen(port, () => {
  console.log(`サーバーがポート ${port} で起動しました`);
});