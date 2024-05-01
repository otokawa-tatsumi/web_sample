from sqlalchemy.orm import Session
from sqlalchemy.sql import text

# ユーザーデータを取得する
def get_user(db: Session, username: str):
    query = text("SELECT * FROM users WHERE username = :username")
    ret = db.execute(query, {"username": username})
    return ret.mappings().fetchone()
