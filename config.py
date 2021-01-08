import os

class Config:
    # Base config
    SECRET_KEY = os.environ.get("SECRET_KEY")