# ベースイメージを指定
FROM nginx:latest

# Nginxの設定ファイルをコピー
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 作業ディレクトリを設定
WORKDIR /usr/share/nginx/html

# ポートを開放
EXPOSE 80