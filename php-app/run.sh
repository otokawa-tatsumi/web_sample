#!/bin/sh

# .env作成
ENV_FILE=".env"
EXAMPLE_FILE=".env.example"

# Check if .env file already exists
if [ ! -f "$ENV_FILE" ]; then
    # Copy .env.example to .env
    cp "$EXAMPLE_FILE" "$ENV_FILE"
    echo ".env file created."
else
    echo ".env file already exists."
fi

# パッケージインストール
composer install --no-dev --optimize-autoloader

# サーバー開始(この手法は本番ではNG)
php artisan serve --host 0.0.0.0 --port 8080
