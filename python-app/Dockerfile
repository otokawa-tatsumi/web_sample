# ベースイメージを指定
FROM python:3.11

# アプリケーションディレクトリの作成
WORKDIR /app

# 必要なファイルをコピー
COPY ./requirements.txt /app

# 依存関係をインストール
RUN pip install --no-cache-dir -r requirements.txt

# ポートを開放
EXPOSE 8080

# コンテナ起動時のコマンド指定
CMD ["sh", "run.sh"]
