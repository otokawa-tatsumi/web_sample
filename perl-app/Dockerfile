# ベースイメージを指定
FROM perl:latest

# 作業ディレクトリを設定
WORKDIR /app

# 必要なモジュールをインストール
RUN cpanm Mojolicious
RUN cpanm DBI
RUN cpanm DBD::Pg
RUN cpanm DBIx::Connector

# ポートを開放
EXPOSE 8080

# 実行コマンド（Mojoliciousアプリケーションの起動）
CMD ["hypnotoad", "-f", "index.pl"]