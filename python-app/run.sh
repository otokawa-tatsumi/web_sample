#!/bin/sh

# .venvをプロジェクト直下に作成
poetry config virtualenvs.in-project true
# .venvを作成しない場合は以下
# poetry config virtualenvs.create false

# パッケージインストール
poetry install

# サーバー開始
poetry run uvicorn app.index:app --host 0.0.0.0 --port 8080
