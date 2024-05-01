# ベースイメージを指定
FROM python:3.11

# アプリケーションディレクトリの作成
WORKDIR /app

# poetryインストール
ENV POETRY_HOME=/opt/poetry
RUN curl -sSL https://install.python-poetry.org | python && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry

# ポートを開放
EXPOSE 8080

# コンテナ起動時のコマンド指定
CMD ["sh", "run.sh"]
