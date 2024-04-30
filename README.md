# Web sample
Web開発のサンプルコード

## 説明
- webアプリ開発を素早く開始できることを目的としています。
- バックエンドは様々な言語で用意していきます。（随時更新予定）
- 作成者はすべての言語に精通しているわけではありません。9割以上がAIで生成しているソースもあります。
- セキュリティ面は考慮していません。実際の開発では考慮してください。
- フレームワークの選定に深い理由はありません。
- サンプルの充実に協力してくれる方は常にウェルカムです。

## フォルダ構成
```
web_sample
    ├─ db  # DB用のファイル（現状はPostgreSQL）
    ├─ view-app  # フロント用のソース
    |  #以下、バックエンド用のソース
    ├─ node-app  # Node.jsソース
    ├─ python-app  # pythonソース
    ├─ perl-app # perlソース
    ├─ php-app # phpソース
    |
    ├─ # coming soon…
```

- バックエンド用のソースは、docker-compose.ymlを編集し、使いたい言語のapi-appのコメントアウトを外す

## 構築手順
- dockerインストール(Ubuntuの例)
```bash
sudo apt update
sudo apt upgrade
sudo apt install ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
```

- docker-composeインストール(Ubuntuの例)
```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

- 起動
```bash
docker-compose up --build
# --buildは初回だけでよい
```

- 停止
```bash
docker-compose down
# DBを初期化したい場合は以下
docker-compose down -v
```

## DBの参照方法
- localhost:8081にアクセスし、以下の情報でログインする(pgadmin 4)
    - ユーザー：admin@pgadmin.org
    - パスワード：admin

![alt text](doc/pgadmin.png)


## その他
### Laravel環境構築をホストにインストールせずに行う方法
- composer実行
``` bash
docker run --rm -v $(pwd):/app composer composer ＜やりたいこと書く＞
```

- phpコマンド実行用
``` bash
docker run --rm -v $(pwd):/app -w /app php:8.3-cli php ＜やりたいこと書く＞
```