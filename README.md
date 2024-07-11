# Web sample
Web開発で最低限必要なフロントエンド、バックエンド、DBの構築をセットにしたサンプルコードです。

## 説明
- webアプリ開発を素早く開始できることを目的としています。
- バックエンドは様々な言語で用意していきます。（随時更新予定）
- 作成者はすべての言語に精通しているわけではありません。9割以上がAIで生成しているソースもあります。
- セキュリティ面は考慮していません。実際の開発では考慮してください。
- フレームワークの選定に深い理由はありません。
- テストコードもそのうち追加したいという気持ちはあります。
- サンプルの充実に協力してくれる方は常にウェルカムです。

## フォルダ構成
```
web_sample
    ├─ db  # DB用のファイル（現状はPostgreSQL）
    ├─ view-app  # フロント用のソース
    |  #以下、バックエンド用のソース
    ├─ node-app    # JavaScript(Node.js)ソース
    ├─ nestjs-app  # TypeScript(NestJS)ソース
    ├─ python-app  # python(FastAPI)ソース
    ├─ perl-app    # perlソース
    ├─ php-app     # php(Laravel)ソース
    |
    ├─ # coming soon…
```

- バックエンド用のソースは、compose.yamlを編集し、使いたい言語のapi-appのコメントアウトを外す

## 事前準備
1. dockerインストール(Ubuntuの例)
    - [公式](https://docs.docker.com/engine/install/)より抜粋
    ```bash
    # Add Docker's official GPG key:
    sudo apt-get update
    sudo apt-get install ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc

    # Add the repository to Apt sources:
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    # Setting to omit sudo:
    sudo groupadd docker
    sudo usermod -aG docker $USER
    newgrp docker
    ```

2. makeのインストール
    ```bash
    sudo apt-get install make 
    ```

## 操作手順
`make`を実行して表示された説明に従って操作する

## Webページのアクセス方法
- http://localhost:8080/view/ にアクセスし、以下の情報でログインする
    - ユーザー：user
    - パスワード：password

    ![alt text](doc/login.png)

- ログイン成功すると以下の画面が表示される

    ![alt text](doc/main.png)

## DBの参照方法
- http://localhost:8080/db-manager/ にアクセスし、以下の情報でログインする(pgadmin 4)
    - ユーザー：admin@pgadmin.org
    - パスワード：admin

    ![alt text](doc/pgadmin.png)


## その他
### Laravel環境用コマンド
- 環境構築
    ``` bash
    # 以下をphp-appフォルダで実行
    docker run --rm -v $(pwd):/app composer composer create-project --prefer-dist laravel/laravel .
    ```

- composer実行
    ``` bash
    # 以下をphp-appフォルダで実行
    docker run --rm -v $(pwd):/app composer composer ＜やりたいこと書く＞
    ```

- phpコマンド実行用
    ``` bash
    # 以下をphp-appフォルダで実行
    docker run --rm -v $(pwd):/app -w /app php:8.3-cli php artisan ＜やりたいこと書く＞
    ```

### nestjs環境用コマンド
- 環境構築
    ``` bash
    # 以下をプロジェクトルートフォルダで実行
    docker run -it --rm -v ${PWD}:/app -w /app node:22-alpine sh -c "
      apk add --no-cache git &&
      npm install -g @nestjs/cli &&
      nest new nestjs-app --skip-install &&
      cd nestjs-app &&
      npm install
    "
    cd nestjs-app
    rm -r .git
    ```

- npm実行
    ``` bash
    # 以下をnestjs-appフォルダで実行
    docker run -it --rm -v ${PWD}:/app -w /app node:22-alpine sh -c "＜やりたいこと書く＞"
    ```

### 既知の不具合
- docker compose立ち上げ時に、networkにサービスが登録されないことがある。（docker network inspect見ると登録されていない）  
原因不明だが、再度立ち上げれば直る。
