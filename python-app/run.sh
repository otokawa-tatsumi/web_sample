#!/bin/sh

# パッケージインストール
poetry install

# サーバー開始
cd src
uvicorn index:app --host 0.0.0.0 --port 8080
