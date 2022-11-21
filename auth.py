from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps

from app import db
from models import Admin, Student

