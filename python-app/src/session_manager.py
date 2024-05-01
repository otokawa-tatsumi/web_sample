import secrets

class SessionManager:
    sessions = {}

    @classmethod
    def create_session(cls, username):
        session_id = secrets.token_urlsafe(16)
        cls.sessions[session_id] = username
        return session_id

    @classmethod
    def get_username(cls, session_id):
        return cls.sessions.get(session_id)

    @classmethod
    def delete_session(cls, session_id):
        if session_id in cls.sessions:
            del cls.sessions[session_id]
