#!/bin/sh

# サーバー開始
uvicorn index:app --host 0.0.0.0 --port 8080
