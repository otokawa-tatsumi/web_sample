# ベースイメージを指定
FROM perl:5.38

# 作業ディレクトリを設定
WORKDIR /app

# 必要なモジュールをインストール
RUN cpanm Mojolicious@9.36
RUN cpanm DBI@1.643
RUN cpanm DBD::Pg@3.18.0
RUN cpanm DBIx::Connector@0.59
RUN cpanm Crypt::Eksblowfish::Bcrypt@0.009

# ポートを開放
EXPOSE 8080

# コンテナ起動時のコマンド指定
CMD ["sh", "run.sh"]
