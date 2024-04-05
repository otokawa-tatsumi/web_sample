from sqlalchemy import create_engine, MetaData, Table, select
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
from models import UserLogin

# PostgreSQL接続情報
pg_info = {
  "database": 'postgres',
  "host": 'db',
  "port": '5432',
  "user": 'postgres',
  "password": 'postgres',
}
DATABASE_URL = f'postgresql://{pg_info["user"]}:{pg_info["password"]}@{pg_info["host"]}:{pg_info["port"]}/{pg_info["database"]}'

# SQLAlchemyエンジンの作成
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ベースモデルの定義
Base = declarative_base()
