# ベースイメージを指定
FROM nginx:1.26.0

# Nginxの設定ファイルをコピー
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 作業ディレクトリを設定
WORKDIR /usr/share/nginx/view

# ポートを開放
EXPOSE 80