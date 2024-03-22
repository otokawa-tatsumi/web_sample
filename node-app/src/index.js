const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

// express-sessionの設定
app.use(session({
  secret: crypto.randomBytes(32).toString('hex'),
  resave: false,
  saveUninitialized: true
}));

// body-parserミドルウェアを使用して、リクエストボディのJSONデータを解析する
app.use(bodyParser.json());

// GET確認用
app.get('/', (req, res) => {
  res.json({message: 'Hello, GET request!'});
});

// POST確認用
app.post('/', (req, res) => {
  res.json({message: 'Hello, POST request!'});
});

// ログインエンドポイント
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // ユーザー名とパスワードのチェック（省略）
  if (username === 'user' && password === 'password') {
    req.session.isLoggedIn = true;
    req.session.user = username;
    res.status(200).send('Login successful');
  } else {
    res.status(401).send('Login failed');
  }
});

// ログアウトエンドポイント
app.post('/logout', (req, res) => {
  // セッションからユーザー情報を削除する
  req.session.destroy();
  res.send('Logout successful');
});

// メイン処理
app.get('/main', (req, res) => {
  if (req.session.isLoggedIn) {
    res.json({message: 'ログインしています。'});
  } else {
    res.status(401).json({message: '未ログイン。'});
  }
});

// サーバーを起動
app.listen(port, () => {
  console.log(`サーバーがポート ${port} で起動しました`);
});