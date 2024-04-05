from fastapi import FastAPI, HTTPException, Depends, Response, status, Request
from session_manager import SessionManager
from db.database import SessionLocal
from db import users
from sqlalchemy.orm import Session
from request_models import UserLogin

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def authenticate_user(request: Request):
    session_id = request.cookies.get("session_id")
    user = SessionManager.get_username(session_id)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user

@app.post("/login")
async def login(user_login: UserLogin, response: Response, db: Session = Depends(get_db)):
    user = users.get_user(db, user_login.username, user_login.password)
    if not user:
        raise HTTPException(status_code=401, detail="Login failed")
    
    session_id = SessionManager.create_session(user_login.username)
    response.set_cookie(key="session_id", value=session_id)  # セッションIDをクッキーに設定
    return "Login successful"

@app.get("/main")
async def main(user: str = Depends(authenticate_user)):    
    return {"message": "Welcome, you are authenticated."}

@app.post("/logout")
async def logout(request: Request, response: Response, user: str = Depends(authenticate_user)):
    session_id = request.cookies.get("session_id")
    SessionManager.delete_session(session_id)  # セッション情報をSessionManagerから削除
    response.delete_cookie("session_id")  # セッションIDをクッキーから削除
    return "Logout successful"
