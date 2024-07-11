const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const pg = require("pg");
const bcrypt = require('bcryptjs');

const app = express();
const app_port = 8080;

// express-sessionの設定
app.use(session({
  secret: crypto.randomBytes(32).toString('hex'),
  resave: false,
  saveUninitialized: false
}));

// body-parserミドルウェアを使用して、リクエストボディのJSONデータを解析する
app.use(bodyParser.json());

// PostgreSQLの接続情報
const database = 'postgres';
const host = 'db';
const port = '5432';
const user = 'postgres';
const password = 'postgres';

// 接続プールを作成
const pgPool = new pg.Pool({
  database: database,
  host: host,
  port: port,
  user: user,
  password: password,
});

// 共通の認証チェックミドルウェア
app.use((req, res, next) => {
  // ログインページへのアクセスの場合は認証チェックをスキップ
  if (req.path === '/login') {
      return next();
  }
  // その他の場合は共通の認証チェックを行う
  const user = req.session.user;
  if (user) {
    // 認証されている場合は次のミドルウェア関数に制御を渡す
    return next();
  }

  // ログインしていない場合はエラーを返す
  return res.status(401).json({ message: 'Not authenticated' });
});

// ログイン処理
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // PostgreSQLのusersテーブルで認証
  const query = {
    text:
      'SELECT * FROM users WHERE username = $1;',
    values: [username],
  };
  pgPool.connect(function (err, client) {
    if (err) {
      console.log(err);
      return
    }
    client.query(query)
      .then(result => {
        if (result.rows.length > 0) {
          // bcryptハッシュ化されたパスワードを比較
          const hPassword = result.rows[0].password;
          bcrypt.compare(password, hPassword, function(e, r) {
            if (e) {
              console.error(e);
              res.status(401).send('Login failed');
              return
            }
            if (r) {
              req.session.user = username;
              res.send('Login successful');
            } else {
              res.status(401).send('Login failed');
            }
          });
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

// メイン処理
app.get('/main', (_req, res) => {
  res.json({message: 'Welcome, you are authenticated.'});
});

// サーバーを起動
app.listen(app_port, () => {
  console.log(`The server is running on port ${app_port}.`);
});
