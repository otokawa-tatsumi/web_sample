use Mojolicious::Lite;

# フックを使用してCORSヘッダーを設定
hook before_dispatch => sub {
    my $c = shift;

    $c->res->headers->header('Access-Control-Allow-Origin' => '*');
    $c->res->headers->header('Access-Control-Allow-Methods' => 'GET, POST, OPTIONS');
    $c->res->headers->header('Access-Control-Allow-Headers' => 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range');
};

# GETリクエストへの応答
get '/' => sub {
    my $c = shift;
    # JSON形式でレスポンスを返す
    $c->render(json => { message => 'Hello, GET request!' });
};

# POSTリクエストへの応答
post '/' => sub {
    my $c = shift;
    # JSON形式でレスポンスを返す
    $c->render(json => { message => 'Hello, POST request!' });
};

# OPTIONSリクエストへの応答（CORSのプリフライトリクエスト対応）
options '/' => sub {
    my $c = shift;
    $c->rendered(204);
};

# アプリケーションの開始
app->start;