# ベースイメージを指定
FROM php:8.3-fpm

# アプリケーションディレクトリの作成
WORKDIR /app

# 必要モジュールをインストール
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# ポートを開放
EXPOSE 8080

CMD ["php", "artisan", "serve", "--host", "0.0.0.0", "--port", "8080"]
