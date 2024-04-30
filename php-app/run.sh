#!/bin/sh

# パッケージインストール
composer install --no-dev --optimize-autoloader

# サーバー開始
php artisan serve --host 0.0.0.0 --port 8080
