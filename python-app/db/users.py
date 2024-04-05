from sqlalchemy.orm import Session
from sqlalchemy.sql import text

# 全データを取得する
def get_user(db: Session, username: str, password: str):
    query = text("SELECT * FROM users WHERE username = :username AND password = :password;")
    return db.execute(query, {"username": username, "password": password}).fetchone()
