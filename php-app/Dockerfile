# ベースイメージを指定
FROM php:8.3-fpm

# アプリケーションディレクトリの作成
WORKDIR /app

# 必要モジュールをインストール
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libpq-dev \
    && docker-php-ext-install pdo_pgsql zip

# Composerをインストール
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# ポートを開放
EXPOSE 8080

# コンテナ起動時のコマンド指定
CMD ["sh", "run.sh"]
