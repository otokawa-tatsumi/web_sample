# ベースイメージを指定
FROM perl:latest

# 作業ディレクトリを設定
WORKDIR /app

# Mojoliciousモジュールをインストール
RUN cpanm Mojolicious

# ポートを開放
EXPOSE 8080

# 実行コマンド（Mojoliciousアプリケーションの起動）
CMD ["morbo", "app.pl", "-l", "http://*:8080"]