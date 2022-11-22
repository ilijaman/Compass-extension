import os
from flask_cors import CORS
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
db = SQLAlchemy(app)

from admin import admin_router
from auth import auth_router
app.register_blueprint(admin_router)
app.register_blueprint(auth_router)




