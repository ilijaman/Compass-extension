import os
from flask_cors import CORS
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)
cors=CORS(app, resources={r"/api/*": {"origins":"http://127.0.0.1:3000"}})
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
db = SQLAlchemy(app)

from admin import students_router
from auth import auth_router
app.register_blueprint(students_router)
app.register_blueprint(auth_router)




