const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const pg = require("pg");

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

// PostgreSQLデータベースの接続情報
const pgPool = new pg.Pool({
  database: 'postgres',
  host: 'db',
  port: '5432',
  user: 'postgres',
  password: 'postgres',
});

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

  // PostgreSQLのusersテーブルで認証
  const query = {
    text:
      'SELECT * FROM users WHERE username = $1 AND password = $2',
    values: [username, password],
  };
  pgPool.connect(function (err, client) {
    if (err) {
      console.log(err);
      return
    }
    client.query(query)
      .then(result => {
        if (result.rows.length > 0) {
          req.session.user = username;
          res.send('Login successful');
        } else {
          res.status(401).send('Login failed');
        }
      })
      .catch(err => {
        console.error('Query error', err.stack);
        res.status(401).send('Login failed');
      });
  });
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
