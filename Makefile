.DEFAULT_GOAL := help

.PHONY: build
build: ## Dockerイメージのビルド\nビルドは初回もしくはDockerfileを修正した場合に実行する
	@docker compose build

.PHONY: up
up: ## Dockerコンテナの開始\nNAMEにバックエンドで使用するフォルダの"-app"を除いた名称を指定する\n（例：python-appを使用する場合、NAME=pythonと指定）
	@if [ -z "$(NAME)" ]; then \
		echo "NAME is not defined"; \
		exit 1; \
	fi
	@cp -a compose.yaml compose_bk.yaml
	@sed -i 's/____backend____/$(NAME)/g' compose.yaml
	@docker compose up -d $(OPTION)
	@mv compose_bk.yaml compose.yaml

.PHONY: restart
restart: ## Dockerコンテナの再起動\nソースコードを修正した場合に実行する
	@docker compose restart

.PHONY: log
log: ## Dockerコンテナのログ表示 Ctrl+Cで終了\n特定のサービスのログのみ表示したい場合はOPTION=compose.yaml上のサービス名を指定する\n（例：バックエンドのログを見たい場合、OPTION=api-appと指定）
	@docker compose logs -f $(OPTION)

.PHONY: down
down: ## Dockerコンテナの終了\nDBを初期化したい場合はOPTION=-vを指定する\n（db/init-scripts以下に初期化処理を置く）
	@docker compose down $(OPTION)

.PHONY: help
help: ## ヘルプを表示する
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {gsub(/\\n/, "\n" "                     ", $$2); printf "\033[36m%-20s\033[0m %s\n\n", $$1, $$2}'