use Mojolicious::Lite;
use DBIx::Connector;
use Crypt::Eksblowfish::Bcrypt "en_base64", "de_base64", "bcrypt_hash";

# PostgreSQLの接続情報
my $database = 'postgres';
my $host = 'db';
my $port = '5432';
my $user = 'postgres';
my $password = 'postgres';

# 接続プールを作成
my $connector = DBIx::Connector->new(
    "dbi:Pg:dbname=$database;host=$host;port=$port",
    $user,
    $password,
    {
        RaiseError => 1,
        PrintError => 0,
        AutoCommit => 1,
    }
);

# ログイン処理
post '/login' => sub {
    my $c = shift;
    my $json_data = $c->req->json;
    my $username = $json_data->{username};
    my $password = $json_data->{password};

    # データベースからデータを取得
    my $data = $connector->run(
        fixup => sub {
            my $dbh = shift;
            my $sth = $dbh->prepare('SELECT * FROM users WHERE username = ?;');
            $sth->execute($username);
            return $sth->fetchall_arrayref({});
        }
    );
    if (@$data) {
        # bcryptハッシュ化されたパスワードを比較
        my $h_password = $data->[0]{'password'};
        # app->log->info($h_password);
        # bcryptを分解
        my ( $unused, $algo, $cost, $salt_and_pass ) = split /\$/, $h_password;
        # ソルト
        my $salt = substr $salt_and_pass, 0, 22;
        # 取得したコストとソルトとを使用して、入力パスワードからハッシュ値を作成
        my $hash = en_base64(
            bcrypt_hash(
                {
                    cost    => $cost,
                    key_nul => 1,
                    salt    => de_base64($salt)
                },
                $password
            )
        );
        $password = sprintf '$%s$%d$%s%s', $algo, $cost, $salt, $hash;
        if ($password eq $h_password) {
            $c->session(user => $username);
            $c->render(text => 'Login successful', status => 200);
        } else {
            $c->render(text => 'Login failed', status => 401);
        }
    } else {
        $c->render(text => 'Login failed', status => 401);
    }
};

# ログイン状態確認
under sub {
    my $c = shift;
    unless ($c->session('user')) {
        $c->render(json => { message => 'Not authenticated' }, status => 401);
        return;
    }
    # ログインしている場合は次の処理に進む
    return 1;
};

# ログアウト処理
post '/logout' => sub {
    my $c = shift;
    # セッションからユーザー情報を削除する
    $c->session(expires => 1);
    $c->render(text => 'Logout successful', status => 200);
};

# メイン処理
get '/main' => sub {
    my $c = shift;
    $c->render(json => { message => 'Welcome, you are authenticated.' });
};

# アプリケーションの開始
app->start;
