from fastapi import FastAPI, HTTPException, Depends, Response, status, Request
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException
from sqlalchemy.orm import Session
import bcrypt

from .session_manager import SessionManager
from .db.database import SessionLocal
from .db import users
from .request_models import UserLogin

app = FastAPI()

@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content=exc.detail,
    )

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
        raise HTTPException(status_code=401, detail={"message": "Not authenticated"})
    return user

def verify_password(password, hashed_password):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

@app.post("/login")
async def login(user_login: UserLogin, response: Response, db: Session = Depends(get_db)):
    user = users.get_user(db, user_login.username)
    if not user:
        raise HTTPException(status_code=401, detail="Login failed")
    
    # bcryptハッシュ化されたパスワードを比較
    if verify_password(user_login.password, user["password"]):
        session_id = SessionManager.create_session(user_login.username)
        response.set_cookie(key="session_id", value=session_id)  # セッションIDをクッキーに設定
        return "Login successful"
    else:
        raise HTTPException(status_code=401, detail="Login failed")

@app.get("/main")
async def main(user: str = Depends(authenticate_user)):    
    return {"message": "Welcome, you are authenticated."}

@app.post("/logout")
async def logout(request: Request, response: Response, user: str = Depends(authenticate_user)):
    session_id = request.cookies.get("session_id")
    SessionManager.delete_session(session_id)  # セッション情報をSessionManagerから削除
    response.delete_cookie("session_id")  # セッションIDをクッキーから削除
    return "Logout successful"
