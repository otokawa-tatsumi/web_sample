-- ユーザーを管理するためのテーブルを作成
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL
);

-- 検証用ユーザーを挿入
INSERT INTO users (username, password) VALUES ('user', '$2y$12$pR5J/lhoqgRYElcXpulUIOiNi9IX0o56ZNpB/DBrT9liu5zM/SHjy');