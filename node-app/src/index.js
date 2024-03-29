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

// ダミーデータ
const users = {
  user: "password"
}

// GET確認用
app.get('/', (req, res) => {
  res.json({message: 'Hello, GET request!'});
});

// POST確認用
app.post('/', (req, res) => {
  res.json({message: 'Hello, POST request!'});
});

// ログイン処理
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // ユーザー名とパスワードのチェック（省略）
  if (users[username] && users[username] === password) {
    req.session.user = username;
    res.send('Login successful');
  } else {
    res.status(401).send('Login failed');
  }
});

// ログアウト処理
app.post('/logout', (req, res) => {
  // セッションからユーザー情報を削除する
  req.session.destroy();
  res.send('Logout successful');
});

// ログイン状態確認
const requireLogin = (req, res, next) => {
  // セッションからユーザー情報を取得
  const user = req.session.user;

  // ログインしていない場合はエラーを返す
  if (!user) {
      return res.status(401).json({ message: 'ログインが必要です' });
  }

  // ログインしている場合は次の処理に進む
  next();
};

// メイン処理
app.get('/main', requireLogin, (req, res) => {
  res.json({message: 'ログインしています。'});
});

// サーバーを起動
app.listen(port, () => {
  console.log(`サーバーがポート ${port} で起動しました`);
});
