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

# FastAPIアプリケーションを起動
CMD ["uvicorn", "index:app", "--host", "0.0.0.0", "--port", "8080"]
